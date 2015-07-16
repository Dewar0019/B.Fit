Template.introduction.rendered = function()   {
    IonLoading.show({
      customTemplate: '<h3>Loading…</h3><p>Please wait while we load your fitness tracker!</p>',
      duration: 2000,
    });

	setTimeout(function() {
	  Router.go('welcome');
	}, 2000);

	$('.nav-bar').hide();
  	$('.content').removeClass('has-nav');
}

Template.introduction.destroyed = function () {
  $('.nav-bar').show();
  $('.content').addClass('has-nav');
}