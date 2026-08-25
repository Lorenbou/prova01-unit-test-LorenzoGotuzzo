class Jogador {
  constructor(nome, posicao, idade) {
    if (!nome) {
      throw new Error('Nome é obrigatório');
    }
    if (idade < 0) {
      throw new Error('Idade inválida');
    }

    this.nome = nome;
    this.posicao = posicao;
    this.idade = idade;
    this.gols = 0;
    this.cartoesAmarelos = 0;
    this.partidasJogadas = 0;
  }

  marcarGol() {
    this.gols++;
  }

  jogarPartida() {
    this.partidasJogadas++;
  }

  receberCartaoAmarelo() {
    this.cartoesAmarelos++;
  }

  estaSuspenso() {
    return this.cartoesAmarelos >= 3;
  }

  mediaGolsPorPartida() {
    if (this.partidasJogadas === 0) return 0;
    return this.gols / this.partidasJogadas;
  }
}

module.exports = Jogador;