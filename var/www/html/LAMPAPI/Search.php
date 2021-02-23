<?php


$data = getRequestInfo();

$username = "endpoint";
$password = "StrongPassword";
$db = "Puff";

$conn = new mysqli("localhost", $username, $password, $db);

if ($conn->connect_error)
{
    returnWithError($conn->connect_error);
}
else
{
    $sql = buildQuery($data);
    $result = $conn->query($sql);
    if ($result->num_rows > 0)
    {
        returnRows($result);
    }
    else
    {
        returnWithError( "No Records Found");
    }
    $conn->close();
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function buildQuery($data) {
    $sql = "SELECT * FROM contact WHERE `user_ID`=" . $data["user_ID"] . " AND ";
    $search_criteria = htmlspecialchars($data["search_criteria"]);
    $sql .= "`FirstName` LIKE '%" . $search_criteria . "%' OR ";
    $sql .= "`LastName` LIKE '%" . $search_criteria . "%' OR ";
    $sql .= "`PhoneNumber` LIKE '%" . $search_criteria . "%' OR ";
    $sql .= "`Email` LIKE '%" . $search_criteria . "%' OR ";
    $sql .= "`StreetAddress` LIKE '%" . $search_criteria . "%' OR ";
    $sql .= "`City` LIKE '%" . $search_criteria . "%' OR ";
    $sql .= "`State` LIKE '%" . $search_criteria . "%' OR ";
    $sql .= "`ZIP_Code` LIKE '%" . $search_criteria . "%';";
    return $sql;
}

function returnWithError( $err )
{
	$retValue = '{"results":[],"error":"' . $err . '"}';
	sendResultInfoAsJson( $retValue );
}
	
function returnRows($result)
{
    $retValue = '{"results":[';
	while($row = $result->fetch_assoc()) {
        $retValue = $retValue . sprintf('{"ID":%d,"FirstName":"%s","LastName":"%s","PhoneNumber":"%s", "Email":"%s", "StreetAddress":"%s", "City":"%s", "State":"%s", "ZIP_Code":"%s"},',
         $row["ID"], $row["FirstName"], $row["LastName"], $row["PhoneNumber"], $row["Email"], $row["StreetAddress"], $row["City"], $row["State"], $row["ZIP_Code"]);
    } 
    $retValue = rtrim($retValue, ',') . '], "error":""}';
	sendResultInfoAsJson( $retValue );
}

function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

?>