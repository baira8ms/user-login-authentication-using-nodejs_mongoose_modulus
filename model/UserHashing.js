var bcrypt = require('bcrypt-nodejs');

var hashing = {
	hashPassword : function(password){
		return bcrypt.hashSync(password, null, null);
	}
}

module.exports = hashing;