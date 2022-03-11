import React from 'react';
import renderer from 'react-test-renderer';

import {
    PIX,
    payload
} from '../src';

import config from './config';


/* TESTANDO PAYLOAD */

test('Resultados de payload', () => {
    expect(payload(config.pixkey, config.merchant, config.city, config.cep)).toBe(config.minimalPIX);
    expect(payload(config.pixkey, config.merchant, config.city, config.cep, config.code, config.amount)).toBe(config.fullyPIX);
});


/* TESTANDO REACT */

test('Div de erro de configuracao', () => {

    const component = renderer.create(
        <PIX
            pixkey='Invalid Key'
            merchant={ config.merchant }
            city={ config.city }
        />
    ).toJSON();

    expect(component).toMatchSnapshot();
    expect(component.type).toBe('div');

});

test('QRCode com o PIX', () => {

    let payload = '';

    const component = renderer.create(
        <PIX
            pixkey={ config.pixkey }
            merchant={ config.merchant }
            city={ config.city }
            cep={ config.cep }
            code={ config.code }
            amount={ config.amount }
            onLoad={ p => payload = p }
        />
    ).toJSON();

    expect(component).toMatchSnapshot();
    expect(payload).toBe(config.fullyPIX);

});
