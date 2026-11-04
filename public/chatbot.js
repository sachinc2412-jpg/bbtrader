import {topics,quickTopics,getReply,whatsappLink} from './chat-knowledge.js?v=20261104-chat1';
const launcher=document.querySelector('#bb-chat-toggle');
const panel=document.querySelector('#bb-chat-panel');
const log=document.querySelector('#bb-chat-log');
const form=document.querySelector('#bb-chat-form');
const input=document.querySelector('#bb-chat-input');
const send=document.querySelector('#bb-chat-send');
const handoff=document.querySelector('#bb-chat-handoff');
const close=document.querySelector('#bb-chat-close');
const restart=document.querySelector('#bb-chat-restart');
let initialized=false;
function setOpen(open){panel.hidden=!open;launcher.setAttribute('aria-expanded',String(open));launcher.classList.toggle('is-open',open);launcher.setAttribute('aria-label',open?'Close BBTrader assistant':'Open BBTrader assistant');if(open){if(!initialized)reset();input.focus({preventScroll:true});}else launcher.focus({preventScroll:true});}
function appendMessage(text,role,links=[]){
 const article=document.createElement('div');article.className='bb-chat-message bb-chat-'+role;
 const label=document.createElement('span');label.className='bb-chat-sender';label.textContent=role==='user'?'You':'BBTrader assistant';
 const body=document.createElement('p');body.textContent=text;article.append(label,body);
 if(links.length){const actions=document.createElement('div');actions.className='bb-chat-links';for(const [title,url] of links){const a=document.createElement('a');a.textContent=title+' ↗';a.href=url;if(url.startsWith('https:')){a.target='_blank';a.rel='noopener noreferrer';}else a.addEventListener('click',()=>setOpen(false));actions.append(a);}article.append(actions);}
 log.append(article);while(log.children.length>60)log.firstElementChild.remove();log.scrollTop=log.scrollHeight;
}
function reset(){log.replaceChildren();initialized=true;handoff.href=whatsappLink();input.value='';send.disabled=true;appendMessage('Hi, welcome to BBTrader. I can help with website questions and service enquiries. What would you like to know?','bot');}
function reply(topic){const answer=topics[topic];appendMessage(answer.text,'bot',answer.links);handoff.href=whatsappLink(topic);}
launcher.addEventListener('click',()=>setOpen(panel.hidden));
close.addEventListener('click',()=>setOpen(false));
restart.addEventListener('click',()=>{reset();input.focus({preventScroll:true});});
panel.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();setOpen(false);}if(event.key==='Tab'){const controls=[...panel.querySelectorAll('button:not(:disabled),a[href],input')].filter(el=>!el.hidden);if(event.shiftKey&&document.activeElement===controls[0]){event.preventDefault();controls.at(-1).focus();}else if(!event.shiftKey&&document.activeElement===controls.at(-1)){event.preventDefault();controls[0].focus();}}});
const shortcuts=document.querySelector('#bb-chat-shortcuts');for(const key of quickTopics){const b=document.createElement('button');b.type='button';b.textContent=topics[key].label;b.addEventListener('click',()=>{appendMessage(topics[key].label,'user');reply(key);});shortcuts.append(b);}
input.addEventListener('input',()=>{send.disabled=!input.value.trim();});
form.addEventListener('submit',event=>{event.preventDefault();const text=input.value.trim().slice(0,400);if(!text)return;appendMessage(text,'user');input.value='';send.disabled=true;const answer=getReply(text);appendMessage(answer.text,'bot',answer.links);handoff.href=whatsappLink(answer.key);input.focus({preventScroll:true});});
// Conversation stays in memory only. No analytics, CRM submission or transcript in URLs.

launcher.hidden=false;
