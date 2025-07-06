import React from 'react';
import type { QrcodeProps } from 'react-qrcode-pretty';
import Component from './Component.class';
import type { PIXProps } from './PIX.class';
import PixPayload from './PIX.class';


/**
 * REACT-QRCODE-PIX
 * 
 * @author Guilherme Neves <guilhermeasn@yahoo.com.br>
 */


/**
 * Gera o payload para poder usar no qrcode ou no sistema copia e cola do PIX
 */
export function payload(props : PIXProps) {

    const pix = new PixPayload(props);
    return pix.payload();

}

/**
 * Qrcode estatico do PIX
 */
export function PIX({
    pixkey,
    merchant,
    city,
    cep,
    code,
    amount,
    ignoreErrors = false,
    onLoad = (_ : string) => {},
    ...settings
} : PIXProps & Omit<QrcodeProps<'canvas'>, 'value'> & { onLoad ?: (payload : string) => void }) {

    try {

        return React.createElement(Component, {
            payload: payload({ pixkey, merchant, city, cep, code, amount, ignoreErrors }),
            settings,
            onLoad
        });

    } catch(error) {

        if(process.env.NODE_ENV !== 'test') console.error(error);

        return React.createElement('div', {
            style: {
                width: settings?.size ?? 256,
                height: settings?.size ?? 256,
                margin: '10px 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#e5d5d5',
                border: 'solid 1px',
                borderRadius: '10px',
                borderColor: '#440000',
                textAlign: 'center',
                color: '#770000',
                fontSize: '18px',
                opacity: '0.75'
            }
        }, 'PIX não pode ser carregado!');

    }

} 

export default PIX;