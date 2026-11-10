// Cloudflare Pages Function. Requires a D1 database binding named VISITOR_DB.
// Unique visits: one per anonymous browser session (sessionStorage token), not raw page loads.
// Online: active browser sessions seen in the last 90 seconds.
const headers={'Cache-Control':'no-store','Content-Type':'application/json; charset=utf-8'};
const response=(data,status=200)=>new Response(JSON.stringify(data),{status,headers});
const schema=[
'CREATE TABLE IF NOT EXISTS visitor_sessions (id TEXT PRIMARY KEY, first_seen INTEGER NOT NULL, last_seen INTEGER NOT NULL)',
'CREATE INDEX IF NOT EXISTS visitor_last_seen ON visitor_sessions(last_seen)'
];
async function handler(context){
 const db=context.env.VISITOR_DB;
 if(!db)return response({available:false,error:'VISITOR_DB binding not configured'},503);
 try{
  for(const sql of schema)await db.prepare(sql).run();
  const now=Math.floor(Date.now()/1000);
  const url=new URL(context.request.url);
  const raw=context.request.method==='POST'?(await context.request.json().catch(()=>({}))).session:null;
  const session=typeof raw==='string'&&/^[a-f0-9-]{36}$/.test(raw)?raw:null;
  if(context.request.method==='POST'&&!session)return response({error:'Invalid session'},400);
  if(session)await db.prepare('INSERT INTO visitor_sessions (id,first_seen,last_seen) VALUES (?1,?2,?2) ON CONFLICT(id) DO UPDATE SET last_seen=excluded.last_seen').bind(session,now).run();
  const totals=await db.prepare('SELECT COUNT(*) AS visits, SUM(CASE WHEN last_seen >= ?1 THEN 1 ELSE 0 END) AS online FROM visitor_sessions').bind(now-90).first();
  return response({available:true,visits:8888+Number(totals?.visits||0),online:Number(totals?.online||0),windowSeconds:90});
 }catch(error){console.error('visitor counter',error);return response({available:false,error:'Counter database unavailable'},503)}
}
export const onRequestGet=handler;
export const onRequestPost=handler;
