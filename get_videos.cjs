const https = require('https');

function fetchSearch(query) {
  return new Promise((resolve, reject) => {
    https.get(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const matches = [...data.matchAll(/watch\?v=([a-zA-Z0-9_-]{11})/g)];
        const ids = [...new Set(matches.map(m => m[1]))].slice(0, 3);
        
        Promise.all(ids.map(id => 
          new Promise((res) => {
            https.get(`https://www.youtube.com/watch?v=${id}`, (res2) => {
              let html = '';
              res2.on('data', c => html += c);
              res2.on('end', () => {
                const titleMatch = html.match(/<title>(.*?)<\/title>/);
                const title = titleMatch ? titleMatch[1].replace(' - YouTube', '') : 'Unknown';
                res(`${id} : ${title}`);
              });
            });
          })
        )).then(results => resolve(results));
      });
    }).on('error', reject);
  });
}

async function main() {
  const queries = [
    "No Gi K Guard BJJ",
    "No Gi False Reap BJJ",
    "No Gi Deep Half Guard BJJ"
  ];
  for (const q of queries) {
    console.log(`--- ${q} ---`);
    const results = await fetchSearch(q);
    console.log(results.join('\n'));
  }
}
main();
