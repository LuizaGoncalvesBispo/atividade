import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'

const app = express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: 'benserverplex.ddns.net',
    user: 'alunos',
    password: 'senhaAlunos', // Coloque sua senha aqui se tiver
    database: 'web_03mb' // Confirme se o nome do banco está igual ao que você criou
})

app.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM produtosLuizaGoncalves'
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post('/produtos', (req, res) => {
    const sql = 'INSERT INTO produtosLuizaGoncalves (nome, preco) VALUES (?)'
    const values = [
        req.body.nome,
        req.body.preco
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json('Produto cadastrado')
    })
})

app.listen(8081, () => {
    console.log('Servidor rodando na porta 8081')
})