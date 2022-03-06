import PIX from 'react-qrcode-pix';
import { useState } from 'react';


const now = new Date().getTime();

function App() {

    const [ minimalPIX, setMinimalPIX ] = useState('');
    const [ fullPIX, setFullPIX ] = useState('');

    return <>
    
        <h1>Exemplos React Qrcode PIX</h1>

        <hr />

        <h3>Minimal Configuration</h3>

        <code>{`
            <PIX
                pixkey='guilhermeasn@yahoo.com.br'
                merchant='Guilherme Neves'
                city='Paraíba do Sul'

                onLoad={ payload => setMinimalPIX(payload) }
            />
        `}</code>

        <PIX
            pixkey='guilhermeasn@yahoo.com.br'
            merchant='Guilherme Neves'
            city='Paraíba do Sul'

            onLoad={ payload => setMinimalPIX(payload) }
        />

        <p>{ minimalPIX }</p>

        <hr />

        <h3>Fully configuration</h3>

        <code>{`
            <PIX
                pixkey='guilhermeasn@yahoo.com.br'
                merchant='Guilherme Neves'
                city='Paraíba do Sul'
                cep='25.850-000'
                code={ 'RQP' + now }
                amount={ 100 }

                onLoad={ payload => setFullPIX(payload) }
            />
        `}</code>

        <PIX
            pixkey='guilhermeasn@yahoo.com.br'
            merchant='Guilherme Neves'
            city='Paraíba do Sul'
            cep='25.850-000'
            code={ 'RQP' + now }
            amount={ 100 }

            onLoad={ payload => setFullPIX(payload) }
        />

        <p>{ fullPIX }</p>

        <hr />

        <p>By Guilherme Neves</p>

    </>;

}

export default App;
