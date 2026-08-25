const Jogador = require('./jogador');

describe('Jogador', () => {
  let jogador;

  beforeEach(() => {
    jogador = new Jogador('Neymar', 'Atacante', 32, 10);
  });

  // --- Construtor / validações ---

  test('1. deve criar um jogador com os dados corretos', () => {
    expect(jogador.nome).toBe('Neymar');
    expect(jogador.posicao).toBe('Atacante');
    expect(jogador.idade).toBe(32);
    expect(jogador.numeroCamisa).toBe(10);
    expect(jogador.gols).toBe(0);
  });

  test('2. deve lançar erro ao criar jogador sem nome', () => {
    expect(() => new Jogador('', 'Atacante', 25, 9)).toThrow('Nome é obrigatório');
  });

  test('3. deve lançar erro ao criar jogador com idade menor que 15', () => {
    expect(() => new Jogador('João', 'Meia', 12, 8)).toThrow('Idade inválida para um jogador profissional');
  });

  test('4. deve lançar erro ao criar jogador com idade maior que 45', () => {
    expect(() => new Jogador('João', 'Meia', 50, 8)).toThrow('Idade inválida para um jogador profissional');
  });

  // --- Gols ---

  test('5. deve marcar um gol corretamente', () => {
    jogador.marcarGol();
    expect(jogador.gols).toBe(1);
  });

  test('6. deve marcar múltiplos gols de uma vez', () => {
    jogador.marcarGol(3);
    expect(jogador.gols).toBe(3);
  });

  test('7. deve lançar erro ao marcar quantidade de gols negativa ou zero', () => {
    expect(() => jogador.marcarGol(0)).toThrow('Quantidade de gols deve ser positiva');
  });

  test('8. não deve permitir marcar gol se o jogador estiver lesionado', () => {
    jogador.lesionar();
    expect(() => jogador.marcarGol()).toThrow();
  });

  test('9. não deve permitir marcar gol se o jogador estiver suspenso', () => {
    jogador.receberCartaoVermelho();
    expect(() => jogador.marcarGol()).toThrow();
  });

  // --- Assistências ---

  test('10. deve registrar uma assistência corretamente', () => {
    jogador.darAssistencia();
    expect(jogador.assistencias).toBe(1);
  });

  test('11. deve lançar erro ao registrar assistência com valor inválido', () => {
    expect(() => jogador.darAssistencia(-1)).toThrow('Quantidade de assistências deve ser positiva');
  });

  // --- Cartões ---

  test('12. deve suspender o jogador ao receber 3 cartões amarelos', () => {
    jogador.receberCartaoAmarelo();
    jogador.receberCartaoAmarelo();
    jogador.receberCartaoAmarelo();
    expect(jogador.suspenso).toBe(true);
  });

  test('13. deve suspender o jogador imediatamente ao receber cartão vermelho', () => {
    jogador.receberCartaoVermelho();
    expect(jogador.suspenso).toBe(true);
    expect(jogador.cartoesVermelhos).toBe(1);
  });

  // --- Partidas ---

  test('14. deve registrar uma partida jogada corretamente', () => {
    jogador.jogarPartida(90);
    expect(jogador.partidasJogadas).toBe(1);
    expect(jogador.minutosJogados).toBe(90);
  });

  test('15. deve lançar erro ao tentar jogar com minutos inválidos', () => {
    expect(() => jogador.jogarPartida(150)).toThrow('Minutos jogados inválidos');
  });

  test('16. não deve permitir jogar partida se estiver suspenso', () => {
    jogador.receberCartaoVermelho();
    expect(() => jogador.jogarPartida(90)).toThrow('Jogador suspenso não pode jogar');
  });

  test('17. não deve permitir jogar partida se estiver lesionado', () => {
    jogador.lesionar();
    expect(() => jogador.jogarPartida(90)).toThrow('Jogador lesionado não pode jogar');
  });

  // --- Recuperação / suspensão / aposentadoria ---

  test('18. deve permitir jogar novamente após recuperar de lesão', () => {
    jogador.lesionar();
    jogador.recuperarLesao();
    expect(() => jogador.jogarPartida(90)).not.toThrow();
  });

  test('19. deve zerar cartões amarelos ao cumprir suspensão', () => {
    jogador.receberCartaoAmarelo();
    jogador.receberCartaoAmarelo();
    jogador.receberCartaoAmarelo();
    jogador.cumprirSuspensao();
    expect(jogador.suspenso).toBe(false);
    expect(jogador.cartoesAmarelos).toBe(0);
  });

  // --- Estatísticas e status ---

  test('20. deve calcular corretamente a média de gols por partida e o status podeJogar', () => {
    jogador.jogarPartida(90);
    jogador.jogarPartida(90);
    jogador.marcarGol(2);
    expect(jogador.mediaGolsPorPartida()).toBe(1);
    expect(jogador.podeJogar()).toBe(true);
    expect(jogador.ehArtilheiro(2)).toBe(true);
  });
});