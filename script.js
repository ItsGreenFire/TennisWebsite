let infoTable = document.getElementById("info-table");
let shown = true;

let date =  new Date();

currentDate = date.getFullYear()+"-"+padzero(date.getMonth()+1)+"-"+padzero(date.getDate());
currentTime = padzero(date.getHours())+":"+padzero(date.getMinutes());

document.getElementById('date-select').value = currentDate;
document.getElementById('time-select').value = currentTime;

let events = [];


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
  let closeButton = document.getElementById('hide');
  let openClose = document.getElementById('open-close');

  const openSlide = [
    { transform: 'translateY(0)' },
    { transform: 'translateY(-1280px)' }];

  const closeSlide = [
    { transform: 'translateY(-380px)' },
    { transform: 'translateY(900px)' }];

  const rotate = [
    { transform: 'rotate(0)' },
    { transform: 'rotate(180deg)' }];

  const timing = {
    duration: 800,
    iterations: 1 };

  const arrowTiming = {
    duration : 100,
    iterations: 8 };

  if (shown) {
    topArea.animate(openSlide, timing);
    closeButton.animate(openSlide, timing);
    openClose.animate(rotate, arrowTiming);
    setTimeout(function() {
      topArea.style.marginTop = "-900px";
      openClose.innerHTML = 'arrow_circle_down';
      document.getElementById('save-button').style.display = 'none';
      }, 800);
  } else {
    topArea.animate(closeSlide, timing);
    closeButton.animate(closeSlide, timing);
    openClose.animate(rotate, arrowTiming);
    document.getElementById('save-button').style.display = 'inline';
    setTimeout(function() {
      topArea.style.marginTop = "0";
      openClose.innerHTML = 'arrow_circle_up';
      }, 800);
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