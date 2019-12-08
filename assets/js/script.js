$("#search-button").on("click", function(){

    let citySearch = $("#city-search").val();
    let currentQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&APPID=bc0e6a9a6e2ed4c45d519d424670be13";
    let fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + ",us&mode=json&APPID=bc0e6a9a6e2ed4c45d519d424670be13";

    $.ajax({
        url: currentQueryURL,
        method: "GET"
    }).then(function(response){
        currentConditions(response);
    });

    $.ajax({
        url: fiveDayQueryURL,
        method: "GET"
    }).then(function(response){
        fiveDayForecast(response);
    });
});

function currentConditions(res){
    console.log(res);
    let cityName = res.name;
    let currentTemp = (res.main.temp-273.15) * 1.8 + 32;
    let currentHumidity = res.main.humidity;
    let currentWindSpeed = res.wind.speed * 2.237;
    $("#city-name").text(cityName);
    $("#current-temperature").text(currentTemp.toFixed() + "°");
    $("#current-humidity").text(currentHumidity + "%");
    $("#current-wind-speed").text(currentWindSpeed.toFixed(1) + " mph");
}

function fiveDayForecast(res){
    console.log(res);
    let weatherIntervals = res.list;

    let dayOneLow = null;
    let dayOneHigh = null;
    let dayTwoLow = null;
    let dayTwoHigh = null;
    let dayThreeLow = null;
    let dayThreeHigh = null;
    let dayFourLow = null;
    let dayFourHigh = null;
    let dayFiveLow = null;
    let dayFiveHigh = null;

    // Getting high and low temperatures of day one
    for (i = 0; i < 8; i++){
        if (dayOneLow > weatherIntervals[i].main.temp_min || dayOneLow == null){
            dayOneLow = weatherIntervals[i].main.temp_min;
        }
        if (dayOneHigh < weatherIntervals[i].main.temp_max || dayOneHigh == null){
            dayOneHigh = weatherIntervals[i].main.temp_max;
        }
    }
    dayOneLow = ((dayOneLow - 273.15) * 1.8) + 32;
    dayOneHigh = ((dayOneHigh - 273.15) * 1.8) + 32;
    $("#day-one-high").text(dayOneHigh.toFixed() + "°");
    $("#day-one-low").text(dayOneLow.toFixed() + "°");

    // Getting high and low temperatures of day two
    for (i = 8; i < 16; i++){
        if (dayTwoLow > weatherIntervals[i].main.temp_min || dayTwoLow == null){
            dayTwoLow = weatherIntervals[i].main.temp_min;
        }
        if (dayTwoHigh < weatherIntervals[i].main.temp_max || dayTwoHigh == null){
            dayTwoHigh = weatherIntervals[i].main.temp_max;
        }
    }
    dayTwoLow = ((dayTwoLow - 273.15) * 1.8) + 32;
    dayTwoHigh = ((dayTwoHigh - 273.15) * 1.8) + 32;
    $("#day-two-high").text(dayTwoHigh.toFixed() + "°");
    $("#day-two-low").text(dayTwoLow.toFixed() + "°");

    // Getting high and low temperatures of day three
    for (i = 16; i < 24; i++){
        if (dayThreeLow > weatherIntervals[i].main.temp_min || dayThreeLow == null){
            dayThreeLow = weatherIntervals[i].main.temp_min;
        }
        if (dayThreeHigh < weatherIntervals[i].main.temp_max || dayThreeHigh == null){
            dayThreeHigh = weatherIntervals[i].main.temp_max;
        }
    }
    dayThreeLow = ((dayThreeLow - 273.15) * 1.8) + 32;
    dayThreeHigh = ((dayThreeHigh - 273.15) * 1.8) + 32;
    $("#day-three-high").text(dayThreeHigh.toFixed() + "°");
    $("#day-three-low").text(dayThreeLow.toFixed() + "°");

    // Getting high and low temperatures of day four
    for (i = 24; i < 32; i++){
        if (dayFourLow > weatherIntervals[i].main.temp_min || dayFourLow == null){
            dayFourLow = weatherIntervals[i].main.temp_min;
        }
        if (dayFourHigh < weatherIntervals[i].main.temp_max || dayFourHigh == null){
            dayFourHigh = weatherIntervals[i].main.temp_max;
        }
    }
    dayFourLow = ((dayFourLow - 273.15) * 1.8) + 32;
    dayFourHigh = ((dayFourHigh - 273.15) * 1.8) + 32;
    $("#day-four-high").text(dayFourHigh.toFixed() + "°");
    $("#day-four-low").text(dayFourLow.toFixed() + "°");

    // Getting high and low temperatures of day five
    for (i = 32; i < 40; i++){
        if (dayFiveLow > weatherIntervals[i].main.temp_min || dayFiveLow == null){
            dayFiveLow = weatherIntervals[i].main.temp_min;
        }
        if (dayFiveHigh < weatherIntervals[i].main.temp_max || dayFiveHigh == null){
            dayFiveHigh = weatherIntervals[i].main.temp_max;
        }
    }
    dayFiveLow = ((dayFiveLow - 273.15) * 1.8) + 32;
    dayFiveHigh = ((dayFiveHigh - 273.15) * 1.8) + 32;
    $("#day-five-high").text(dayFiveHigh.toFixed() + "°");
    $("#day-five-low").text(dayFiveLow.toFixed() + "°");
}