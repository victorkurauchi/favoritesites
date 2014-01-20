var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
    http     = require('http');

mongoose.connect('mongodb://localhost/favoritesites');
 
var db = mongoose.connection;

db.on('error', function(err){
    console.log('Erro de conexao.', err)
});

db.once('open', function () {
  console.log('Conexão aberta.')
});

var favoriteSchema = new Schema({

  title: { 
    type     : String, 
    required : true 
  },

  url: { 
    type     : String, 
    required : true
  },

  description: { 
    type     : String, 
    required : true 
  },

  extra: {
    type     : String
  }
});

/**
 *
 */

var Model = mongoose.model('Favorite', favoriteSchema);

exports.create = function(req, res) {
  var data = req.body;

  var model = new Model(data);

  model.save(function(err, data) {
    if(err){
      console.log(err);
      res.render("list", {msg: err})
    } else {
      console.log('cadastrado né');
      res.json(data);
    }
  });
};

exports.find = function(req, res) {
  var query = {};

  Model.find(query, function (err, favorites) {

    // var options = {
    //   host: 'www.garotasestupidas.com.br'
    // };

    // http.get(options, function(http_res) {
    //     http_res.on('data', function (chunk) {
    //         //console.log('BODY: ' + chunk);

    //         for (var x in favorites) {
    //           if (favorites.hasOwnProperty(x)) {
    //             console.log('nice');
    //             favorites.htmlContent=chunk;
    //           }
    //         }

    //         console.log(favorites);
    //     });
    // });


    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      res.json(favorites);
    }
  });
}