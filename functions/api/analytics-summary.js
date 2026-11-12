const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
function equal(a,b){if(typeof a!=="string"||typeof b!=="string"||a.length!==b.length)return false;let diff=0;for(let i=0;i<a.length;i++)diff|=a.charCodeAt(i)^b.charCodeAt(i);return diff===0}
export async function onRequestGet({request,env}){
 const token=env.DASHBOARD_TOKEN;
 if(!token||token.length<24)return json({ok:false,error:"Dashboard password not configured"},503);
 const auth=request.headers.get("Authorization")||"";
 if(!equal(auth,"Bearer "+token))return json({ok:false,error:"Unauthorized"},401);
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
