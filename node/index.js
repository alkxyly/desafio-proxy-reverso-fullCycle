const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

app.get('/', (req, res) => {
    inserirPessoa('Full Cycle',res);
});

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

function inserirPessoa(nome, res){
    const sql = `INSERT INTO people(name) values('${nome}')`;
    const mysql = require('mysql')
    const connection = mysql.createConnection(config)
    connection.query(sql)

    obterPessoa(res, connection)
}

function obterPessoa(res, connection) {        
    connection.query(`SELECT id, name FROM people`, (error, result, fields) => {
      if (error) {
        throw error
      }
      
      let table = '<table>';
      table += `<tr>
                    <th>ID</th>
                    <th>NOME</th>
                </tr>`
    
      for(let pessoa of result) {      
        table += `<tr><td>${pessoa.id}</td><td>${pessoa.name}</td></tr>`;
      }
  
      table += '</table>';    
      res.send('<h1>Full Cycle Rocks!</h1>' + table);    
    });   
    connection.end();
}