
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
      var c1 = $("#cardio").find('option:selected').val();
      grabInfo();
      chart.hide(null,{ withLegend: true });
      chart.show([c1],{ withLegend: true });

    });

    $('#A').on('click',function(){
      Session.set("yaxis", "Time");
      chart.load({ columns:[ grabTime, ], unload: ['Running'], });
      chart.axis.labels({y: "Time"});

    });


    $('#B').on('click',function(){
      chart.load({ columns:[ grabDistance, ], unload: ['Running Time'],});
      chart.axis.labels({y: "Distance"});

    });

  });
}


var grabDistance = ['Running'];
var grabTime = ['Running Time'];
var grabDate = ['date'];
      
      function grabInfo() {
        var allCardio = Cardio.find().fetch();
        allCardio.forEach(function(finished) {
            grabDistance.push(finished.Distance);
            grabTime.push(finished.Time);
            grabDate.push(finished.analyticsDate);
        });
      }
