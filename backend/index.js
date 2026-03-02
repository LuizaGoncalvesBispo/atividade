import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'

const app = express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: 'benserverplex.ddns.net',
    user: 'alunos',
    password: 'senhaAlunos', 
    database: 'web_03mb' 
})

// Rota para LER (GET) os produtos
app.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM produtosLuizaGoncalves'
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Rota para CRIAR (POST) um produto
app.post('/produtos', (req, res) => {
    const sql = 'INSERT INTO produtosLuizaGoncalves (nome, preco) VALUES (?)'
    const values = [
        req.body.nome,
        req.body.preco
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json('Produto cadastrado com sucesso!')
    })
})

// Rota para ATUALIZAR (PUT) um produto
app.put('/produtos/:id', (req, res) => {
    const sql = 'UPDATE produtosLuizaGoncalves SET nome = ?, preco = ? WHERE id = ?'
    const id = req.params.id
    const values = [
        req.body.nome,
        req.body.preco
    ]
    
    // Passamos os valores do body e o id da URL
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json(err)
        return res.json('Produto atualizado com sucesso!')
    })
})

// Rota para DELETAR (DELETE) um produto
app.delete('/produtos/:id', (req, res) => {
    const sql = 'DELETE FROM produtosLuizaGoncalves WHERE id = ?'
    const id = req.params.id
    
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err)
        return res.json('Produto deletado com sucesso!')
    })
})

app.listen(8081, () => {
    console.log('Servidor rodando na porta 8081')
})