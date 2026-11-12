(()=>{"use strict";
const params=new URLSearchParams(location.search);
const safe=(s,n=80)=>String(s||"").replace(/[^a-zA-Z0-9_./-]/g,"").slice(0,n);
const ref=(()=>{try{return new URL(document.referrer).hostname}catch{return ""}})();
const source=safe(params.get("utm_source")|| (ref.includes("facebook.com")||ref.includes("fb.com")?"facebook":ref.includes("google.")?"google":ref?"referral":"direct"),40);
const medium=safe(params.get("utm_medium")||"",40),campaign=safe(params.get("utm_campaign")||"",80);
function send(event,label=""){const body=JSON.stringify({event,source,medium,campaign,label:safe(label)});fetch("/api/visitor-events",{method:"POST",headers:{"Content-Type":"application/json"},body,keepalive:true}).catch(()=>{});}
send("page_view");
document.addEventListener("click",e=>{const target=e.target.closest("a,button");if(!target)return;
const text=(target.textContent||"").trim().slice(0,100);
const href=target.getAttribute("href")||"";
if(/เสนอราคา|ขอราคา|ปรึกษาฟรี/.test(text))send("quote_click");
else if(/โทร|ติดต่อ|line|mailto:|tel:/i.test(text+" "+href))send("contact_click");
else if(/ตัวอย่าง|โรงเรียน|เทศบาล|อบต\.|รพ\.สต\.|โรงพยาบาล|วัด/.test(text))send("sample_click",text);
},{passive:true});
})();
