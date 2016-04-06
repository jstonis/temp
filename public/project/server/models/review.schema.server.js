'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ReviewSchema = new Schema({
	productId: {
		type: Schema.ObjectId
	},
  userId: {
    type: Schema.ObjectId
  },
  review: {
    type: String,
    default: ''
  }
});

mongoose.model('Review',ReviewSchema);