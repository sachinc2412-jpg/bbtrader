import {marketResponse, historyResponse, indiaResponse} from '../worker/api.js';

export default async function handler(req, res) {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({error: 'Method not allowed'});
  }
  const request = new Request(new URL(req.url, 'https://bbtrader.vercel.app'), {method: 'GET'});
  const route = new URL(request.url).pathname;
  const response = route === '/api/markets' ? await marketResponse(request)
    : route === '/api/history' ? await historyResponse(request)
    : route === '/api/india' ? await indiaResponse()
    : Response.json({error: 'Not found'}, {status: 404});
  response.headers.forEach((value, key) => res.setHeader(key, value));
  res.status(response.status);
  if (req.method === 'HEAD') return res.end();
  return res.send(await response.text());
}
