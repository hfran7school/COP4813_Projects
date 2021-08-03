<?php

$EMAIL_ID = 628674072; // 9-digit integer value (i.e., 123456789)
$API_KEY = "19066bd8"; // API key (string) provided by Open Movie DataBase (i.e., "ab123456")

session_start(); // Connect to the existing session

require_once '/home/common/php/dbInterface.php'; // Add database functionality
require_once '/home/common/php/mail.php'; // Add email functionality
require_once '/home/common/php/p4Functions.php'; // Add Project 4 base functions

processPageRequest(); // Call the processPageRequest() function

// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE ABOVE THIS LINE

function addMovieToCart($imdbID){	
	//Call the database function movieExistsInDB($imdbID)
	$movieExists = movieExistsInDB($imdbID); //returns 0 or 1 to ∞: The ID of the movie
	$movieID = $imdbID;
	//This function returns one of two (2) values
		//1 to ∞: The ID of the movie
			// -- The movie already exists in the Course Web Server database (no need to add it)
		//0: The movie does not exist in the Course Web Server database
			// -- Need to add the move to the database
	
	//if movie does not exist, add it to database
	if($movieExists == 0){
		$result= file_get_contents('http://www.omdbapi.com/?apikey='.$GLOBALS['API_KEY'].'&i='.$imdbID.'&type=movie&r=json');
		
		$movieInfo = json_decode($result, true);
		echo var_dump ($movieInfo);
		
		$movieID = addMovie($movieInfo['imdbID'], $movieInfo['Title'], $movieInfo['Year'], $movieInfo['Rating'], $movieInfo['Runtime'], $movieInfo['Genre'], $movieInfo['Actors'], $movieInfo['Director'], $movieInfo['Writer'], $movieInfo['Plot'], $movieInfo['Poster']);
	}
	
	addMovieToShoppingCart($_SESSION["userId"], $movieID);
	displayCart();
	
}

function displayCart(){
	//Note: The function returns an array containing the IDs of the movies in the user's shopping cart.
	$movies = getMoviesInCart($_SESSION["userId"]);
	
	require_once './templates/cart_form.html';
}

function processPageRequest(){
	//Test whether the user's Display Name value is stored in the session
	if($_SESSION["displayName"] == NULL){
		//redirect to logon.php
		header("Location: ./logon.php");
	}else{
		$action = isset($_GET['action']) ? $_GET['action'] : null;
		if($action == NULL){
			displayCart();
		}else if($action == 'add'){
			addMovieToCart($_GET['imdb_id']);
			header("Location: ./index.php"); //update cart
		}else if($action == 'remove'){
			removeMovieFromCart($_GET['movie_id']);
			header("Location: ./index.php");
		}
	}
			
		
}

function removeMovieFromCart($movieID){	
	 $movieRemoved = removeMovieFromShoppingCart($_SESSION["userId"], $movieID); //returns true or false
	 //redirect browswer to index.php to update the cart (??? do you mean to displayCart? cause the directions imply redirecting to index.php literally twice if this is the case)
	 
	 
}

?>