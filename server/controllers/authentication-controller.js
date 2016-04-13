var User = require('../datasets/users');

module.exports.signup = function(req, res){
	var user = new User(req.body);
	user.save();

	res.json(req.body);
}

module.exports.login = function(req, res){
	User.find({ email: req.body.email }, function(err, results){
		if(err){
			console.log("Error out");
		} 
		if(results && results.length === 1){
			var userData = results[0];
			userData.comparePassword(req.body.password, function(err, isMatch) {
		        if (err) {
		        	throw err;
				} else{
			        console.log('Password:', isMatch);
			        if(isMatch){
			        res.json({email: req.body.email,
									_id: userData._id,
									userName: userData.username,
									image: userData.image,
									following: userData.following,
									followers: userData.followers});
					 
					} else{
					res.json({status: 500});
					}
				} 
    		});

		}
			
	})
}