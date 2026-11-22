<?php
	$inData = getRequestInfo();
	
	$color = $inData["color"];
	$userId = $inData["userId"];

	$dbHost = getenv("DB_HOST") ?: "localhost";
	$dbUser = getenv("DB_USER") ?: "TheBeast";
	$dbPassword = getenv("DB_PASSWORD") ?: "WeLoveCOP4331";
	$dbName = getenv("DB_NAME") ?: "COP4331";
	$dbPort = getenv("DB_PORT") ?: 3306;

	$conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName, (int)$dbPort);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Colors (UserId,Name) VALUES(?,?)");
		$stmt->bind_param("ss", $userId, $color);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>