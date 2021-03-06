var express = require('express'),
    bodyParser = require('body-parser'),
    multiparty= require('connect-multiparty'),
    mongodb = require('mongodb'),
    objectId = require('mongodb').ObjectID,
    fs = require('fs');

var app = express();

// body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(multiparty());

var port = 82;

app.listen(port);

var db = new mongodb.Db(
    'instagram',
    new mongodb.Server('localhost',27017,{}),
    {}
);

console.log('Servidor HTTP esta escutando na porta ' + port);

app.get('/', function(req, res){
    res.send({msg:'Olá'});
});

// POST(create)
app.post('/api', function(req, res){
    res.setHeader("Access-Control-Allow-Origin","*");
    var dados = req.body;
    var date = new Date();
    time_stamp = date.getTime();
    var url_imagem = time_stamp + "_" + req.files.arquivo.originalFilename;
    var path_origem = req.files.arquivo.path;
    var path_destino = './uploads/' + url_imagem;
    fs.rename(path_origem, path_destino, function(err){
        if(err)
        {
            res.status(500).json({error:err});
            return;
        }
    });
    var dados = {
        url_imagem: url_imagem,
        titulo: req.body.titulo
    };

   
    db.open(function(err, mongoclient){
        mongoclient.collection('postagens', function(err, collection){
            collection.insert(dados, function(err, records){
                if(err){
                    res.json({'status': 'erro'});
                }else{
                    res.json({'status': 'inclusao realizada com sucesso'});
                }
                mongoclient.close();
            });
        });
    });
});

//get
app.get('/api', function(req, res){
    res.setHeader("Access-Control-Allow-Origin","*");
    db.open(function(err, mongoclient){
        mongoclient.collection('postagens', function(err, collection){
            collection.find().toArray(function(err,results){
                if(err)
                {
                    res.json(err);
                }
                else
                {
                    res.json(results);
                }
                mongoclient.close();
            });
        });
    });
});

app.get('/uploads/:imagem',function(req,res){
    var img = req.params.imagem;

    fs.readFile('./uploads/'+img,function(err,content){
        if(err)
        {
            res.status(400).json(err);
            return;
        }
        res.writeHead(200, {'Content-type':'image/jpg'});
        res.end(content);
    });
});
// GET by ID(ready)
app.get('/api/:id', function(req, res){
    db.open(function(err, mongoclient){
        mongoclient.collection('postagens', function(err, collection){
            collection.find(objectId(req.params.id)).toArray(function(err, results){
                if(err){
                    res.json(err);
                }else{
                    res.json(results);
                }
                mongoclient.close();
            });
        });
    });
});
// PUT by ID(ready)
app.put('/api/:id', function(req, res){
    db.open(function(err, mongoclient){
        mongoclient.collection('postagens', function(err, collection){
            collection.update(
                {_id: objectId(req.params.id)},
                {$set: {titulo: req.body.titulo}},
                {},
                function(err, records)
                {
                    if(err)
                    {
                        res.json(err);
                    }
                    else
                    {
                        res.json(records);
                    }
                    mongoclient.close();
                }
            );
        });
    });
});
// delete by ID(remover)
app.delete('/api/:id', function(req, res){
    db.open(function(err, mongoclient){
        mongoclient.collection('postagens', function(err, collection){
            collection.remove(
                {_id:objectId(req.params.id)},
                function(err,records){
                    if(err){
                        res.json(err);
                    }
                    else
                    {
                        res.json(records);
                    }
                    mongoclient.close();
                }
            );
        });
    });
});