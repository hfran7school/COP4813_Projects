<?php

$API_KEY = "19066bd8"; // API key (string) provided by Open Movie DataBase (i.e., "ab123456")

session_start(); // Connect to the existing session

processPageRequest(); // Call the processPageRequest() function

// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE ABOVE THIS LINE

function displaySearchForm(){
	require_once './templates/search_form.html';
}

function displaySearchResults($searchString){	
	$results = file_get_contents('http://www.omdbapi.com/?apikey='.$GLOBALS['API_KEY'].'&s='.urlencode($searchString).'&type=movie&r=json');
	$resultsArray = json_decode($results, true)["Search"];
	
	require_once './templates/results_form.html';
}

function processPageRequest(){
	
	if($_SESSION["displayName"] == NULL){
		//redirect to logon.php
		header("Location: ./logon.php");
	}else{
		if (empty($_POST)){
			displaySearchForm();
			//this occurs when the user clicks the add movie button on the shopping cart form
		}else{
			if($_POST['keyword'] != NULL){
				displaySearchResults($_POST['keyword']);
			}
		}
	}
}



?>