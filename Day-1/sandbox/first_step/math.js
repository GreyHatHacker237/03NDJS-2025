function addition(a, b) {
  return a + b;
}
function soustraction(a, b){
   return a - b;
}
function multiplication(a, b){
   return  a * b;
}
function division(a, b){
   if (b !== 0) {
     return a / b;
 } else {
  return "Erreur : division par zéro";
 }
}

module.exports = {
   addition,
   soustraction,
   multiplication
   division
};

