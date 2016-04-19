'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
  crypto = require('crypto');

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
  },
  roles: {
    type:[String],
    trim: true
  }
});


/**
 * Create instance method for hashing a password
 */
UserSchemaAss.methods.hashPassword = function (password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
  } else {
    return password;
  }
};

/**
 * Create instance method for authenticating user
 */
UserSchemaAss.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};

/**
 * Hook a pre save method to hash the password
 */
UserSchemaAss.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

/**
 * Hook a pre validate method to test the local password
 */
UserSchemaAss.pre('validate', function (next) {
  if (this.provider === 'local' && this.password) {
   // var result = owasp.test(this.password);
    
    if (this.password.length<6) {
      this.invalidate('password', {message:'Invalid password'});
    }
  }

  next();
});


mongoose.model('User',UserSchemaAss);