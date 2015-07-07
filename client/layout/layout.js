Session.setDefault("searchCategory", "All");

Template.layout.events({
    'submit #searchForm': function (event) {
        event.preventDefault();
        var s = searchBox.value;
        Session.set("searchTerm", s);


        Router.go('/search/' + Session.get("searchTerm"));
     },
     'click #searchBox': function(event) {
         searchBox.value = '';
     }
});



