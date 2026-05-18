import { initializeApp }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

getDatabase,
ref,
onValue

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {

apiKey: "AIzaSyAV8X3eva8BN7F1Dt-r_QStlwFxpLyQXN8",

authDomain: "weather-station-f59f0.firebaseapp.com",

databaseURL: "https://weather-station-f59f0-default-rtdb.asia-southeast1.firebasedatabase.app",

projectId: "weather-station-f59f0",

storageBucket: "weather-station-f59f0.firebasestorage.app",

messagingSenderId: "724168425572",

appId: "1:724168425572:web:ab416b6e50d6f4adba5f71"

};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const weatherRef = ref(db,"weather");

function updateOffline(){

const oldData =
JSON.parse(localStorage.getItem("lastWeather"));

const oldTime =
localStorage.getItem("lastTime");

document.querySelector(".status").innerHTML =
"SYSTEM OFFLINE";

document.querySelector(".status").style.background =
"red";

if(oldData){

document.getElementById("temp").innerHTML =
oldData.temperature + "°C";

document.getElementById("humidity").innerHTML =
oldData.humidity + "%";

document.getElementById("lastData").innerHTML =
"ESP NOT CONNECTED • LAST DATA FROM: " + oldTime;

}
else{

document.getElementById("temp").innerHTML =
"--";

document.getElementById("humidity").innerHTML =
"--";

document.getElementById("lastData").innerHTML =
"NO PREVIOUS DATA AVAILABLE";

}

}

onValue(weatherRef,(snapshot)=>{

const data = snapshot.val();

if(data){

localStorage.setItem(
"lastWeather",
JSON.stringify(data)
);

localStorage.setItem(
"lastTime",
new Date().toLocaleString()
);

document.querySelector(".status").innerHTML =
"SYSTEM ONLINE";

document.querySelector(".status").style.background =
"#00ff99";

document.getElementById("temp").innerHTML =
data.temperature + "°C";

document.getElementById("humidity").innerHTML =
data.humidity + "%";

if(data.humidity > 80){

document.getElementById("rain").innerHTML =
"RAIN EXPECTED";

document.body.style.background =
"linear-gradient(135deg,#111827,#1e3a5f,#000000)";

document.getElementById("aqi").innerHTML =
"FRESH";

}
else{

document.getElementById("rain").innerHTML =
"NO RAIN";

document.getElementById("aqi").innerHTML =
"GOOD";

}

document.getElementById("lastData").innerHTML =
"LIVE DATA RECEIVED";

}
else{

updateOffline();

}

});

window.speakWeather = function(){

const temp =
document.getElementById("temp").innerText;

const humidity =
document.getElementById("humidity").innerText;

const speech =
new SpeechSynthesisUtterance(

`Current temperature is ${temp} and humidity is ${humidity}`

);

window.speechSynthesis.speak(speech);

}

const ctx =
document.getElementById("weatherChart");

new Chart(ctx,{

type:'line',

data:{

labels:[
'1AM',
'4AM',
'7AM',
'10AM',
'1PM',
'4PM',
'7PM'
],

datasets:[

{

label:'Temperature',

data:[25,26,28,30,31,29,27],

borderColor:'black',

backgroundColor:'transparent',

borderWidth:4,

tension:0.4

},

{

label:'Humidity',

data:[60,63,65,70,72,68,64],

borderColor:'blue',

backgroundColor:'transparent',

borderWidth:4,

tension:0.4

}

]

},

options:{
responsive:true
}

});