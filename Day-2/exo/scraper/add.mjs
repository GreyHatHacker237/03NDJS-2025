const cheerio = require('cheerio-httpcli');

cheerio.fetch('https://fr.wikipedia.org/wiki/Liste_des_pays_par_population', (err, $, res, body) => {
  if (err) {
    console.error('Erreur :', err.message);
    return;
  }

  const table = $('table.wikitable').first();
  const rows = table.find('tbody tr');

  console.log(`✅ Nombre de lignes trouvées dans le tableau : ${rows.length}\n`);
});

