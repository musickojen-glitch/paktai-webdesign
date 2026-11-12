const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
async function accessOK(request,env){
 const domain=String(env.ACCESS_TEAM_DOMAIN||"").replace(/^https?:\/\//,"").replace(/\/$/,"");
 const aud=String(env.ACCESS_AUD||"");
 if(!/^[a-z0-9.-]+\.cloudflareaccess\.com$/i.test(domain)||!aud)return false;
 const token=request.headers.get("Cf-Access-Jwt-Assertion");
 if(!token)return false;
 const parts=token.split(".");
 if(parts.length!==3)return false;
 try{
 const decode=s=>Uint8Array.from(atob(s.replace(/-/g,"+").replace(/_/g,"/")),c=>c.charCodeAt(0));
 const header=JSON.parse(new TextDecoder().decode(decode(parts[0])));
 const payload=JSON.parse(new TextDecoder().decode(decode(parts[1])));
 const now=Math.floor(Date.now()/1000);
 if(header.alg!=="RS256"||!header.kid||payload.iss!=="https://"+domain||!Array.isArray(payload.aud)||!payload.aud.includes(aud)||typeof payload.exp!=="number"||payload.exp<=now||typeof payload.iat!=="number"||payload.iat>now+60)return false;
 const response=await fetch("https://"+domain+"/cdn-cgi/access/certs");
 if(!response.ok)return false;
 const keys=(await response.json()).keys||[];
 const jwk=keys.find(k=>k.kid===header.kid&&k.kty==="RSA");
 if(!jwk)return false;
 const key=await crypto.subtle.importKey("jwk",jwk,{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},false,["verify"]);
 return await crypto.subtle.verify("RSASSA-PKCS1-v1_5",key,decode(parts[2]),new TextEncoder().encode(parts[0]+"."+parts[1]));
 }catch(e){console.error("Access JWT validation failed",e);return false}
}
export async function onRequestGet({request,env}){
 if(!await accessOK(request,env))return json({ok:false,error:"Cloudflare Access authentication required"},401);
 if(!env.VISITOR_DB)return json({ok:false,error:"Database not configured"},503);
 try{
  const db=env.VISITOR_DB;
  const [totals,sources,campaigns,events,days]=await Promise.all([
   db.prepare("SELECT event, COUNT(*) AS count FROM visitor_events GROUP BY event ORDER BY count DESC").all(),
   db.prepare("SELECT source, COUNT(*) AS count FROM visitor_events WHERE event='page_view' GROUP BY source ORDER BY count DESC LIMIT 15").all(),
   db.prepare("SELECT campaign, COUNT(*) AS count FROM visitor_events WHERE event='page_view' AND campaign<>'' GROUP BY campaign ORDER BY count DESC LIMIT 15").all(),
   db.prepare("SELECT event, label, COUNT(*) AS count FROM visitor_events WHERE event<>'page_view' GROUP BY event,label ORDER BY count DESC LIMIT 20").all(),
   db.prepare("SELECT date(created_at,'unixepoch') AS day, COUNT(*) AS count FROM visitor_events WHERE event='page_view' AND created_at >= unixepoch('now','-30 days') GROUP BY day ORDER BY day DESC").all()
  ]);
  return json({ok:true,totals:totals.results,sources:sources.results,campaigns:campaigns.results,events:events.results,days:days.results});
 }catch(e){console.error("analytics dashboard",e);return json({ok:false,error:"Statistics unavailable"},503)}
}
