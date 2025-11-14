import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')))

dotenv.config();
const PORTA = 3000;
const API_KEY = process.env.API_KEY;

app.use(cors());


app.get('/api/clima/:cidade', async (req, res) => {
    const cidade = req.params.cidade;
    console.log(cidade)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${API_KEY}`;

    try{
       const resposta = await fetch(url);
       
       if(!resposta.ok){
          const erro = await resposta.json();
          return res.status(resposta.status).json(erro);
       }
       
       const dados = await resposta.json();
       res.status(200).json(dados);
       console.log(dados)

    }catch(error){
        console.error('Erro', error.message);
        res.status(500).json({erro: 'Falha ao Buscar'});

    };

});

app.listen(PORTA, () =>{
    console.log(`\nServidor rodando em http://localhost:${PORTA}`);
});    

