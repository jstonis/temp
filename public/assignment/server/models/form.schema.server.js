'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
  FieldSchema = require('./field.schema.server.js');

var FormSchema = new Schema({
	userId: {
		type: String
	},
  title: {
    type: String,
    default: ''
  },
  fields: {
    type: [FieldSchema]
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Form',FormSchema);