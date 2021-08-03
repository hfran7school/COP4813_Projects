<?php

$EMAIL_ID = 628674072; // 9-digit integer value (i.e., 123456789)

require_once '/home/common/php/dbInterface.php'; // Add database functionality
require_once '/home/common/php/mail.php'; // Add email functionality
require_once '/home/common/php/p4Functions.php'; // Add Project 4 base functions

processPageRequest(); // Call the processPageRequest() function

// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE ABOVE THIS LINE

function authenticateUser($username, $password) {
	//test whether the user entered valid login credentials
		//call the database function
		$user = validateUser($username, $password); //echo var_dump($user);
		
		//will return one of two(2) values
			//array containing the user's data, ID, DisplayName and Email
			//NULL (invalid)	
		if($user == NULL){
			return false;
		}
		else{
			//create a session
			session_start();
			//store the user's ID, Display name and Email Address values in the session
			//NOTE: use the following session variables to store the values:
			$_SESSION["userId"] = $user['ID'];
			$_SESSION["displayName"] = $user['DisplayName'];
			$_SESSION["emailAddress"] = $user['Email'];
			
			return true;
		}
}

function displayLoginForm($message = "")
{
	require_once './templates/logon_form.html';
}

function processPageRequest()
{
	// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE BELOW THIS LINE
	if(session_status() == PHP_SESSION_ACTIVE)
	{
		session_destroy();
	}
	// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE ABOVE THIS LINE
	
	$action = isset($_POST['action']) ? $_POST['action'] : null; //getting weird Undefined index errors, this was solution internet provided
	//test whether any POST data exists
	if($action == 'login'){
		//Call the authenticateUser($username, $password) function
		
		
		
		if(authenticateUser($_POST['username'], $_POST['password'])){
			//redirect to the index.php page, showing the user's shopping cart
			header("Location: ./index.php");
			echo " // success";
		}else{
			$error = "The username and/or password is incorrect.";
			displayLoginForm($error);
		}
	}else{
		displayLoginForm();
	}
	
}

?>
