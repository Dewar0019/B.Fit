Template.introduction.rendered = function()   {
     IonLoading.show({
      customTemplate: '<h3>Loading…</h3><p>Please wait while we load your fitness tracker!</p>',
      duration: 1500,
    });

setTimeout(function() {
  Router.go('welcome');
}, 1500);

}