const hr = document.querySelector("#hr");
const mn = document.querySelector("#mn");
const sc = document.querySelector("#sc");

// set audio for alarm and audio will play in loop
const audio = new Audio('assets/Alarm-audio.mp3');
audio.loop = true;


let alarmTime = null;
let alarmTimeout = null;

//myList contains the alarms added by the user
const myList = document.querySelector('#myList');
const addAlarm = document.querySelector('.setAlarm')


const alarmList = [];  // Stores all the alarms being set 


// Plays the alarm audio at correct time
function ringing(now){
    audio.play();
    alert(`Hey! it is ${now}`);
    document.querySelector("#ampm").innerHTML = ampm;
}


//function to check if it is the right time to ring the alarm
setInterval(()=>{
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * 6;
    let ss = day.getSeconds() * 6;

    hr.style.transform = `rotateZ(${hh+(mm/12)}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;

    let hour = document.querySelector("#hour");
    let minutes = document.querySelector("#minutes");
    let seconds = document.querySelector("#seconds");
    let ampm = document.querySelector("#ampm");

    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s  = new Date().getSeconds();
    let am = "AM";

    // After 12 it changes to PM
    if(h > 12){
        h = h - 12;
        am = "PM";
    }


    //add zero before single digit Numbers
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    hour.innerHTML = h+":";
    minutes.innerHTML = m+":";
    seconds.innerHTML = s+":";
    ampm.innerHTML = am;


    let now = `${h}:${m}:${s}${am}`;

    if(alarmList.includes(now) ){
        ringing(now);
    } 

})


// function to clear/stop the currently playing alarm
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}      


// removes an alarm from the unordered list and the webpage when "Delete Alarm" is clicked
myList.addEventListener('click', e=> {
    console.log("removing element")
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }    
})


// removes an alarm from the array when "Delete Alarm" is clicked
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;                  // Clear contents
    alarmList.push.apply(alarmList, newList);
    
    console.log("newList", newList);
    console.log("alarmList", alarmList);
}


// Adds newAlarm to the unordered list as a new list item on webpage
function showNewAlarm(newAlarm){
    const html =`<li class = "time-list">        
        <span class="time">${newAlarm.slice(0, -2)} ${newAlarm.slice(-2)}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete</button>       
    </li>`
    myList.innerHTML += html
};

// set the correct format of time
// converts "1:2:3" to "01:02:03"
function formatTime(time) {
    if ( time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}

// event to set a new alarm whenever the form is submitted 
addAlarm.addEventListener('submit', e=> {
    
    e.preventDefault();
    let new_h=formatTime(addAlarm.a_hour.value);
    if(new_h === '0'){
        new_h = '00'
    }
    let new_m=formatTime(addAlarm.a_min.value);
    if(new_m === '0'){
        new_m = '00'
    }
    let new_s=formatTime(addAlarm.a_sec.value);
    if(new_s === '0'){
        new_s = '00'
    }

    const ampm = addAlarm.a_ampm.value; // Get the selected AM/PM value
    
    const newAlarm = `${new_h}:${new_m}:${new_s}${ampm}`

//     add newAlarm to alarmList
    if(isNaN(newAlarm)){
        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else{
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else{
        alert("Invalid Time Entered")
    }        
})
