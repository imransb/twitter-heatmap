$(document).ready(function(){
	//datesData["2014-09-07T23:00:00.000Z"]
	var count = 0;
	var currentDate = new Date(2014,8,2);
	 var testData = {
          max: 8,
          data: datesData[currentDate.toISOString()] //"2014-09-01T23:00:00.000Z"
        };

        var baseLayer = L.tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 18
          }
        );

        var cfg = {
          // radius should be small ONLY if scaleRadius is true (or small radius is intended)
          "radius": 2,
          "maxOpacity": .8, 
          // scales the radius based on map zoom
          "scaleRadius": true, 
          // if set to false the heatmap uses the global maximum for colorization
          // if activated: uses the data maximum within the current map boundaries 
          //   (there will always be a red spot with useLocalExtremas true)
          "useLocalExtrema": true,
          // which field name in your data represents the latitude - default "lat"
          latField: 'lat',
          // which field name in your data represents the longitude - default "lng"
          lngField: 'long',
          // which field name in your data represents the data value - default "value"
          valueField: 'count'
        };


        var heatmapLayer = new HeatmapOverlay(cfg);

        var map = new L.Map('map', {
          center: new L.LatLng(12, 3),
          zoom: 4,
          layers: [baseLayer, heatmapLayer]
        });

        heatmapLayer.setData(testData);

        var interval = setInterval(function(){
        	run();
        }, 1000);

        function run(){
        	if(count < 29)
        	{
        	currentDate = new Date(2014, 8, currentDate.getDate()+1);
        	testData["data"] = datesData[currentDate.toISOString()];       	
        	heatmapLayer.setData(testData);
        	$(".date").text(currentDate.toISOString());
        	count++;
        	}
        	else {
        		currentDate = new Date(2014,8,2);
        		testData["data"] = datesData[currentDate.toISOString()];       	
        		heatmapLayer.setData(testData);
        		 $(".date").text(currentDate.toISOString());

        		count = 0;
        	}
        }



        // make accessible for debugging
        layer = heatmapLayer;



});