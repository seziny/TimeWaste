var Users = require('../datasets/users');
module.exports.getUsers = function(req, res){
	Users.find({}, function(err, usersData){
		if(err){
			res.error(err);
		} else{
			res.json(usersData);
			//console.log(usersData);
		}
	})
};

module.exports.followUser = function(req, res){
	var userId = req.body.userId;
	var wasterId = req.body.wasterId;

	Users.findById(wasterId, function(err, waster){
		waster.followers.push({userId: userId});
		waster.save();
	});

	Users.findById(userId, function(err, follower){
		follower.following.push({userId: wasterId});
		follower.save();
	})
}