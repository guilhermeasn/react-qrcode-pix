import { PIX, payload } from '../src';
import data from './data.json';

describe('Testando o index do pacote', () => {

    /* TESTANDO PAYLOAD */

    test('Resultados de payload', () => {

        expect(payload({
            pixkey:   data.pixkey,
            merchant: data.merchant,
            city:     data.city,
            cep:      data.cep
        })).toBe(data.minimalPIX);

        expect(payload({
            pixkey:   data.pixkey,
            merchant: data.merchant,
            city:     data.city,
            cep:      data.cep,
            code:     data.code,
            amount:   data.amount
        })).toBe(data.fullyPIX);

    });


    /* TESTANDO REACT */

    test('Div de erro de configuracao', () => {

        const component = PIX({
            pixkey:   'Invalid Key',
            merchant: data.merchant,
            city:     data.city
        });

        expect(component).toMatchSnapshot();
        expect(component.type.toString()).toBe('div');
        expect(component.props?.['children' as keyof typeof component.props]).toMatch(/pix/i);

    });

    test('QRCode com o PIX', () => {

        const component = PIX({
            pixkey:   data.pixkey,
            merchant: data.merchant,
            city:     data.city,
            cep:      data.cep,
            code:     data.code,
            amount:   data.amount
    });

        expect(component).toMatchSnapshot();
        expect(component.type.toString()).toMatch('Component');
        expect(component.props?.['payload' as keyof typeof component.props]).toBe(data.fullyPIX);

    });

});