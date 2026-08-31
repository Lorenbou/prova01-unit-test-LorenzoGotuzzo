class Jogador {
  constructor(nome, posicao, idade, numeroCamisa = 10) {
    if (!nome) {
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
    this.suspenso = false;
    this.lesionado = false;
  }

  marcarGol(quantidade = 1) {
    if (quantidade <= 0) {
      throw new Error('Quantidade de gols deve ser positiva');
    }
    if (this.lesionado) {
      throw new Error('Jogador lesionado não pode marcar gol');
    }
    if (this.suspenso) {
      throw new Error('Jogador suspenso não pode marcar gol');
    }
    this.gols += quantidade;
  }

  darAssistencia(quantidade = 1) {
    if (quantidade <= 0) {
      throw new Error('Quantidade de assistências deve ser positiva');
    }
    this.assistencias += quantidade;
  }

  receberCartaoAmarelo() {
    this.cartoesAmarelos++;
    if (this.cartoesAmarelos >= 3) {
      this.suspenso = true;
    }
  }

  receberCartaoVermelho() {
    this.cartoesVermelhos++;
    this.suspenso = true;
  }

  jogarPartida(minutos = 90) {
    if (this.suspenso) {
      throw new Error('Jogador suspenso não pode jogar');
    }
    if (this.lesionado) {
      throw new Error('Jogador lesionado não pode jogar');
    }
    if (minutos <= 0 || minutos > 120) {
      throw new Error('Minutos jogados inválidos');
    }
    this.partidasJogadas++;
    this.minutosJogados += minutos;
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

  podeJogar() {
    return !this.suspenso && !this.lesionado;
  }

  estaSuspenso() {
    return this.suspenso;
  }

  estaLesionado() {
    return this.lesionado;
  }
  mediaGolsPorPartida() {
    if (this.partidasJogadas === 0) return 0;
    return this.gols / this.partidasJogadas;
  }

  mediaMinutosPorPartida() {
    if (this.partidasJogadas === 0) return 0;
    return this.minutosJogados / this.partidasJogadas;
  }

  ehArtilheiro(minGols = 1) {
    return this.gols >= minGols;
  }
  participacoesEmGols() {
    return this.gols + this.assistencias;
  }

  mudarPosicao(novaPosicao) {
    if (!novaPosicao) {
      throw new Error('Posição é obrigatória');
    }
    this.posicao = novaPosicao;
  }

  mudarNumeroCamisa(novoNumero) {
    if (novoNumero <= 0 || novoNumero > 99) {
      throw new Error('Número de camisa inválido');
    }
    this.numeroCamisa = novoNumero;
  }

  fazerAniversario() {
    this.idade++;
  }
  reiniciarEstatisticas() {
    this.gols = 0;
    this.assistencias = 0;
    this.cartoesAmarelos = 0;
    this.cartoesVermelhos = 0;
    this.partidasJogadas = 0;
    this.minutosJogados = 0;
  }

  obterResumo() {
    return `${this.nome} (${this.posicao}) - Gols: ${this.gols}, Assistências: ${this.assistencias}`;
  }
}

module.exports = Jogador;