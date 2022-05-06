//importar o expressi
const express = require('express');

//iniciar o express
const app = express();

//nome da pasta no dist que sera feito o build
const appName = 'covid-app';

//local onde o build ira gerar os arquivios
const outputPath = `${__dirname}/dist/${appName}`;

//seta o diretorio do build para servir o conteudo angular app
app.use(express.static(outputPath));

//redirecionar qualquer requisiçãoi para index
app.get('/*' , (req,res)=>{
    res.sendFile(`${outputPath}/index.html`)
});

//ouvir a porta que heroku disponibilizar
app.listen(process.env.PORT);

