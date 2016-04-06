'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ProductSchema = new Schema({
	image: {
		type: String
	},
  productName: {
    type: String,
    default: ''
  },
  carMakes: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  accessory: {
    type: Boolean
  },
  kit: {
    type: Boolean
  },
  numOfLikes:{
    type: Number
  },
  carKit:{
  	type: Boolean
  },
  reviews:{
  	type: [Schema.ObjectId],
    ref : 'Reviews'
  },
  price:{
  	type: Number
  }
});

mongoose.model('Product',ProductSchema);