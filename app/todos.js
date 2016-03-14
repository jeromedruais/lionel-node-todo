module.exports = function (app) {

  var todos = [];
  var todoIdCount = 0;

  function getTodos(res) {
    res.send(todos);
  }

  // api ---------------------------------------------------------------------
  // get all todos
  app.get('/api/todos', function (req, res) {
    getTodos(res);
  });

  // create todo and send back all todos after creation
  app.post('/api/todos', function (req, res) {
    todos.push({
      type: "todo",
      text: req.body.text,
      done: false,
      _id: (todoIdCount++),
      _rev: 0
    });
    getTodos(res);
  });

  // delete a todo
  app.delete('/api/todos/:id', function (req, res) {
    todos = todos.filter(function (todo) {
      return !(todo._id == req.params.id && todo._rev == req.query.rev);
    });
    getTodos(res);
  });

};
