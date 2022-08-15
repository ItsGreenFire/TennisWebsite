<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


function cmd_list_people($jd, $c)
{

    $sql = "SELECT * FROM people";

    $r = $c->query($sql);
    if ($r->num_rows > 0) {
        $first = true;
        echo '{ "people" : [';
        while ($si = $r->fetch_assoc()) {
            if ($first==false)
                echo ",";
            $rowJSON = json_encode($si);
            echo $rowJSON;
            $first=false;
        }
        echo ']}';
    }
    else {
        echo "{\"resp\":\"list-people Failed\"}";
    }
}

function cmd_list_reservations($jd, $c)
{
    
//    $sql = "SELECT * FROM reservations WHERE start_time >= now()";
    $sql = "SELECT * FROM reservations";

    $r = $c->query($sql);
    if ($r->num_rows > 0) {
        $first = true;
        echo '{ "reservations" : [';
        while ($si = $r->fetch_assoc()) {
            if ($first==false)
                echo ",";
            $rowJSON = json_encode($si);
            echo $rowJSON;
            $first=false;
        }
        echo ']}';
    }
    else {
        echo "{\"resp\":\"list-reservations Failed\"}";
    }
}

/*
    {
        "reservation_id": "1",        // if "reservation_id" not included then is adds a new reservation
        "person_id": "1",
        "start_time": "2022-03-21 02:00:00",
        "end_time": "2022-03-21 03:00:00"
    }
*/
function cmd_save_reservation($jd, $c)
{
    $pid = $jd["person_id"];
    $st = $jd["start_time"];
    $et = $jd["end_time"];

    if (array_key_exists('reservation_id', $jd)) {
        $rid = $jd["reservation_id"];
        $sql = "UPDATE reservations SET person_id='$pid',start_time='$st',end_time='$et' WHERE reservation_id=$rid";
    }
    else {
        $sql = "INSERT INTO reservations SET person_id='$pid',start_time='$st',end_time='$et'";
    }
    //echo $sql."\n";
    $c->query($sql);
    echo "{\"status\":\"OK\"}";
}


/*
    {
        "reservation_id": "1",
    }
*/
function cmd_delete_reservation($jd, $c)
{
    if (array_key_exists('reservation_id', $jd)) {
        $rid = $jd["reservation_id"];
        $sql = "DELETE FROM reservations WHERE reservation_id=$rid";
        //echo $sql."\n";
        $c->query($sql);
        echo "{\"status\":\"OK\"}";
    }
}


// =============================== MAIN ===============================
// Create Prod connection
$conn = new mysqli("localhost", "root", "supergamer", "scheduler");
// Check connection
if ($conn->connect_error) {
    die("Prod Connection failed: " . $conn->connect_error);
}

// get function being called
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

//echo "GOT: ".$uri[0]." ".$uri[1]." ".$uri[2]." ".$uri[3]." ".$uri[4]." ".$uri[5];

$cmd = $uri[3];

//echo "CMD:".$cmd;

// for now BLE is a post so we need to run a bit different with JSON from the IOT
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // looks like we have a POST rather than a get. lets parse the JSON
    $dPost = file_get_contents('php://input');
    $jdata = json_decode($dPost,true);

    switch($cmd) {

        case "list-people":
            cmd_list_people($jdata,$conn);
            break;
        case "list-reservations":
            cmd_list_reservations($jdata,$conn);
            break;
        case "save-reservation":
            cmd_save_reservation($jdata,$conn);
            break;
        case "delete-reservation":
            cmd_delete_reservation($jdata,$conn);
            break;
        default:
            echo "{\"status\":\"Bad Command\"}";
    }

} // end POST

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if ($cmd=="health") {
    	// for now return OK - later get DB and EC2 status
		echo "{\"status\":\"OK\"}";
    }

}

$conn->close();

?>