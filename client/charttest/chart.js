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
            Swimming: 'area-spline',
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
  $("#cardio").change(function(){
    //When a selection is made from the dropdown menu
      var c1 = $("#cardio").find('option:selected').val();
      if(c1 == "Swimming") {
        Session.set("Date", grabSwimDate);
        Session.set("Time", grabSwimTime);
        Session.set("Distance", grabSwimDistance);
      } else if( c1 == "Running") {
        Session.set("Date", grabDate);
        Session.set("Time", grabTime);
        Session.set("Distance", grabDistance);
      }
      chart.hide(null,{ withLegend: true });
      chart.show([c1],{ withLegend: true });

    });

    //For when the user clicks to Show Time
    $('#A').on('click',function(){
      chart.load({ columns:[ Session.get("Time"), ], unload: [Session.get("Distance")[0]], });
      chart.axis.labels({y: "Time (Mins)"}); //Changes Y axis label

    });

    //For when the user clicks to Show Distance
    $('#B').on('click',function(){
      chart.load({ columns:[ Session.get("Distance"), ], unload: [Session.get("Time")[0]],});
      chart.axis.labels({y: "Distance (Miles)"}); //Changes Y axis label

    });

  });
}


//C3.js requires the first element of the array to be an string of the category
var grabDistance = ['Running'];
var grabTime = ['Running Time'];
var grabDate = ['date'];

//Seperate Arrays for Swimming

var grabSwimTime = ['Swimming Time'];      
var grabSwimDistance = ['Swimming'];
var grabSwimDate = ['Date'];
      function grabInfo() {
        grabDistance = ['Running'];  //Makes sure to clear data upon navigating away from page 
        grabTime = ['Running Time'];
        grabDate = ['date'];
        grabSwimTime = ['Swimming Time'];
        grabSwimDistance = ['Swimming'];
        grabSwimDate = ['Date'];    
        var allCardio = Cardio.find().fetch(); //Finds all Cardio data at the moment and stores into C3.js formats
        allCardio.forEach(function(finished) { //Should eventually include only the users data and exclude startup
          if(finished.Name.toLowerCase() == "running") {
            grabDistance.push(finished.Distance);
            grabTime.push(finished.Time);
            grabDate.push(finished.analyticsDate);
          } else if(finished.Name.toLowerCase() == "swimming") {
            grabSwimDistance.push(finished.Distance);
            grabSwimTime.push(finished.Time);
            grabSwimDate.push(finished.analyticsDate);
          }
        });

      }
