class Jogador {
  constructor(nome, posicao, idade, numeroCamisa) {
    if (!nome || nome.trim() === '') {
      throw new Error('Nome é obrigatório');
    }
    if (idade < 15 || idade > 45) {
      throw new Error('Idade inválida para um jogador profissional');
    }

    this.nome = nome;
    this.posicao = posicao;
    this.idade = idade;
    this.numeroCamisa = numeroCamisa;

    this.gols = 0;
    this.assistencias = 0;
    this.cartoesAmarelos = 0;
    this.cartoesVermelhos = 0;
    this.partidasJogadas = 0;
    this.minutosJogados = 0;
    this.lesionado = false;
    this.suspenso = false;
    this.ativo = true;
  }

  marcarGol(quantidade = 1) {
    if (this.suspenso || this.lesionado) {
      throw new Error('Jogador não pode marcar gols estando suspenso ou lesionado');
    }
    if (quantidade <= 0) {
      throw new Error('Quantidade de gols deve ser positiva');
    }
    this.gols += quantidade;
    return this.gols;
  }

  darAssistencia(quantidade = 1) {
    if (quantidade <= 0) {
      throw new Error('Quantidade de assistências deve ser positiva');
    }
    this.assistencias += quantidade;
    return this.assistencias;
  }

  receberCartaoAmarelo() {
    this.cartoesAmarelos += 1;
    if (this.cartoesAmarelos >= 3) {
      this.suspenso = true;
    }
    return this.cartoesAmarelos;
  }

  receberCartaoVermelho() {
    this.cartoesVermelhos += 1;
    this.suspenso = true;
    return this.cartoesVermelhos;
  }

  jogarPartida(minutos) {
    if (this.suspenso) {
      throw new Error('Jogador suspenso não pode jogar');
    }
    if (this.lesionado) {
      throw new Error('Jogador lesionado não pode jogar');
    }
    if (minutos <= 0 || minutos > 120) {
      throw new Error('Minutos jogados inválidos');
    }
    this.partidasJogadas += 1;
    this.minutosJogados += minutos;
    return this.partidasJogadas;
  }

  lesionar() {
    this.lesionado = true;
  }

  recuperarLesao() {
    this.lesionado = false;
  }

  cumprirSuspensao() {
    this.suspenso = false;
    this.cartoesAmarelos = 0;
  }

  aposentar() {
    this.ativo = false;
  }

  mediaGolsPorPartida() {
    if (this.partidasJogadas === 0) return 0;
    return Number((this.gols / this.partidasJogadas).toFixed(2));
  }

  mediaMinutosPorPartida() {
    if (this.partidasJogadas === 0) return 0;
    return Number((this.minutosJogados / this.partidasJogadas).toFixed(2));
  }

  ehArtilheiro(golsMinimos) {
    return this.gols >= golsMinimos;
  }

  podeJogar() {
    return this.ativo && !this.suspenso && !this.lesionado;
  }

  resumo() {
    return `${this.nome} (#${this.numeroCamisa}) - ${this.posicao}: ${this.gols} gols, ${this.assistencias} assistências em ${this.partidasJogadas} partidas`;
  }
}

module.exports = Jogador;