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

databaseURL:
"https://weather-station-f59f0-default-rtdb.asia-southeast1.firebasedatabase.app",

projectId: "weather-station-f59f0",

storageBucket:
"weather-station-f59f0.firebasestorage.app",

messagingSenderId: "724168425572",

appId:
"1:724168425572:web:ab416b6e50d6f4adba5f71"

};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const weatherRef = ref(db,"weather");

function setOfflineMode(){

document.querySelector(".status").innerHTML =
"SYSTEM OFFLINE";

document.querySelector(".status").style.background =
"#ef4444";

const lastData =
JSON.parse(localStorage.getItem("lastWeather"));

const lastTime =
localStorage.getItem("lastTime");

if(lastData){

document.getElementById("temp").innerHTML =
lastData.temperature + "°C";

document.getElementById("humidity").innerHTML =
lastData.humidity + "%";

document.getElementById("rain").innerHTML =
lastData.rain || "--";

document.getElementById("aqi").innerHTML =
lastData.aqi || "--";

document.getElementById("lastData").innerHTML =

"ESP NOT CONNECTED • LAST RECORDED DATA FROM: "
+ lastTime;

}
else{

document.getElementById("temp").innerHTML = "--";

document.getElementById("humidity").innerHTML = "--";

document.getElementById("rain").innerHTML = "--";

document.getElementById("aqi").innerHTML = "--";

document.getElementById("lastData").innerHTML =

"NO LAST RECORDED VALUES AVAILABLE";

}

}

onValue(weatherRef,(snapshot)=>{

const data = snapshot.val();

if(

data &&
data.temperature !== undefined &&
data.humidity !== undefined

){

document.querySelector(".status").innerHTML =
"SYSTEM ONLINE";

document.querySelector(".status").style.background =
"#22c55e";

document.getElementById("temp").innerHTML =
data.temperature + "°C";

document.getElementById("humidity").innerHTML =
data.humidity + "%";

if(data.humidity > 80){

document.getElementById("rain").innerHTML =
"RAIN EXPECTED";

document.body.style.background =

"linear-gradient(135deg,#0f172a,#1e293b,#111827)";

}
else{

document.getElementById("rain").innerHTML =
"NO RAIN";

document.body.style.background =

"linear-gradient(135deg,#020617,#0f172a,#1e3a8a)";

}

if(data.temperature > 35){

document.getElementById("aqi").innerHTML =
"MODERATE";

}
else{

document.getElementById("aqi").innerHTML =
"GOOD";

}

document.getElementById("lastData").innerHTML =
"LIVE SENSOR DATA RECEIVED";

localStorage.setItem(

"lastWeather",

JSON.stringify({

temperature:data.temperature,

humidity:data.humidity,

rain:
document.getElementById("rain").innerHTML,

aqi:
document.getElementById("aqi").innerHTML

})

);

localStorage.setItem(

"lastTime",

new Date().toLocaleString()

);

}
else{

setOfflineMode();

}

});

window.speakWeather = function(){

const temp =
document.getElementById("temp").innerText;

const humidity =
document.getElementById("humidity").innerText;

const speech =
new SpeechSynthesisUtterance(

`Current temperature is ${temp}
and humidity is ${humidity}`

);

speech.rate = 1;

window.speechSynthesis.speak(speech);

};

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

borderColor:'#000000',

backgroundColor:'transparent',

borderWidth:4,

tension:0.4

},

{

label:'Humidity',

data:[60,63,65,70,72,68,64],

borderColor:'#2563eb',

backgroundColor:'transparent',

borderWidth:4,

tension:0.4

}

]

},

options:{

responsive:true,

plugins:{

legend:{

labels:{

color:'white'

}

}

},

scales:{

x:{

ticks:{

color:'white'

}

},

y:{

ticks:{

color:'white'

}

}

}

}

});