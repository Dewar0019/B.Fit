Template.imageedit.rendered = function(){
	// upload();
}

function upload(){
	// var widget = uploadcare.Widget('[role=uploadcare-uploader]');
	// var file = widget.value(); 

	uploadcare.openDialog(null, {
		crop: "200:200",
		imagesOnly: true
	}).done(function(file) {
		file.promise().done(function(fileInfo){
			getImage(fileInfo.cdnUrl);
			console.log(fileInfo.cdnUrl);
			widget.value(null);
	  });
	});
}

function getImage (cdnUrl){
	$('#profileimage').attr('src',cdnUrl);
}

Template.imageedit.events({
	'click #uploadimage' :function(){
		upload();
	},

	'click #submitimage' :function() {
		Router.go('profile');
	}
})