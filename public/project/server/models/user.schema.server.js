'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchemaPro = new Schema({
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
  email: {
    type: String
  },
  phone:{
    type: String
  },
  roles:{
  	type: [String],
  	enum: ['student','admin','faculty']
  },
  cartItems:{
  	type: [Schema.Types.Mixed]
  },
  likedProducts:{
  	type: [Schema.ObjectId]
  },
  following:{
  	type: [Schema.ObjectId]
  }
});

mongoose.model('UserPro',UserSchemaPro);