'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose');

//db config
var dbconfig = {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/assignment',
    options: {
      user: '',
      pass: ''
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  };

// Load the mongoose models
module.exports.loadModels = function () {
  //model files
    require('./public/assignment/server/models/field.schema.server.js');
    require('./public/assignment/server/models/form.schema.server.js');
    require('./public/assignment/server/models/user.schema.server.js');
};

// Initialize Mongoose
module.exports.connect = function () {
  var _this = this;

  var db = mongoose.connect(dbconfig.uri, dbconfig.options, function (err) {
    // Log Error
    if (err) {
      console.error('Could not connect to MongoDB!');
      console.log(err);
    } else {

      // Enabling mongoose debug mode if required
      mongoose.set('debug', dbconfig.debug);
      console.log("Connected to Db")
    }
  });
};

module.exports.disconnect = function (cb) {
  mongoose.disconnect(function (err) {
    console.info('Disconnected from MongoDB.');
    cb(err);
  });
};
