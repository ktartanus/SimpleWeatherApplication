"use strict";

function WeatherApp()
{
    var weatherWidget = new WeatherWidget($("#weather-widget"), "a283a864fe26fd6b"),
        version = "8.3";
        
    function getLocation()
    {
        if (navigator.geolocation)
        {
            // Use geolocation to get current position
            navigator.geolocation.getCurrentPosition(function(position)
            {
                $("#latitude").val(position.coords.latitude);
                $("#longitude").val(position.coords.longitude);
            },
            function(error)
            {
                $("#controls .error")
                    .text("ERROR: " + error.message)
                    .slideDown();
            });
        }
    }
    function changedLocation()
    {
	if(navigator.geolocation)
	{
		navigator.geolocation.watchPosition(function(position)
            {
		var latitude = position.coords.latitude;
		var longtitude = position.coords.longitude;              
		$("#latitude").val(latitude);
                $("#longitude").val(longtitude);
		$("#mapImage").attr("src", mapImageReader(latitude,longtitude));
            },
            function(error)
            {
                $("#controls .error")
                    .text("ERROR: " + error.message)
                    .slideDown();
            });
	}
    }

    function mapImageReader(posX, posY, zoom, size)
    {
	var zoom = zoom || 15;
	var size = size || "600x300";
	if (posX && posY)
	{
	    var src = "https://maps.googleapis.com/maps/api/staticmap?center=" + posX + "," + posY + "&markers=color:blue%7Clabel:I%7C" + posX + "," + posY + "&zoom=" + zoom + "&size=" + size + "&maptype=roadmap&key=AIzaSyDEuWqwGsiNTtiDyG87lHN5jE5OdMKwhKk";
	    return src;	
	}
    }

    function getCurrentWeather()
    {
        var lat = $("#latitude").val();
        var lon = $("#longitude").val();
        if (lat && lon)
        {
            $("#weather-widget").fadeIn();
            weatherWidget.update(lat, lon);
        }
    }
    
    this.start = function()
    {
        $("#app>header").append(version);
        $("#getWeather").click(getCurrentWeather);
        getLocation();
	changedLocation();
    }
}

$(function()
{
    window.app = new WeatherApp();
    window.app.start();
});
