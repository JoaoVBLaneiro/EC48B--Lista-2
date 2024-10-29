const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public", {
    index: false, 
    immutable: true, 
    cacheControl: true,
    maxAge: "30d"
}));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect('landing');  
});

app.get('/landing', (req, res) => {
    res.render('landing'); 
});

app.get('/rota1', (req, res) => {
    res.render('rota', { rotaAtual: "Rota 1 ☝️", proximaRota: "Rota 2", link: "/rota2", landingLink: "/" });
});

app.get('/rota2', (req, res) => {
    res.render('rota', { rotaAtual: "Rota 2 ✌️", proximaRota: "Rota 1", link: "/rota1", landingLink: "/" });
});

app.get('/inverter', (req, res) => {
    const texto = req.query.texto || '';
    const textoInvertido = texto.split('').reverse().join('');
    res.render('inverter', { texto, textoInvertido, landingLink: "/" });
});

app.get('/login', (req, res) => {
    res.render('login', { landingLink: "/" });
});

app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;
    if (!usuario || !senha) {
        return res.render('login', { landingLink: "/" });
    }
    const acesso = senha === usuario + usuario;
    const mensagem = acesso
        ? `Usuário ${usuario} possui permissão de acesso 🔓✅`
        : `Usuário ${usuario} não possui permissão de acesso ou a senha está incorreta 🔒❌`;
    res.render('login', { usuario, mensagem, landingLink: "/" });
});

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});
