/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
         
        otherdarksky();
        requestFileSystem()
        startWatch(); 
       
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};






// ----------- ACCELEROMETER



// NOTE THAT THIS IS THE SAME ON ERROR CALLBACK FUNCTION
// THAT WE'RE USING FOR ALL OTHER FUNCTIONS
function onError(message){
    console.log(message);
}

var options = {
    frequency: 3000
};

var watchID = null;

function startWatch(){
    watchID = navigator.accelerometer.watchAcceleration(accCallback, onError, options);    
}



// ----------- GEOLOCATION

function getLocation(){
    navigator.geolocation.getCurrentPosition(geoCallback, onError); 
}

function geoCallback (position) {
    console.log(position);
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    // RIGHT AFTER WE'VE GOT THE READING FROM THE GPS SENSOR
    // WE'RE CALLING THE OPENCAGE API WITH THE DATA COLLATED
    
    otherdarksky(lat,lng);
    tryingFile(lat,lng);
   // opencageapi(lat, lng);
    
    
    var loc = 'Latitude: '          + position.coords.latitude          + '<br>' +
          'Longitude: '         + position.coords.longitude         + '<br>' +
          'Altitude: '          + position.coords.altitude          + '<br>' +
          'Accuracy: '          + position.coords.accuracy          + '<br>' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br>' +
          'Heading: '           + position.coords.heading           + '<br>' +
          'Speed: '             + position.coords.speed             + '<br>' +
          'Timestamp: '         + position.timestamp                + '<br>';
    
     document.getElementById('location').innerHTML = loc;
    initMap2(lat,lng);

};







// ----------- SAVING FILES (READING AND WRITING)





// ----------- OPENCAGE API


//825cb689a7f3bfb0ac94cb5ced35f517
//https://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=825cb689a7f3bfb0ac94cb5ced35f517
//https://openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=acfbd59865c37db76dd9f344461fd157
//&APPID=825cb689a7f3bfb0ac94cb5ced35f517
//shttps://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=acfbd59865c37db76dd9f344461fd157
//shttps://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=acfbd59865c37db76dd9f344461fd157
/*
function darksky(lat,lng){
    console.log("testing")
    var http = new XMLHttpRequest();
   const darksky = 'https://api.darksky.net/forecast/b3219b6fa61c05e3d17a4834523b2f54/' + lat +' , '+ lng +';
   // const darksky = 'https://api.darksky.net/forecast/b3219b6fa61c05e3d17a4834523b2f54/53.222,6.000';
   // http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
    http.open("GET",darksky);
    http.send();
    
        http.onreadystatechange = (e) => {
        var response = http.responseText
        var responseJSON = JSON.parse(response);    
        console.log(responseJSON);
            
            var weather = responseJSON.currently.icon;
            console.log(weather);
            
            document.getElementById('weather').innerHTML=responseJSON.currently.temperature;
    
        }
}*/
function otherdarksky(){
    console.log("testing")
   
      writeFile(weather2);
    var http = new XMLHttpRequest();
 //var lat = 53.222;
   const darksky = 'https://api.darksky.net/forecast/b3219b6fa61c05e3d17a4834523b2f54/53.222,6.000';
   // http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
    http.open("GET",darksky);
    http.send();
    
        http.onreadystatechange = (e) => {
        var response = http.responseText
        var responseJSON = JSON.parse(response);    
        console.log(responseJSON);
            
            var weather = responseJSON.currently.icon;
             var weather2 = responseJSON.currently.icon;
            console.log(weather);
             //document.getElementById('weatherTest').innerHTML=responseJSON.currently.icon;
            document.getElementById('weatherTest').innerHTML=responseJSON.currently.temperature;
            
    
        }
        
}
function tryingFile(weather2){

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs){
        
        // Displaying result in the console
        console.log('file system open: ' + fs.name);

        // Displaying in front end
        var toFronEnd = 'file system open: ' + fs.name;
        document.getElementById('file').innerHTML = toFronEnd;

        // Name of the file I want to create
        var fileToCreate = "newPersistentFile.txt";
         

        // Opening/creating the file
        fs.root.getFile(fileToCreate, { create: true, exclusive: false }, function (fileEntry){
            
            // Display in the console
            console.log("fileEntry is file?" + fileEntry.isFile.toString());

            // Displaying in front end
            var toFrontEnd = document.getElementById('file').innerHTML;
            toFrontEnd += "fileEntry is file?" + fileEntry.isFile.toString();
            document.getElementById('file').innerHTML = toFrontEnd;
            
            // Now decide what to do
            // Write to the file
            writeFile(fileEntry, null);

            // Or read the file
            readFile(fileEntry);

        }, onError);

    }, onError);
   
}

// Let's write some files
function writeFile(fileEntry, dataObj,weather2) {
   
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file wriWHATte..yep.THE WEATHER : TEMP ");
            console.log("THIS " + weather2); 
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['Lets write some text here is a bunch of text from blob'], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);
    });
}

// Let's read some files
function readFile(fileEntry) {

    // Get the file from the file entry
    fileEntry.file(function (file) {
        
        // Create the reader
        var reader = new FileReader();

        reader.onloadend = function() {

            console.log("Successful file read: is workin' just fine " + this.result);
            console.log("file path 111: " + fileEntry.fullPath);
            

        };

        reader.readAsText(file);

    }, onError);
}