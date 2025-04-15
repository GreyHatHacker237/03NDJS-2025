// app.js
const cheerio = require('cheerio');
const https = require('https');

async function scrapeData() {
  const url = 'https://fr.wikipedia.org/wiki/Liste_des_pays_par_population';

  try {
    const html = await new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = '';
        res.on('data', chunk => (data += chunk));
        res.on('end', () => resolve(data));
      }).on('error', reject);
    });

    const $ = cheerio.load(html);

    const tableau = $('table.wikitable').first();
    const resultats = [];

    tableau.find('tbody tr').each((index, row) => {
      const cells = $(row).find('td');

      if (cells.length >= 4) {
        const rang = $(cells[0]).text().trim();
        const pays = $(cells[1]).text().trim();
        const population = $(cells[2]).text().trim();
        const pourcentage = $(cells[3]).text().trim(); // ✅ nouvelle colonne

        resultats.push({
          rang,
          pays,
          population,
          pourcentage
        });
      }
    });

    console.table(resultats.slice(0, 10));
  } catch (err) {
    console.error('❌ Erreur:', err.message);
  }
}

scrapeData();

