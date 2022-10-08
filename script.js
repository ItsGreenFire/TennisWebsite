let infoTable = document.getElementById("info-table");
let shown = true;
let date =  new Date();

/*
let desktopCheck = false;

window.mobileCheck = function() {
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) desktopCheck = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return desktopCheck;
};

if (!mobileCheck()) {
  let toDesktop = document.getElementById('toDesktop');
  toDesktop.style.display = 'block';
}
*/

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
  });
}

function onReserved(okayed) {
  let modal = document.getElementById("rModal")
  let content = document.getElementById("rModalContent")

  if (!okayed) {
    modal.style.display = "block"
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.3 },
      scalar: 2
    });
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.7 },
      scalar: 2
    });
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 1.1 },
      scalar: 2
    });
    setTimeout(function() {content.style.marginTop = '45%'}, 200)
  } else {
    content.style.marginTop = '-75%'
    setTimeout(function() {modal.style.display = "none"; hide(); content.style.marginTop = '-100%'}, 500)
  }
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
    topArea.style.marginTop = "-1275px";
    openClose.innerHTML = 'arrow_circle_down'
    document.body.style.overflowY = 'auto';
  } else {
    openClose.animate(rotate, arrowTiming);
    topArea.style.marginTop = "0";
    openClose.innerHTML = 'arrow_circle_up';
    document.body.style.overflowY = 'hidden';
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
  document.getElementById('bottom-bar').style.backgroundColor = random_theme.primary;
  document.getElementById('bottom-bar').style.color = random_theme.primary;
  document.getElementById('rModalContent').style.backgroundColor = random_theme.primary;
  document.getElementById('success-text').style.backgroundColor = random_theme.primary;
  document.getElementById('success-text').style.color = random_theme.tertiary;
  document.getElementById('okay-button').style.backgroundColor = random_theme.secondary;
  document.getElementById('okay-button').style.color = random_theme.quaternary;
  document.body.style.backgroundColor = random_theme.quinternary
}

randomColor()