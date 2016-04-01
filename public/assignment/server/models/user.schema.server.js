'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchemaAss = new Schema({
	username: {
		type: String,
		unique: 'Should be unique'
	},
  password: {
    type: String,
    default: ''
  },
  firstName: {
    type: String,
    trim: true,
    default: ''
  },
  lastName: {
    type: String,
    trim: true,
    default: ''
  },
  emails: {
    type: [String]
  },
  phones:{
    type: [String]
  }
});

mongoose.model('User',UserSchemaAss);
