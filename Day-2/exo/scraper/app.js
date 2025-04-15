// app.js
const cheerio = require('cheerio');

async function scrapeData() {
  const url = 'https://fr.wikipedia.org/wiki/Liste_des_pays_par_population';

  try {
    const $ = await cheerio.fromURL(url);

    const tableau = $('table.wikitable').first();
    const resultats = [];

    tableau.find('tbody tr').each((index, row) => {
      const cells = $(row).find('td');

      if (cells.length >= 3) {
        const rang = $(cells[0]).text().trim();
        const pays = $(cells[1]).text().trim();
        const population = $(cells[2]).text().trim();

        resultats.push({
          rang,
          pays,
          population
        });
      }
    });

    console.table(resultats.slice(0, 10));
  } catch (err) {
    console.error('❌ Erreur:', err.message);
  }
}

scrapeData();
