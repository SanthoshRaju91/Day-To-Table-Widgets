/**
 * Notes controller for adding, retrieving, deleting Notes
 * @method: add, get, delete
 */

var mongoose = require('mongoose');
var moment = require('moment');
var logger = require('../utils/logUtil').logger;

var Notes = require('../models/notes-model');
var User = require('../models/user-model');

module.exports = {

    /**
     * Function to add notes for the user
     * @method: add
     */
    add: function(req, res) {
        User.findOne({
            _id: mongoose.Types.ObjectId(req.body.user)
        }, function(err, user) {
            if (err) {
                logger.error('add notes: Error while adding notes for the user: ' + err);
                res.json({
                    status: 500,
                    success: false,
                    message: 'Error while adding notes for the user'
                });
            } else if (!user) {
                logger.error('add notes: No user found for the ID');
                res.json({
                    status: 404,
                    success: false,
                    message: 'No user found for the user'
                });
            } else {
                logger.info('add notes: User found');
                var note = new Notes({
                    notes: req.body.note,
                    user: user._id
                });
                note.save(function(err1) {
                    if (err1) {
                        logger.error('add notes: Error while adding notes for the user: ' + err1);
                        res.json({
                            status: 500,
                            success: false,
                            message: 'Error while adding notes for the user'
                        });
                    } else {
                        logger.info('add notes: Note added successfully');
                        res.json({
                            status: 200,
                            success: true,
                            message: 'Notes added successfully'
                        });
                    }
                });
            }
        });
    },

    /**
     * Function to retrieve notes for the logged in user
     * @method: get
     */
    get: function(req, res) {
        User.findOne({
            _id: mongoose.Types.ObjectId(req.params.id)
        }, function(err, user) {
            if (err) {
                logger.error('get notes: Error in finding the user: ' + err);
                res.json({
                    status: 500,
                    success: false,
                    message: 'Error in finding the user'
                });
            } else if (!user) {
                logger.error('get notes: No user found');
                res.json({
                    status: 404,
                    success: false,
                    message: 'No user found'
                });
            } else {
                logger.info('get notes: User found');
                Notes.find({
                    user: user._id
                }, function(err1, notes) {
                    if (err1) {
                        logger.error('get notes: Error in getting notes for the user');
                        res.json({
                            status: 500,
                            success: false,
                            message: 'Error in getting notes for the user'
                        });
                    } else if (!notes) {
                        logger.info('get notes: No notes found for the user');
                        res.json({
                            status: 200,
                            success: true,
                            count: 0,
                            message: 'No notes found for the user'
                        });
                    } else {
                        logger.info('get notes: Notes retrieved for the user');
                        res.json({
                            status: 200,
                            success: true,
                            count: notes.length,
                            notes: notes
                        });
                    }
                });
            }
        });
    },

    /**
     * Function to delete a notes for the logged in user
     * @method: delete
     */
    delete: function(req, res) {
      Notes.findByIdAndRemove({
          _id: mongoose.Types.ObjectId(req.params.id)
      }, function(err) {
          if (err) {
              logger.error('delete notes: Error while deleting notes' + err);
              res.json({
                  status: 500,
                  success: false,
                  message: 'Error while deleting notes'
              });
          } else {
              logger.info('delete notes: Note deleted successfully');
              res.json({
                  status: 200,
                  success: true,
                  message: 'Note deleted successfully'
              })
          }
      });
    }
};
