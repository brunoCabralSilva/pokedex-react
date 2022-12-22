export default function letraMaiuscula (nome) {
  let novoNome = nome[0].toUpperCase();
  for (let i = 1; i < nome.length; i += 1) {
    novoNome += nome[i];
  }
  return novoNome;
}