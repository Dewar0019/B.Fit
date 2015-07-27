Template.weightProgress.rendered = function () {
  initializeWeightData();
  Session.set('Time', timeData);
  Session.set('Weight', weightData);
  var chart = c3.generate({
    bindto: this.find('#weightChart'),
      data: {
        xs: {
          'Weight': 'Time',
        },
        columns: [['Time'],['Weight'],]
      },
      axis: {
              x: { label: { text: 'Date', position: 'outer-middle'}, type: 'timeseries', tick: { format: '%m-%d'} },
              y: { label: { text: "Weight", position: 'outer-middle'} },
            },
  });

  this.autorun(function (tracker) {
    chart.load({columns: [
      Session.get('Time'),
      Session.get('Weight'),
      []
    ]});
  });
}


var timeData = ['Time'];
var weightData = ['Weight'];

function initializeWeightData(){
  var allWeight = UserWeight.find().fetch(); 
  allWeight.forEach(function(weightTime) {
         timeData.push(weightTime.dateAdded);
         weightData.push(weightTime.weight);
        });
      }
 