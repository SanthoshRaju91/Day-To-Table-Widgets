/**
* Router configuration for the project.
*/

var express = require('express');
var config = require('../config/');
var router = express.Router();

var todo = require('../controllers/todo-controller');
var notes = require('../controllers/notes-controller');

router.post('/add', todo.add);
router.get('/todos/:id', todo.getTodos);
router.post('/update', todo.update);
router.delete('/delete/:id', todo.delete);

router.post('/notes/add', notes.add);
router.get('/notes/:id', notes.get);
router.delete('/notes/delete/:id', notes.delete);

module.exports = router;
