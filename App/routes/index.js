var express   = require('express');
var router    = express.Router();
var mysql     = require('mysql');
var consMysql = 'mysql://root:@localhost:3306/Desafio';

router.post('/', function (req, res, next) {
  let sql;
  let login = [];
  login.push(req.body.login);
  login.push(req.body.senha);
  sql = "SELECT * FROM USUARIO WHERE nome = ? AND senha = ?";
  const connection = mysql.createConnection(consMysql);
  connection.query(sql, login, function (error, results) {
    if (error) {
      console.log(error);
      return res.status(304).end();
    }
    let resposta;
    let flag;
    if (results[0]) {
      resposta = results[0];
      flag = 200;
    } else {
      resposta = results;
      flag = 314;
    }
    return res.status(flag).json(resposta).end();
  });
});
module.exports = router;