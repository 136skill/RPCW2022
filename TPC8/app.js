var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors');

var indexRouter = require('./routes/index');



var app = express();

//Conexão ao MongoDB
var mongoDB = 'mongodb://127.0.0.1/Aula8' 
mongoose.connect(mongoDB,  {useNewUrlParser: true}, {useUnifiedTopology :true})
var db = mongoose.connection;
db.on('error', console.error.bind(console,'Erro na conexão MongoDB'))
db.once('open', function(){
  console.log('Conexão ao mongoBD com sucesso')
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log("Erro: " + err.message)
});

module.exports = app;