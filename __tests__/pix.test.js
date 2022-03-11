import PIX from '../src/PIX.class';
import config from './config';


/* TESTA LANÇAMENTO DE ERRORS */

function findWords(...words) {
    return new RegExp('(' + words.join(').*(') + ')', 'gim');
}

test('Lançamento de erro por falta de informacoes obrigatorias', () => {
    expect(() => new PIX()).toThrow(findWords('pixkey', 'merchant', 'city'));
});

test('Lancamento de erro por chave invalida', () => {
    expect(() => new PIX('invalid key', config.merchant, config.city)).toThrow(findWords('pixkey', 'email', 'cpf', 'cnpj'));
});

test('Lancamento de erro por valor invalido', () => {
    expect(() => new PIX(config.pixkey, config.merchant, config.city, config.cep, config.code, 'invalid amount')).toThrow(findWords('amount'));
});


/* TESTA GERACAO DE PAYLOAD */

test('Payload com configuracao minima', () => {
    expect(new PIX(config.pixkey, config.merchant, config.city, config.cep).payload()).toBe(config.minimalPIX);
});

test('Payload com configuracao completa', () => {
    expect(new PIX(config.pixkey, config.merchant, config.city, config.cep, config.code, config.amount).payload()).toBe(config.fullyPIX);
});


/* TESTA INTEGRIDADE DOS DADOS  */

test('Codigo integro', () => {
    expect(new PIX(config.pixkey, config.merchant, config.city, config.cep, '@#%$!').code).toBe('***');
    expect(new PIX(config.pixkey, config.merchant, config.city, config.cep, 'ABC *dE').code).toBe('ABCDE');
});

test('Valor integro', () => {
    expect(new PIX(config.pixkey, config.merchant, config.city, config.cep, config.code, -30).amount).toBe(null);
    expect(new PIX(config.pixkey, config.merchant, config.city, config.cep, config.code, 'abc', true).amount).toBe(null);
});

test('Remove caracteres indesejados', () => {

    const pix = new PIX(config.pixkey, 'Antônio José', 'Três Rios', '36.510-000');

    expect(pix.merchant).toBe('Antonio Jose');
    expect(pix.city).toBe('Tres Rios');
    expect(pix.cep).toBe('36510000');

});
