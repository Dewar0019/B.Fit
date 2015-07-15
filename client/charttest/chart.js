$(document).ready(function(){
			$("#cardio,#strength,#flexibility").change(function(){
				var c1 = $("#cardio").find('option:selected').val();
				// var c2 = $("#strength").find('option:selected').val();
				// var c3 = $("#flexibility").find('option:selected').val();
				chart.hide(null,{
					withLegend: true
				});
				chart.show([c1],{ //,c2,c3
					withLegend: true
				});
			});
			$('#A').on('click',function(){
			chart.load({
				columns:[
					['Running Time', 60, 40, 120, 50, 100, 120],
				],
				unload: ['Running'],
			});
			});
			$('#B').on('click',function(){
				chart.load({
					columns:[
						['Running', 5, 10, 2, 4, 5, 8],
					],
						unload: ['Running Time'],
				});
			});
			});

		var chart = c3.generate({
			bindto: '#chart',
			data:{
				x: 'x',
				columns: [
					['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
					['Running', 5, 10, 2, 4, 5, 8],
					['Walking', 3, 6, 2, 4, 5, 8],
					['Swimming', 1, 2, 1, 3, 5, 2],
					['Cycling', 10, 8, 9, 12, 4, 5]
				],
				types: {
					Running: 'area-spline',
					Walking: 'area-spline',
					Swimming: 'area-spline',
					Cycling: 'area-spline'
				},
				hide: true
			},
			subchart: {
		 		show: true
		 	},
		 	zoom: {
		 		enabled: true
		 	},
		 	axis: {
        		x: {
            		type: 'timeseries',
            		tick: {
                		format: '%Y-%m-%d'
            		}
        		}
        	},
			legend: {
				show: false
			}
		});