/**
* Router configuration for the project.
*/

var express = require('express');
var config = require('../config/');
var router = express.Router();

var todo = require('../controllers/todo-controller.js');

router.post('/add', todo.add);
router.get('/todos/:id', todo.getTodos);
router.post('/update', todo.update);
router.delete('/delete/:id', todo.delete);

module.exports = router;
