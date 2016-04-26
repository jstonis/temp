'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose');

//db config
var dbconfig = {
    //for development
    /*uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (  'localhost') + '/webdevspring2016',
    options: {
      user: '',
      pass: ''
    },*/
    //for production
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.OPENSHIFT_MONGODB_DB_HOST+':'+process.env.OPENSHIFT_MONGODB_DB_PORT) + '/webdevspring2016',
    options: {
       user: 'admin',
       pass: 'u6h6L8K_tm3H'
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

  //model files for project
    require('./public/project/server/models/user.schema.server.js');
    require('./public/project/server/models/product.schema.server.js');
    require('./public/project/server/models/review.schema.server.js');
};

// Initialize Mongoose
module.exports.connect = function (cb) {
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
      if(cb){cb()}
    }
  });
};

module.exports.disconnect = function (cb) {
  mongoose.disconnect(function (err) {
    console.info('Disconnected from MongoDB.');
    cb(err);
  });
};
