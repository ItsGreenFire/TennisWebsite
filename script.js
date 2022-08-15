let infoTable = document.getElementById("info-table");
let shown = true;

let date =  new Date();
console.log(date);

currentDate = date.getFullYear()+"-"+padzero(date.getMonth()+1)+"-"+padzero(date.getDate());
currentTime = padzero(date.getHours())+":"+padzero(date.getMinutes());
console.log(currentTime,currentDate)

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
  name = name.options[name.selectedIndex].text;
  time = time.value;
  date = date.value;

  return {"eDate": date, "eTime": time, "ePerson": name};
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
    "        <th>Name</th>" +
    "    </tr>";

  events.forEach(e => {
    let row = infoTable.insertRow(1);
    let dCell = row.insertCell(0);
    let tCell = row.insertCell(1);
    let pCell = row.insertCell(2);
    dCell.innerHTML = e.eDate.substring(5);
    tCell.innerHTML = e.eTime;
    pCell.innerHTML = e.ePerson;

  });
}


function hide() {
  let topArea = document.getElementById('topArea')
  let closeButton = document.getElementById('hide')

  const openSlide = [
    { transform: 'translateY(0)' },
    { transform: 'translateY(-650px)' }];

  const closeSlide = [
    { transform: 'translateY(-550px)' },
    { transform: 'translateY(0)' }];

  const timing = {
    duration: 350,
    iterations: 1 };

  if (shown) {
    document.getElementById('hide').innerHTML = 'SHOW';
    topArea.animate(openSlide, timing);
    closeButton.animate(openSlide, timing);
    setTimeout(function() {  topArea.style.marginTop = "-650px" }, 350);
    document.getElementById('save-button').style.display = 'none'

  } else {
    document.getElementById('hide').innerHTML = 'HIDE';
    topArea.animate(closeSlide, timing);
    closeButton.animate(closeSlide, timing);
    setTimeout(function() {  topArea.style.marginTop = "0" }, 350);
    document.getElementById('save-button').style.display = 'inline'
  }
  shown = !shown;
}

function randomColor() {
  let colors = ['#ffffff', '#ffde9d', '#c0ffc2'];
  let random_color = colors[Math.floor(Math.random() * colors.length)];

  document.getElementById('topArea').style.backgroundColor = random_color;
  document.getElementById('name-select').style.backgroundColor = random_color;
  document.getElementById('date-select').style.backgroundColor = random_color;
  document.getElementById('time-select').style.backgroundColor = random_color;
  document.getElementById('hide').style.backgroundColor = random_color;
  document.getElementById('hide').style.borderTopColor = random_color;
}

randomColor()
