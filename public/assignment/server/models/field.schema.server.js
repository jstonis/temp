'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var FieldSchema = new Schema({
	label: {
		type: String
	},
  type: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    trim: true,
    default: ''
  },
  options: {
    type: Schema.Types.Mixed,
    trim: true,
    default: ''
  }
});

module.exports = FieldSchema;