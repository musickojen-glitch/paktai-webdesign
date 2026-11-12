// Anonymous marketing events for Cloudflare Pages + existing VISITOR_DB D1.
// No names, phone numbers, IPs or user agents are stored.
const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"}});
const allowed=new Set(["page_view","sample_click","quote_click","contact_click","chat_open"]);
const clean=(v,n=64)=>typeof v==="string"?v.replace(/[^a-zA-Z0-9_./-]/g,"").slice(0,n):"";
export async function onRequestPost({request,env}){
  if(!env.VISITOR_DB)return json({ok:false,error:"Database not configured"},503);
  const length=Number(request.headers.get("content-length")||0);
  if(length>2048)return json({ok:false},413);
  let data;try{data=await request.json()}catch{return json({ok:false},400)}
  const event=clean(data?.event,32);
  if(!allowed.has(event))return json({ok:false},400);
  const source=clean(data?.source||"direct",40),medium=clean(data?.medium||"",40),campaign=clean(data?.campaign||"",80),label=clean(data?.label||"",80);
  try{
    await env.VISITOR_DB.prepare("CREATE TABLE IF NOT EXISTS visitor_events (id INTEGER PRIMARY KEY AUTOINCREMENT, event TEXT NOT NULL, source TEXT NOT NULL, medium TEXT NOT NULL, campaign TEXT NOT NULL, label TEXT NOT NULL, created_at INTEGER NOT NULL)").run();
    await env.VISITOR_DB.prepare("INSERT INTO visitor_events (event,source,medium,campaign,label,created_at) VALUES (?1,?2,?3,?4,?5,?6)").bind(event,source,medium,campaign,label,Math.floor(Date.now()/1000)).run();
    return json({ok:true});
  }catch(e){console.error("visitor events",e);return json({ok:false,error:"Storage unavailable"},503)}
}
// Do not expose aggregate reporting publicly. Inspect D1 in authenticated Cloudflare dashboard.
