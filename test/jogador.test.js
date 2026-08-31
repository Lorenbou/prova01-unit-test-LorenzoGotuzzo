const Jogador = require('../src/jogador');

describe('Jogador', () => {
  let jogador;

  beforeEach(() => {
    jogador = new Jogador('Messi', 'Atacante', 39, 10);
  });

  // Teste 1: Construtor com sucesso
  test('1. deve criar um jogador com os dados corretos', () => {
    expect(jogador.nome).toBe('Messi');
    expect(jogador.posicao).toBe('Atacante');
    expect(jogador.idade).toBe(39);
    expect(jogador.numeroCamisa).toBe(10);
    expect(jogador.gols).toBe(0);
    expect(jogador.assistencias).toBe(0);
  });

  // Teste 2: Construtor com validação de erros
  test('2. deve lançar erro ao tentar criar um jogador com nome ou idade inválidos', () => {
    expect(() => new Jogador('', 'Atacante', 25, 10)).toThrow('Nome é obrigatório');
    expect(() => new Jogador('João', 'Meia', 12, 10)).toThrow('Idade inválida para um jogador profissional');
    expect(() => new Jogador('João', 'Meia', 50, 10)).toThrow('Idade inválida para um jogador profissional');
  });

  // Teste 3: Marcar Gols
  test('3. deve marcar gols e lançar erro para quantidades inválidas', () => {
    jogador.marcarGol();
    jogador.marcarGol(2);
    expect(jogador.gols).toBe(3);
    expect(() => jogador.marcarGol(0)).toThrow('Quantidade de gols deve ser positiva');
  });

  // Teste 4: Assistências
  test('4. deve registrar assistências e lançar erro se a quantidade for negativa', () => {
    jogador.darAssistencia(2);
    expect(jogador.assistencias).toBe(2);
    expect(() => jogador.darAssistencia(-1)).toThrow('Quantidade de assistências deve ser positiva');
  });

  // Teste 5: Cartões e Suspensão
  test('5. deve suspender o jogador ao receber 3 cartões amarelos ou 1 cartão vermelho', () => {
    jogador.receberCartaoAmarelo();
    jogador.receberCartaoAmarelo();
    expect(jogador.estaSuspenso()).toBe(false);

    jogador.receberCartaoAmarelo(); // 3º cartão
    expect(jogador.estaSuspenso()).toBe(true);

    const outroJogador = new Jogador('Vini Jr', 'Atacante', 24, 7);
    outroJogador.receberCartaoVermelho();
    expect(outroJogador.estaSuspenso()).toBe(true);
    expect(outroJogador.cartoesVermelhos).toBe(1);
  });

  // Teste 6: Partidas Jogadas e Minutos
  test('6. deve registrar partidas e minutos jogados, validando minutos de 1 a 120', () => {
    jogador.jogarPartida(90);
    expect(jogador.partidasJogadas).toBe(1);
    expect(jogador.minutosJogados).toBe(90);
    expect(() => jogador.jogarPartida(150)).toThrow('Minutos jogados inválidos');
  });

  // Teste 7: Bloqueios de Suspensão e Lesão
  test('7. não deve permitir jogar ou marcar gol se estiver suspenso ou lesionado', () => {
    jogador.receberCartaoVermelho();
    expect(() => jogador.jogarPartida(90)).toThrow('Jogador suspenso não pode jogar');
    expect(() => jogador.marcarGol()).toThrow('Jogador suspenso não pode marcar gol');

    const jogadorLesionado = new Jogador('Rodrygo', 'Atacante', 23, 11);
    jogadorLesionado.lesionar();
    expect(jogadorLesionado.estaLesionado()).toBe(true);
    expect(() => jogadorLesionado.jogarPartida(90)).toThrow('Jogador lesionado não pode jogar');
    expect(() => jogadorLesionado.marcarGol()).toThrow('Jogador lesionado não pode marcar gol');
  });

  // Teste 8: Recuperação de Lesão e Suspensão
  test('8. deve permitir jogar novamente após recuperar de lesão ou cumprir suspensão', () => {
    jogador.receberCartaoAmarelo();
    jogador.receberCartaoAmarelo();
    jogador.receberCartaoAmarelo();
    jogador.cumprirSuspensao();
    expect(jogador.estaSuspenso()).toBe(false);
    expect(jogador.cartoesAmarelos).toBe(0);

    jogador.lesionar();
    jogador.recuperarLesao();
    expect(jogador.podeJogar()).toBe(true);
    expect(() => jogador.jogarPartida(90)).not.toThrow();
  });

  // Teste 9: Alteração de Posição e Camisa
  test('9. deve alterar a posição e o número da camisa corretamente', () => {
    jogador.mudarPosicao('Meia');
    jogador.mudarNumeroCamisa(11);
    expect(jogador.posicao).toBe('Meia');
    expect(jogador.numeroCamisa).toBe(11);
    expect(() => jogador.mudarPosicao('')).toThrow('Posição é obrigatória');
    expect(() => jogador.mudarNumeroCamisa(0)).toThrow('Número de camisa inválido');
  });

  // Teste 10: Estatísticas e Resumo
  test('10. deve calcular médias, estatísticas, aniversário e gerar resumo', () => {
    jogador.jogarPartida(90);
    jogador.jogarPartida(90);
    jogador.marcarGol(2);
    jogador.darAssistencia(1);
    jogador.fazerAniversario();

    expect(jogador.idade).toBe(40);
    expect(jogador.mediaGolsPorPartida()).toBe(1);
    expect(jogador.mediaMinutosPorPartida()).toBe(90);
    expect(jogador.participacoesEmGols()).toBe(3);
    expect(jogador.ehArtilheiro(2)).toBe(true);
    expect(jogador.obterResumo()).toContain('Messi (Atacante) - Gols: 2, Assistências: 1');
  });
});