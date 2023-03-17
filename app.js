const express = require('express');

const https = require('https');

const bodyParser = require('body-parser');

const app = express();

app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html");
    
});

app.use(bodyParser.urlencoded({extended:true}));

app.post("/",function(req,res){
   
    const query = req.body.cityName;
    const apikey = "9755b5e7eed41aa492b6747d21d8cfff";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on('data',function(data){
           const weatherdata = JSON.parse(data);
           console.log(weatherdata);
           const temp = weatherdata.main.temp;
           const weatherdesc = weatherdata.weather[0].description;
           const icon = weatherdata.weather[0].icon;
           const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
           res.write("<html><h2>Weather at "+ query +" is like " + weatherdesc + "</h2></html>");
           res.write("<img src = "+imageURL + ">");
           res.write("<h1>The temperature at "+ query+" is " + temp + " degree Celcius. </h1>");
           res.send();
        });
    })

});

app.listen(3000, function(){
    console.log("server running on 3000");
});


