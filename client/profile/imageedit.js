Template.imageedit.events({
	'click #uploadimage' :function(){
		upload();
	},

	'click #submitimage' :function() {
		Router.go('profile');
	}
})

Template.imageedit.rendered = function(){
	if(ProfileImages.find().count()==1){
		$('#profileimage').attr('src',ProfileImages.findOne({_id: ProfileImages.findOne()._id}).address);
	};
};

function upload(){
	uploadcare.openDialog(null, {
		crop: "200:200",
		imagesOnly: true
	}).done(function(file) {
		file.promise().done(function(fileInfo){
			getImage(fileInfo.cdnUrl);
			addImages(fileInfo.cdnUrl);
			console.log(fileInfo.cdnUrl);
	  });
	});
}

function getImage (cdnUrl){
	$('#profileimage').attr('src',cdnUrl);
}

function addImages(cdnUrl){
	if(ProfileImages.find().count()==1){
		ProfileImages.remove({_id: ProfileImages.findOne()._id});
	};
	
	var address = cdnUrl;
	var haha = "hey";
	ProfileImages.insert({haha:haha,address:address});
	console.log(ProfileImages.findOne().address);
}

