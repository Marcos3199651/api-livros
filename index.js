const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let livros = [];
let proximoId = 1;

app.get('/livros', (req, res) => {
    res.json(livros);
});

app.get('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const livro = livros.find(l => l.id === id); 

    if (!livro) {
        return res.status(404).json({ erro: 'Livro não encontrado.' });
    }
    
    res.json(livro);
});

app.post('/livros', (req, res) => {
    const { titulo, autor, ano } = req.body;

    if (!titulo || !autor || !ano) {
        return res.status(400).json({ erro: 'Título, autor e ano são obrigatórios.' });
    }

    const novoLivro = {
        id: proximoId++,
        titulo,
        autor,
        ano
    };

    livros.push(novoLivro); 
    res.status(201).json(novoLivro);
});

app.put('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, autor, ano } = req.body;

    const index = livros.findIndex(l => l.id === id); 

    if (index === -1) {
        return res.status(404).json({ erro: 'Livro não encontrado.' });
    }

    livros[index] = {
        id,
        titulo: titulo || livros[index].titulo,
        autor: autor || livros[index].autor,
        ano: ano || livros[index].ano
    };

    res.json(livros[index]);
});


app.delete('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = livros.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Livro não encontrado.' });
    }

    livros.splice(index, 1); 
    res.json({ mensagem: 'Livro excluído com sucesso.' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});