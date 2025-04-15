import * as cheerio from 'cheerio';

// Charger la page
const $ = await cheerio.fromURL('https://fr.wikipedia.org/wiki/Liste_des_pays_par_population');

// Extraire les lignes du tableau
const data = $.extract({
  pays: [
    {
      selector: 'table.wikitable tbody tr',
      value: {
        rang: {
          selector: 'td:nth-child(1)',
          value: 'text',
        },
        pays: {
          selector: 'td:nth-child(2)',
          value: 'text',
        },
        population: {
          selector: 'td:nth-child(3)',
          value: 'text',
        },
      },
    },
  ],
});

// Nettoyage des résultats vides (en-têtes ou lignes mal formatées)
const propre = data.pays.filter(
  (ligne) => ligne.rang && ligne.pays && ligne.population
);

// Affiche un aperçu des 3 premières lignes
console.log('[ ');
propre.slice(0, 3).forEach((p) => console.log(' ', p, ','));
console.log(`  ...${propre.length - 3} autres objets`);
console.log(']');
