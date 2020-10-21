$(document).ready(function () {

var apiKey = "9eae867a080f9af2699befe3342e98ce"

var searchBtn = $('.searchBtn')

var cityBtn = $('.cityBtn')

for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + "<button class='cityBtn'>" + city + "</button>" + "</li>");
}

var keyCount = 0;

// Search button click event
searchBtn.click(function (event) {
    event.preventDefault();

    var searchBox = $(".searchBox").val();

    var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchBox + "&Appid=" + apiKey + "&units=imperial";

    var fivedayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchBox + "&Appid=" + apiKey + "&units=imperial";


    if (searchBox == "") {
        alert("please enter a city name");
    } else {
        $.ajax({
            url: currentUrl,
            method: "GET"
        }).then(function (response) {
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + "<button class='cityBtn'>" + response.name + "</button>" + "</li>");

            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount +1;

            // Current Weather 
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            currentCard.append(currentName);

            // Date 
            var timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            // Temp 
            var currentTemp = currentName.append("<p>");
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            // Humidity
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            // Wind Speed: 
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

            // UV Index URL
            var uvUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=9eae867a080f9af2699befe3342e98ce&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            // UV Index
            $.ajax({
                url: uvUrl,
                method: "GET"
            }).then(function (response) {
                var UV = response.value
                var currentUV = currentTemp.append("<p>" + "UV Index: " + UV + "</p>").addClass("card-text");
                currentTemp.append(currentUV);
                currentUV.find('p').last('p').addClass("uv-value");

                if (UV < 3){
                    $('.uv-value').css("background-color", "green");
                  }else if (UV >= 3 && UV < 6){
                    $('.uv-value').css("background-color", "yellow");
                  }else if (UV >=6 && UV < 8){
                    $('.uv-value').css("background-color", "orange").css("color", "white");
                  }else if (UV >=8 && UV <= 10){
                    $('.uv-value').css("background-color", "red").css("color", "white");
                  } else {$('.uv-value').css("background-color", "purple").css("color", "white");}
            });     
        });
    
        // call for 5-day forecast 
    $.ajax({
        url: fivedayUrl,
        method: "GET"
    }).then(function (response) {
        // Array for 5-days 
        var day = [0, 8, 16, 24, 32];
        var fiveDayList = $(".fiveDayList").addClass("card-body");
        var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
        fiveDayDiv.empty();
        // For each for 5 days
        day.forEach(function (i) {
            var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
            
            FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");
            fiveDayDiv.append("<div class='fiveDayCard pl-4 pr-2 pt-2 mb-2'>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");


        })

    });
    }

});

// Search history button click event
cityBtn.click(function (event) {
    event.preventDefault();

    var city = $(".cityBtn").val();

    var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&Appid=" + apiKey + "&units=imperial";

    var fivedayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&Appid=" + apiKey + "&units=imperial";

        $.ajax({
            url: currentUrl,
            method: "GET"
        }).then(function (response) {
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + "<button class='cityBtn'>" + response.name + "</button>" + "</li>");

            // Current Weather 
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            currentCard.append(currentName);

            // Date 
            var timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            // Temp 
            var currentTemp = currentName.append("<p>");
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            // Humidity
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            // Wind Speed: 
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

            // UV Index URL
            var uvUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=9eae867a080f9af2699befe3342e98ce&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            // UV Index
            $.ajax({
                url: uvUrl,
                method: "GET"
            }).then(function (response) {
                var UV = response.value
                var currentUV = currentTemp.append("<p>" + "UV Index: " + UV + "</p>").addClass("card-text");
                currentTemp.append(currentUV);
                currentUV.find('p').last('p').addClass("uv-value");

                if (UV < 3){
                    $('.uv-value').css("background-color", "green");
                  }else if (UV >= 3 && UV < 6){
                    $('.uv-value').css("background-color", "yellow");
                  }else if (UV >=6 && UV < 8){
                    $('.uv-value').css("background-color", "orange").css("color", "white");
                  }else if (UV >=8 && UV <= 10){
                    $('.uv-value').css("background-color", "red").css("color", "white");
                  } else {$('.uv-value').css("background-color", "purple").css("color", "white");}
            });     
        });
    
        // call for 5-day forecast 
    $.ajax({
        url: fivedayUrl,
        method: "GET"
    }).then(function (response) {
        // Array for 5-days 
        var day = [0, 8, 16, 24, 32];
        var fiveDayList = $(".fiveDayList").addClass("card-body");
        var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
        fiveDayDiv.empty();
        // For each for 5 days
        day.forEach(function (i) {
            var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
            
            FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");
            fiveDayDiv.append("<div class='fiveDayCard pl-4 pr-2 pt-2 mb-2'>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");


        })

    });
    }

);

// ----
})
