(function(root){
 const symbols=['BTC','ETH','SOL','EUR','GBP'];
 function validMarket(m){return m&&Number.isFinite(m.price)&&m.price>0&&Number.isFinite(m.change)}
 function validateSnapshot(data,now=Date.now(),allowStale=false){const time=Date.parse(data?.fetchedAt);if(!Number.isFinite(time)||(!allowStale&&now-time>90000)||time-now>30000||symbols.some(s=>!validMarket(data.markets?.[s])))throw new Error('Invalid or stale market snapshot');return data}
 function formatPrice(symbol,price){return price.toLocaleString('en-US',{minimumFractionDigits:['EUR','GBP'].includes(symbol)?5:2,maximumFractionDigits:['EUR','GBP'].includes(symbol)?5:2})}
 function syncCandles(history,market,interval,fetchedAt){if(!validMarket(market))return [];const bucket=(market.marketClosed?history.at(-1)?.time:undefined)??market.sessionTime??Math.floor(Date.parse(fetchedAt)/(interval*60000))*interval*60;const candles=history.filter(c=>c.time<=bucket).map(c=>({...c}));if(!candles.length)return [];const last=candles[candles.length-1];if(last.time===bucket){last.close=market.price;last.high=Math.max(last.high,market.price);last.low=Math.min(last.low,market.price)}else{candles.push({time:bucket,open:last.close,high:Math.max(last.close,market.price),low:Math.min(last.close,market.price),close:market.price})}return candles}
 root.BBMarketModel=Object.freeze({validateSnapshot,formatPrice,syncCandles,validMarket});
})(globalThis);
