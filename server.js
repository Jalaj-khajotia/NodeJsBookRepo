var express = require('express');
var Sequelize = require('sequelize');
var config = require('./config.json');
var bodyParser = require('body-parser');

var password = config.password ? config.password : null;

var sequelize = new Sequelize(
    config.database,
    config.user,
    config.password, {
        logging: console.log,
        define: {
            timestamps: false
        }
    }
);

var app = express();
var port = 3000;
var router = express.Router(); // will help in adding routes
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var bookModel = sequelize.define('books', { //define your model
    "bookName": Sequelize.INTEGER,
    "bookPrice": Sequelize.INTEGER
});

app.use('/api', router); //this will add routing to your api.
//your api endpoint  localhost:3000/api/books

router.get('/books', function(req, res) {
    bookModel.findAll().
    then(function(books) {
        res.status(200).json(books);
    }, function(error) {
        res.status(500).send(error);
    });
});
router.get('/book/:id', function(req, res) {
    bookModel.findAll({
        where: {
            id: req.params.id
        }
    }).
    then(function(books) {
        res.status(200).json(books);
    }, function(error) {
        res.status(500).send(error);
    });
});
router.post('/book', function(req, res) {
    console.log(req.body);
    var data = {
        "bookName": req.body.bookName,
        "bookPrice": req.body.bookPrice
    };

    bookModel.create(data).
    then(function(books) {
        res.status(200).json(books);
    }, function(error) {
        res.status(500).send(error);
    });
});
router.put('/book/:id', function(req, res) {
    var data = {
        id: req.params.id,
        bookName: req.body.bookName,
        bookPrice: req.body.bookPrice
    };

    bookModel.update(data, {
        where: {
            id: data.id
        }
    }).
    then(function(book) {
        res.status(200).json(book);
    }, function(error) {
        res.status(500).send(error);
    });
});

router.delete('/book/:id', function(req, res) {
    var data = {
        id: req.params.id
    };

    bookModel.destroy({
        where: {

            id: data.id

        }
    }).
    then(function(book) {
        res.status(200).json(book);
    }, function(error) {
        res.status(500).send(error);
    });
});


app.listen(port, function() {

});
console.log('my api is running on port:' + port);
