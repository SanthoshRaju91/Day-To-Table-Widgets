/**
 * Todo controller for adding, updating, deleting, & retrieving todo list.
 * @method: add, getTodos, update, delete
 */

var _ = require('lodash');
var moment = require('moment');
var logger = require('../utils/logUtil').logger;
var mongoose = require('mongoose');

var Todo = require('../models/todo-model');
var User = require('../models/user-model');

module.exports = {

    /**
     * Function to add todo task to the DB
     * @method: add
     */
    add: function(req, res) {
        User.findOne({
            _id: mongoose.Types.ObjectId(req.body.user)
        }, function(err, user) {
            if (err) {
                logger.error('Todo - add: Error in adding task ' + err);
                res.send({
                    status: 500,
                    success: false,
                    message: 'Error in adding task'
                });
            } else if (!user) {
                logger.error('Todo - add: No user found');
                res.send({
                    status: 404,
                    success: false,
                    message: 'No user found'
                });
            } else {
                logger.info('Todo - add: User found');
                var todo = new Todo({
                    title: req.body.title,
                    description: req.body.description,
                    target: req.body.target,
                    user: user._id
                });
                todo.save(function(err1) {
                    if (err1) {
                        logger.error('Todo - add: Error in adding task ' + err1);
                        res.send({
                            status: 500,
                            success: false,
                            message: 'Error in adding task'
                        });
                    } else {
                        logger.info('Todo - add: Task added');
                        res.send({
                            status: 200,
                            success: true,
                            message: 'Task added'
                        });
                    }
                });
            }
        })
    },

    /**
     * Function to retrieve todo list for the user
     * @method: getTodos
     */
    getTodos: function(req, res) {
        User.findOne({
            _id: mongoose.Types.ObjectId(req.params.id)
        }, function(err, user) {
            if (err) {
                logger.error('Todo - get: Error while searching for user' + err);
                res.send({
                    status: 500,
                    success: false,
                    message: 'Error while searching for user'
                });
            } else if (!user) {
                logger.error('Todo -get: No user found');
                res.send({
                    status: 404,
                    success: false,
                    message: 'No user found'
                });
            } else {
                Todo.find({
                    user: user._id
                }, function(err1, todos) {
                    if (err1) {
                        logger.error('Todo - get: Error while getting the todos list for user ' + err1);
                        res.send({
                            status: 500,
                            success: false,
                            message: 'Error while getting the todos for user'
                        });
                    } else if (!todos.length) {
                        logger.error('Todo - get: No tasks found');
                        res.send({
                            status: 200,
                            success: true,
                            todos: []
                        });
                    } else {
                        logger.info('Todo - get: Tasks found');
                        res.send({
                            status: 200,
                            success: true,
                            todos: todos
                        });
                    }
                });

            }
        });
    },

    /**
     * Function to update the status of todo task
     * @method: update
     */
    update: function(req, res) {
        Todo.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(req.body.id)
        }, {
            status: req.body.status
        }, function(err) {
            if (err) {
                logger.error('Todo - update: Error in updating task ' + err);
                res.send({
                    status: 500,
                    success: false,
                    message: 'Error in updating task'
                });
            } else {
                logger.info('Todo - update: Task updated');
                res.send({
                    status: 200,
                    success: true,
                    message: 'Task updated'
                });
            }
        })
    },

    /**
     * Function to delete the todo task
     * @method: delete
     */
    delete: function(req, res) {
        Todo.findByIdAndRemove({
            _id: mongoose.Types.ObjectId(req.params.id)
        }, function(err) {
            if (err) {
                logger.error('Todo - delete: Error in deleting task ' + err);
                res.send({
                    status: 500,
                    success: false,
                    message: 'Error in deleting task'
                });
            } else {
                logger.info('Todo - delete: Task deleted');
                res.send({
                    status: 200,
                    success: true,
                    message: 'Task deleted'
                });
            }
        });
    }
};
