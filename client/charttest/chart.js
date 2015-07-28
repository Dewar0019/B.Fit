Template.chart.rendered = function () { 
  grabInfo(); //Pushes Data into an array based on format required for C3.js chart rendering
 var chart = c3.generate({
      bindto: this.find('#chart'), //Looks for chart id in html
      data:{  x: 'date',
          columns: [
            grabDate, 
            grabDistance,                       
          ],
          types: {
            Running: 'area-spline',
            Walking: 'area-spline',
            Swimming: 'area-spline',
            Cycling: 'area-spline'
          },
          hide: true
          },
      subchart: { show: true },
      zoom: { enabled: true },
      axis: {
              x: { label: { text: 'Date', position: 'outer-middle'}, type: 'timeseries', tick: { format: '%m-%d'} },
              y: { label: { text: 'Distance', position: 'outer-middle'} }
            },
      legend: { show: false }
    });

  this.autorun(function (tracker) {
  $("#cardio,#strength,#flexibility").change(function(){
    //When a selection is made from the dropdown menu
      var c1 = $("#cardio").find('option:selected').val();
      chart.hide(null,{ withLegend: true });
      chart.show([c1],{ withLegend: true });

    });

    //For when the user clicks to Show Time
    $('#A').on('click',function(){
      chart.load({ columns:[ grabTime, ], unload: ['Running'], });
      chart.axis.labels({y: "Time"}); //Changes Y axis label

    });

    //For when the user clicks to Show Distance
    $('#B').on('click',function(){
      chart.load({ columns:[ grabDistance, ], unload: ['Running Time'],});
      chart.axis.labels({y: "Distance"}); //Changes Y axis label

    });

  });
}


//C3.js requires the first element of the array to be an string of the category
var grabDistance = ['Running'];
var grabTime = ['Running Time'];
var grabDate = ['date'];
      
      function grabInfo() {
        grabDistance = ['Running'];  //Makes sure to clear data upon navigating away from page 
        grabTime = ['Running Time'];
        grabDate = ['date'];
        var allCardio = Cardio.find().fetch(); //Finds all Cardio data at the moment and stores into C3.js formats
        allCardio.forEach(function(finished) { //Should eventually include only the users data and exclude startup
            grabDistance.push(finished.Distance);
            grabTime.push(finished.Time);
            grabDate.push(finished.analyticsDate);
        });
      }
