$("#search-button").on("click", getCity);

function getCity(){
    let citySearch = $("#city-search").val();
    let currentQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&APPID=bc0e6a9a6e2ed4c45d519d424670be13";
    let fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + ",us&mode=json&APPID=bc0e6a9a6e2ed4c45d519d424670be13";

    $.ajax({
        url: currentQueryURL,
        method: "GET"
    }).then(function(response){
        currentConditions(response);
        setDates();
        handleRecents(response);
    });

    $.ajax({
        url: fiveDayQueryURL,
        method: "GET"
    }).then(function(response){
        fiveDayForecast(response);
    });
};

let recentsArray = [];
function handleRecents(res){
    let recentLink = $("<a>").addClass("list-group-item");
    recentLink.attr("href", "#");

    if (recentsArray.includes(res.name) == false){
        recentsArray.push(res.name);
        recentLink.text(res.name);
        $("#recent-searches").prepend(recentLink);
    }

    recentLink.on("click", function(){
        let recentCity = $(this).text();
        let currentQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + recentCity + "&APPID=bc0e6a9a6e2ed4c45d519d424670be13";
        let fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + recentCity + ",us&mode=json&APPID=bc0e6a9a6e2ed4c45d519d424670be13";
        
        $.ajax({
            url: currentQueryURL,
            method: "GET"
        }).then(function(response){
            currentConditions(response);
            setDates();
        });

        $.ajax({
            url: fiveDayQueryURL,
            method: "GET"
        }).then(function(response){
            fiveDayForecast(response);
        });
    });
}

function currentConditions(res){
    console.log(res);
    let cityName = res.name;
    let currentTemp = (res.main.temp-273.15) * 1.8 + 32;
    let currentHumidity = res.main.humidity;
    let currentWindSpeed = res.wind.speed * 2.237;

    $("#city-name").text(cityName);
    $("#current-weather").attr("src", "http://openweathermap.org/img/wn/" + res.weather[0].icon + "@2x.png");
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

    let dayOneHumidity = 0;
    let dayTwoHumidity = 0;
    let dayThreeHumidity = 0;
    let dayFourHumidity = 0;
    let dayFiveHumidity = 0;

    // Getting high and low temperatures of day one
    for (i = 0; i < 8; i++){
        dayOneHumidity += weatherIntervals[i].main.humidity;
        if (dayOneLow > weatherIntervals[i].main.temp_min || dayOneLow == null){
            dayOneLow = weatherIntervals[i].main.temp_min;
        }
        if (dayOneHigh < weatherIntervals[i].main.temp_max || dayOneHigh == null){
            dayOneHigh = weatherIntervals[i].main.temp_max;
        }
    }

    dayOneHumidity = dayOneHumidity / 8;
    dayOneLow = ((dayOneLow - 273.15) * 1.8) + 32;
    dayOneHigh = ((dayOneHigh - 273.15) * 1.8) + 32;
    // $("#day-one-date").text(weatherIntervals[4].dt_txt);
    $("#day-one-high").text(dayOneHigh.toFixed() + "°");
    $("#day-one-low").text(dayOneLow.toFixed() + "°");
    $("#day-one-humidity").text(dayOneHumidity.toFixed() + "%");
    $("#day-one-weather").attr("src", "http://openweathermap.org/img/wn/" + weatherIntervals[4].weather[0].icon + "@2x.png");

    // Getting high and low temperatures of day two
    for (i = 8; i < 16; i++){
        dayTwoHumidity += weatherIntervals[i].main.humidity;
        if (dayTwoLow > weatherIntervals[i].main.temp_min || dayTwoLow == null){
            dayTwoLow = weatherIntervals[i].main.temp_min;
        }
        if (dayTwoHigh < weatherIntervals[i].main.temp_max || dayTwoHigh == null){
            dayTwoHigh = weatherIntervals[i].main.temp_max;
        }
    }
    
    dayTwoHumidity = dayTwoHumidity / 8;
    dayTwoLow = ((dayTwoLow - 273.15) * 1.8) + 32;
    dayTwoHigh = ((dayTwoHigh - 273.15) * 1.8) + 32;
    // $("#day-two-date").text(weatherIntervals[12].dt_txt);
    $("#day-two-high").text(dayTwoHigh.toFixed() + "°");
    $("#day-two-low").text(dayTwoLow.toFixed() + "°");
    $("#day-two-humidity").text(dayTwoHumidity.toFixed() + "%");
    $("#day-two-weather").attr("src", "http://openweathermap.org/img/wn/" + weatherIntervals[12].weather[0].icon + "@2x.png");

    // Getting high and low temperatures of day three
    for (i = 16; i < 24; i++){
        dayThreeHumidity += weatherIntervals[i].main.humidity;
        if (dayThreeLow > weatherIntervals[i].main.temp_min || dayThreeLow == null){
            dayThreeLow = weatherIntervals[i].main.temp_min;
        }
        if (dayThreeHigh < weatherIntervals[i].main.temp_max || dayThreeHigh == null){
            dayThreeHigh = weatherIntervals[i].main.temp_max;
        }
    }

    dayThreeHumidity = dayThreeHumidity / 8;
    dayThreeLow = ((dayThreeLow - 273.15) * 1.8) + 32;
    dayThreeHigh = ((dayThreeHigh - 273.15) * 1.8) + 32;
    // $("#day-three-date").text(weatherIntervals[20].dt_txt);
    $("#day-three-high").text(dayThreeHigh.toFixed() + "°");
    $("#day-three-low").text(dayThreeLow.toFixed() + "°");
    $("#day-three-humidity").text(dayThreeHumidity.toFixed() + "%");
    $("#day-three-weather").attr("src", "http://openweathermap.org/img/wn/" + weatherIntervals[20].weather[0].icon + "@2x.png");

    // Getting high and low temperatures of day four
    for (i = 24; i < 32; i++){
        dayFourHumidity += weatherIntervals[i].main.humidity;
        if (dayFourLow > weatherIntervals[i].main.temp_min || dayFourLow == null){
            dayFourLow = weatherIntervals[i].main.temp_min;
        }
        if (dayFourHigh < weatherIntervals[i].main.temp_max || dayFourHigh == null){
            dayFourHigh = weatherIntervals[i].main.temp_max;
        }
    }

    dayFourHumidity = dayFourHumidity / 8;
    dayFourLow = ((dayFourLow - 273.15) * 1.8) + 32;
    dayFourHigh = ((dayFourHigh - 273.15) * 1.8) + 32;
    // $("#day-four-date").text(weatherIntervals[28].dt_txt);
    $("#day-four-high").text(dayFourHigh.toFixed() + "°");
    $("#day-four-low").text(dayFourLow.toFixed() + "°");
    $("#day-four-humidity").text(dayFourHumidity.toFixed() + "%");
    $("#day-four-weather").attr("src", "http://openweathermap.org/img/wn/" + weatherIntervals[28].weather[0].icon + "@2x.png");

    // Getting high and low temperatures of day five
    for (i = 32; i < 40; i++){
        dayFiveHumidity += weatherIntervals[i].main.humidity;
        if (dayFiveLow > weatherIntervals[i].main.temp_min || dayFiveLow == null){
            dayFiveLow = weatherIntervals[i].main.temp_min;
        }
        if (dayFiveHigh < weatherIntervals[i].main.temp_max || dayFiveHigh == null){
            dayFiveHigh = weatherIntervals[i].main.temp_max;
        }
    }

    dayFiveHumidity = dayFiveHumidity / 8;
    dayFiveLow = ((dayFiveLow - 273.15) * 1.8) + 32;
    dayFiveHigh = ((dayFiveHigh - 273.15) * 1.8) + 32;
    // $("#day-five-date").text(weatherIntervals[36].dt_txt);
    $("#day-five-high").text(dayFiveHigh.toFixed() + "°");
    $("#day-five-low").text(dayFiveLow.toFixed() + "°");
    $("#day-five-humidity").text(dayFiveHumidity.toFixed() + "%");
    $("#day-five-weather").attr("src", "http://openweathermap.org/img/wn/" + weatherIntervals[36].weather[0].icon + "@2x.png");
}

function setDates(){
    // Setting up current date
    let date = new Date();
    let currentDay = date.getDate();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();
    let currentDate = + currentMonth + "-" + currentDay + "-" + currentYear;
    $("#current-date").text(currentDate);

    // Declaring variables for each forecast date
    let fcOne = new Date();
    let fcTwo = new Date();
    let fcThree = new Date();
    let fcFour = new Date();
    let fcFive = new Date();

    // Setting each forecast date variable one day beyond the previous
    fcOne.setDate(fcOne.getDate(currentDate) + 1);
    fcTwo.setDate(fcTwo.getDate(currentDate) + 2);
    fcThree.setDate(fcThree.getDate(currentDate) + 3);
    fcFour.setDate(fcFour.getDate(currentDate) + 4);
    fcFive.setDate(fcFive.getDate(currentDate) + 5);

    // Setting the month for each forecast date variable
    let fcOneMonth = fcOne.getMonth() + 1;
    let fcTwoMonth = fcTwo.getMonth() + 1;
    let fcThreeMonth = fcThree.getMonth() + 1;
    let fcFourMonth = fcFour.getMonth() + 1;
    let fcFiveMonth = fcFive.getMonth() + 1;

    // Setting the day for each forecast date variable
    let fcOneDay = fcOne.getDate();
    let fcTwoDay = fcTwo.getDate();
    let fcThreeDay = fcThree.getDate();
    let fcFourDay = fcFour.getDate();
    let fcFiveDay = fcFive.getDate();

    // Setting the year for each forecast date variable
    let fcOneYear = fcOne.getFullYear();
    let fcTwoYear = fcTwo.getFullYear();
    let fcThreeYear = fcThree.getFullYear();
    let fcFourYear = fcFour.getFullYear();
    let fcFiveYear = fcFive.getFullYear();

    // Declaring variables to hold a formatted strings of each forecast date
    let fcOneDate = + fcOneMonth + "-" + fcOneDay + "-" + fcOneYear;
    let fcTwoDate = + fcTwoMonth + "-" + fcTwoDay + "-" + fcTwoYear;
    let fcThreeDate = + fcThreeMonth + "-" + fcThreeDay + "-" + fcThreeYear;
    let fcFourDate = + fcFourMonth + "-" + fcFourDay + "-" + fcFourYear;
    let fcFiveDate = + fcFiveMonth + "-" + fcFiveDay + "-" + fcFiveYear;

    // Appending forecast dates to page
    $("#day-one-date").text(fcOneDate);
    $("#day-two-date").text(fcTwoDate);
    $("#day-three-date").text(fcThreeDate);
    $("#day-four-date").text(fcFourDate);
    $("#day-five-date").text(fcFiveDate);
};