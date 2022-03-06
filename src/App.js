import PIX from 'react-qrcode-pix';
import { useState } from 'react';


function App() {

    const [ minimalPIX, setMinimalPIX ] = useState('');
    const [ fullPIX, setFullPIX ] = useState('');

    return <>
    
        <h1>Exemplos React Qrcode PIX</h1>

        <PIX
            pixkey='guilhermeasn@yahoo.com.br'
            merchant='Guilherme Neves'
            city='Paraíba do Sul'

            onLoad={ setMinimalPIX }

            size={ 256 }
        />

        <p>{ minimalPIX }</p>

        <PIX
            pixkey='guilhermeasn@yahoo.com.br'
            merchant='Guilherme Neves'
            city='Paraíba do Sul'
            cep='25.850-000'
            code='TESTJS0001'
            amount={ 100 }

            onLoad={ setFullPIX }

            size={ 256 }
        />

        <p>{ fullPIX }</p>

        <hr />
        
        <p>By Guilherme Neves</p>

    </>;

}

export default App;
