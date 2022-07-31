import PIX from '../src/PIX.class';
import data from './data.json';

describe('Testing PIX class', () => {

    function findWords(...words : string[]) : RegExp {
        return new RegExp('(' + words.join(').*(') + ')', 'gim');
    }

    /* TESTA LANÇAMENTO DE ERRORS */

    test('Lançamento de erro por falta de informacoes obrigatorias', () => {
        expect(() => new PIX({
            pixkey: '',
            merchant: '',
            city: ''
        })).toThrow(findWords('pixkey', 'merchant', 'city'));
    });

    test('Lancamento de erro por chave invalida', () => {
        expect(() => new PIX({
            pixkey:   'invalid key',
            merchant: data.merchant,
            city:     data.city
        })).toThrow(findWords('pixkey', 'email', 'cpf', 'cnpj'));
    });

    test('Lancamento de erro por valor invalido', () => {
        expect(() => new PIX({
            pixkey:   data.pixkey,
            merchant: data.merchant,
            city:     data.city,
            amount:  -1
        })).toThrow(findWords('amount'));
    });


    /* TESTA GERACAO DE PAYLOAD */

    test('Payload com configuracao minima', () => {
        expect(new PIX({
            pixkey:   data.pixkey,
            merchant: data.merchant,
            city:     data.city,
            cep:      data.cep
        }).payload()).toBe(data.minimalPIX);
    });

    test('Payload com configuracao completa', () => {
        expect(new PIX({
            pixkey:   data.pixkey,
            merchant: data.merchant,
            city:     data.city,
            cep:      data.cep,
            code:     data.code,
            amount:   data.amount
        }).payload()).toBe(data.fullyPIX);
    });


    /* TESTA INTEGRIDADE DOS DADOS  */

    test('Codigo integro', () => {

        expect(new PIX({
            pixkey:   data.pixkey,
            merchant: data.merchant,
            city:     data.city,
            code:     '@#%$!'
        }).get('code')).toBe('***');

        expect(new PIX({
            pixkey:   data.pixkey,
            merchant: data.merchant,
            city:     data.city,
            code:     'ABC *dE'
        }).get('code')).toBe('ABCDE');
        
    });

    test('Valor integro', () => {
        expect(new PIX({
            pixkey:       data.pixkey,
            merchant:     data.merchant,
            city:         data.city,
            amount:       -30,
            ignoreErrors: true
        }).get('amount')).toBe(null);
    });

    test('Remove caracteres indesejados', () => {

        const pix = new PIX({
            pixkey:   data.pixkey,
            merchant: 'Antônio José',
            city:     'Três Rios',
            cep:      '36.510-000'
        });

        expect(pix.get('merchant')).toBe('Antonio Jose');
        expect(pix.get('city')).toBe('Tres Rios');
        expect(pix.get('cep')).toBe('36510000');

    });

});