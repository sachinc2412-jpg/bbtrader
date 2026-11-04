// Approved website navigation and enquiry answers; no model or external requests.
export const CONTACT='917063747653';
const support=(topic='your trading services')=>'https://wa.me/'+CONTACT+'?text='+encodeURIComponent("Hi BBTrader, I'd like to enquire about "+topic+'. Please share more details.');
export const topics={
 register:{label:'Open an account',text:'You can start your registration in the BBTrader account portal. For help with eligibility, documents or the next steps, speak with the team.',links:[['Start registration','https://bbtrader.live/register']],enquiry:'opening a trading account'},
 login:{label:'Login help',text:'Use the BBTrader login page to access your account. If you cannot sign in or need password assistance, contact the support team. Please do not share your password or verification codes here.',links:[['Go to login','https://bbtrader.live/login']],enquiry:'help accessing my account'},
 markets:{label:'Markets & charts',text:'Explore Indian benchmarks, forex pairs and crypto on this website. Choose a market, then use the chart controls to change the interval or zoom. Check each quote’s source and update time; some data may be delayed.',links:[['Indian markets','#indian-markets'],['Forex charts','#forex-chart'],['Crypto charts','#crypto-chart']],enquiry:'the markets and trading services available'},
 funding:{label:'Deposits & withdrawals',text:'Deposits and withdrawals are account-specific. Use the account portal or ask the team about the process, available payment methods and the status of a request. This website assistant cannot access balances or process payments.',links:[['Open account portal','https://bbtrader.live/login']],enquiry:'deposits and withdrawals'},
 fees:{label:'Fees & requirements',text:'Please check with the BBTrader team for current charges, minimum deposit requirements, required documents and service availability. I do not have a verified fee schedule or eligibility details to quote.',links:[],enquiry:'fees, minimum deposit and account requirements'},
 support:{label:'Talk to the team',text:'You can contact the BBTrader team on WhatsApp at +91 70637 47653. Tap below to open a service enquiry; you can review the message before sending it.',links:[],enquiry:'your trading services'},
 charts:{label:'Chart or price issue',text:'If a quote or chart looks unavailable, check its update time and try refreshing the page. The site can display the latest available historical data when a live feed is interrupted. The team can help with issues that continue.',links:[['Open market workspace','#demo']],enquiry:'a chart or market data issue'},
 scope:{label:'Trading questions',text:'I can help you navigate the website and connect you with the team for service information. I do not provide trade signals, investment recommendations or profit guarantees.',links:[['Explore market information','#markets']],enquiry:'information about trading services'}
};
export const quickTopics=['register','login','markets','funding','support'];
export function resolveTopic(input){
 const q=String(input||'').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N} /]/gu,' ').replace(/\s+/g,' ').trim();
 if(!q)return null;
 if(/\b(buy|sell|invest|signal|advice|recommend|profit|guarantee|target|stop loss)\b/.test(q))return 'scope';
 if(/\b(fee|fees|charge|charges|minimum|document|documents|kyc|eligible|eligibility|requirements|leverage|spread|spreads)\b/.test(q))return 'fees';
 if(/\b(deposit|deposits|withdraw|withdrawal|withdrawals|fund|funds|funding|payment|payments|balance|paisa)\b/.test(q))return 'funding';
 if(/\b(login|log in|sign in|password|forgot|locked|access|signin|otp)\b/.test(q))return 'login';
 if(/\b(register|registration|signup|sign up|open an account|open account|create account|join|start|get started)\b/.test(q))return 'register';
 if(/\b(chart|charts|price|prices|quote|quotes|feed)\b/.test(q)&&/\b(issue|error|unavailable|wrong|working|blank|missing|different|load|loading|problem)\b/.test(q))return 'charts';
 if(/\b(market|markets|chart|charts|forex|crypto|bitcoin|btc|ethereum|eth|nifty|sensex|stock|stocks|currency|currencies|price|prices)\b/.test(q))return 'markets';
 if(/\b(support|contact|human|person|team|help|whatsapp|service|services|enquiry|inquiry|hi|hello|hey|namaste)\b/.test(q))return 'support';
 return null;
}
export function getReply(input){const key=resolveTopic(input);return key?{key,...topics[key]}:{key:'unknown',label:'Ask the team',text:'I can help with account registration, login, markets and charts, or service enquiries. For this question, the BBTrader team can give you a more specific answer.',links:[],enquiry:'your trading services'};}
export function whatsappLink(topic='support'){return support(topics[topic]?.enquiry);}
