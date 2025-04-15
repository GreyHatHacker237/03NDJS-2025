
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapeData() {
  const url = 'https://fr.wikipedia.org/wiki/Liste_des_pays_par_population';

  try {
    const $ = await cheerio.fromURL(url);

    const results = [];
    $('table.wikitable').first().find('tbody tr').each((index, row) => {
      const cells = $(row).find('td');
      
      if (cells.length >= 4) {
        results.push({
          rang: $(cells[0]).text().trim(),
          pays: $(cells[1]).text().trim(),
          population: $(cells[2]).text().trim(),
          dateReference: $(cells[3]).text().trim()
        });
      }
    });

    fs.writeFileSync('pays-population.json',));
  } catch (err) {
    console.error('❌ Erreur:', err.message);
  }
}

scrapeData();
