Accounts.onCreateUser(function(options, user) {    
		    if(!options.profile){
		       options.profile = {}
		    }
		    console.log(user);
		    options.profile.permission = 'default'
		    if (options.profile)
		        user.profile = options.profile;
		    	Routines.insert({ '_id': user._id });
		    	return user;
			});