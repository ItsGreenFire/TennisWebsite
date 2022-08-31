let infoTable = document.getElementById("info-table");
let shown = true;
let date =  new Date();

currentDate = date.getFullYear()+"-"+padzero(date.getMonth()+1)+"-"+padzero(date.getDate());
currentTime = padzero(date.getHours())+":"+padzero(date.getMinutes());

document.getElementById('date-select').value = currentDate;
document.getElementById('time-select').value = currentTime;

let events = [];

function load_people() {
  var Http = new XMLHttpRequest();
  var url='https://jordan.lernerkids.com/tennis/db.php/list-people';

  //Send the proper header information along with the request
  Http.open("POST", url);
  Http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  Http.send();

  Http.onreadystatechange = function() {//Call a function when the state changes.
    if(Http.readyState === 4 && Http.status === 200) {
      var obj = JSON.parse(Http.responseText,true);
      console.log(obj);
      obj.people.forEach(p =>  {
        let people_select = document.getElementById("name-select");
        let option = document.createElement('option');
        option.value = p.first;
        option.innerHTML = p.first;
        people_select.add(option);
      });
    }
  }
}

load_people();

function padzero(n) {
  return ("0"+n).slice(-2)
}

function geteventinfo() {
  let name = document.getElementById("name-select");
  let time = document.getElementById("time-select");
  let date = document.getElementById("date-select");
  let duration = document.getElementById("minute-select");
  name = name.options[name.selectedIndex].text;
  time = time.value;
  date = date.value;
  duration = duration.value

  return {"eDate": date, "eTime": time, "eDuration": duration, "ePerson": name};
}

function addEvent(e) {
  events.push(e);
  console.log(events);

  add_to_table();
}

function add_to_table() {
  infoTable.innerHTML =
    "    <tr>" +
    "        <th>Date</th>" +
    "        <th>Time</th>" +
    "        <th>Dur</th>" +
    "        <th>Name</th>" +
    "    </tr>";

  events.forEach(e => {
    let row = infoTable.insertRow(1);
    let dCell = row.insertCell(0);
    let tCell = row.insertCell(1);
    let lCell = row.insertCell(2)
    let pCell = row.insertCell(3);
    dCell.innerHTML = e.eDate.substring(5);
    tCell.innerHTML = e.eTime;
    lCell.innerHTML = e.eDuration;
    pCell.innerHTML = e.ePerson;

  });
}

function size_table() {
  document.addEventListener("DOMContentLoaded", function () {
    let table = document.getElementById('info-div');
    let topArea = document.getElementById('topArea');
    let size = screen.height - topArea.offsetHeight;
    table.style.height = size.toString() + 'px';
    console.log(screen.height - topArea.offsetHeight, screen.height, topArea.offsetHeight);
  });
}

function hide() {
  let topArea = document.getElementById('topArea');
  let openClose = document.getElementById('open-close');

  const rotate = [{ transform: 'rotate(360deg)' }];

  const arrowTiming = {
    duration : 250,
    iterations: 4 };

  if (shown) {
    openClose.animate(rotate, arrowTiming);
    topArea.style.marginTop = "-1250px";
    openClose.innerHTML = 'arrow_circle_down';
  } else {
    openClose.animate(rotate, arrowTiming);
    topArea.style.marginTop = "0";
    openClose.innerHTML = 'arrow_circle_up';
  }
  shown = !shown;
  size_table();
}

function randomColor() {
  let themes = [
    {primary: '#60D394', secondary: '#AAF683', tertiary: '#FFD97D', quaternary: '#EE6055', quinternary: '#FF9B85'},
    {primary: '#6c584c', secondary: '#f0ead2', tertiary: '#f0ead2', quaternary: '#a98467', quinternary: '#dde5b6'},
    {primary: '#283618', secondary: '#fefae0', tertiary: '#dda15e', quaternary: '#bc6c25', quinternary: '#606c38'}
  ]

  let random_theme = themes[Math.floor(Math.random() * themes.length)];

  document.getElementById('topArea').style.backgroundColor = random_theme.primary;
  document.getElementById('save-button').style.backgroundColor = random_theme.secondary;
  document.getElementById('save-button').style.color = random_theme.quaternary;
  document.getElementById('name-select').style.backgroundColor = random_theme.primary;
  document.getElementById('name-select').style.color = random_theme.tertiary;
  document.getElementById('date-select').style.backgroundColor = random_theme.primary;
  document.getElementById('date-select').style.color = random_theme.tertiary;
  document.getElementById('time-select').style.backgroundColor = random_theme.primary;
  document.getElementById('time-select').style.color = random_theme.tertiary;
  document.getElementById('minute-select').style.backgroundColor = random_theme.primary;
  document.getElementById('minute-select').style.color = random_theme.tertiary;
  document.getElementById('hide').style.backgroundColor = random_theme.primary;
  document.getElementById('hide').style.borderTopColor = random_theme.primary;
  document.body.style.backgroundColor = random_theme.quinternary
}

randomColor()