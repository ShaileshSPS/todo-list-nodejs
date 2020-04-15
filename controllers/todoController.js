var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var urlencodedParser = bodyParser.urlencoded({extended:true})
//var data = [{item: 'get milk'}, {item:'some coding apps'}, {item:'walking'}];

// connect to the database
mongoose.connect('mongodb+srv://test:test@todo-8olza.mongodb.net/test?retryWrites=true&w=majority')

// create a schema
var todoSchema = new mongoose.Schema({
    item : String
});

var Todo = mongoose.model('Todo', todoSchema); // creating collection

module.exports = function(app) {

    app.get('/todo', function(req, res){
        //get data from mongodb and pass it to view.
        //Todo.find({item:'buy flowers'}) // for single collection
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', {todos: data})
        });
        
    })
	
	app.post('/todo', urlencodedParser, function(req,res){
        //get data from view and add it to mongodb.
        var newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
        })
    
    })

    app.delete('/todo/:item', function(req,res){
        //delete the requested item from mongodb
        Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
            if (err) throw err;
            res.json(data);
        })

    })


};