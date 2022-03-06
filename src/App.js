import { PIX } from 'react-qrcode-pix';
import { useState } from 'react';


const now = new Date().getTime();

function App() {

    const [ minimalPIX, setMinimalPIX ] = useState('');
    const [ fullPIX, setFullPIX ] = useState('');

    return <>
    
        <h1>Exemplos React Qrcode PIX</h1>

        <p>
            GITHUB:
            <a href='https://github.com/guilhermeasn/react-qrcode-pix'>
                https://github.com/guilhermeasn/react-qrcode-pix    
            </a>
        </p>

        <p>
            SANDBOX:
            <a href='https://codesandbox.io/s/cool-resonance-rrcv9q?file=/src/App.js'>
            https://codesandbox.io/s/cool-resonance-rrcv9q?file=/src/App.js    
            </a>
        </p>

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

            onLoad={ setMinimalPIX }
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

            onLoad={ setFullPIX }
        />

        <p>{ fullPIX }</p>

        <hr />

        <p>By Guilherme Neves</p>

    </>;

}

export default App;
