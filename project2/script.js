//Hailey Francis
/*
FunctionName: testLength
Parameters:
	- value: the value to test
	- length: the required length of the value
		(example: the CVV2/CVC value requires three (3) digits)
Process:
	- tests whether the value is the correct length
Output: (boolean)
	- if the test passes, return true
	- if the test fails, return false
*/
function testLength(value, length){
	if(value == length){
		return true;
	}
	else{
		return false;
	}
}

/*
FunctionName: testNumber
Parameters:
	- value: the value to test 
Process:
	- test whether the value represents a number
Output: (boolean)
	- if the test passes, return true
	- if the test fails, return false
*/
function testNumber(value){
	let numEx = /[1234567890]/i;
	for(i = 0; i < value.length; i++){
		let numTest = value.substring(i, i+1);
		if(numTest.search(numEx) == -1){
			return false;
		}
	}
	return true;
}

/*
FunctionName: validateControl
Parameters:
	- control: the control containing the value to test
		(example: document.getElementById("Zip");)
	- name: the proper name of the control
		(example: "Zip")
	- length: the required length of the control value
Process:
	- test whether the control value is the correct length
		- call the testLength function
		- if the test fails:
			- display appropriate error message
			- return false
	- test whether the control's value represents a number
		(Note: only perform this test if the control value is the correct length)
		- call the testNumber function
		- if the test fails:
			- display appropriate error message
			- return false
			
Output: boolean)
	- if both tests passes, return true
	- if either test fails, return false
*/
function validateControl(control, name, length){
	if(!testNumber(control)){
		alert("The value you put for " + name + " is not numeric. Please use numeric characters only.");
		return false;
	}else{
		if(!testLength(control.length, length)){
			alert("The length of " + name + " is incorrect. Length needs to be " + length + " digits.");
			return false;
		}
		else{
			return true;
		}
	}
}
/*
FunctionName: validateCreditCard
Parameters:
	- value: the credit card string value to test
Process:
	- Remove any spaces from the value
		(example: " 1234 5678 9012 3456 " becomes "1234567890123456")
	- Test whether the credit card value represents a number
		- call the testNumber function
		- if the test fails:
			- display appropriate error message
			- return false
	- Test whether the first digit of the credit card value represents a valid credit card type (see table)
		(Note: Only perform this test if the credit card value is a number.)
		- if the test fails:
			- display appropriate error message
			- return false
	- Test whether the credit card value is the correct length (see table)
		(Note: Only perform this test if the credit card value is a number and the first digit is a valid credit card type.)
		- Call the testLength function
		- If the test fails,
			- Display an appropriate error message
			- Return false
	- 
Output: (boolean)
	- If all three (3) tests pass, return true
	- If any test fails, return false

*/
function validateCreditCard(value){
	let newVal = value;
	while(newVal.search(/[ -]/i) != -1){//while there are spaces or dashes
		newVal = newVal.replace(/[ -]/i, ""); //replace the space or dash with a null space
	}
	let testNum = testNumber(newVal); //make sure the number is a number
	if(testNum){ //passes testNum
		let testCard = true; //default
		let testLengthcard = true; //default
		let firstNum = newVal.substr(0,1);
		switch(firstNum){
			case "3": //AmEx
				testLengthcard = testLength(newVal.length, 15); break;
			case "4": //Visa
			case "5": //MasterCard
			case "6": //Discover
				testLengthcard = testLength(newVal.length, 16); break;
			default: testCard = false; break;
		}
		if(!testCard){
			alert("The Credit Card is invalid. (IMPROPER STARTING DIGIT)");
			return false;
		}
		else if(!testLengthcard){
			alert("The Credit Card is invalid. (AMOUNT OF DIGITS IMPROPER FOR THIS CARD TYPE)");
		}
		else{
			return true;
		}
	}
	else{ //if testNum == false
		alert("The Credit Card is invalid. (CONATINS NON-NUMERIC CHARACTERS)");
		return false;
	}
	
	
}

/*
FunctionName: validateDate
Important Note: When selecting a date in the form, do not select the current month and year.
Parameters:
	- value: the date value to test
Process:
	- Test if the value is greater than today's date (see important note above)
		- If the test fails,
		- Display an appropriate error message
		- Return false
Output: 
	- If the test passes, return true
	- If the test fails, return false
*/
function validateDate(value){ //YYYY-MM format
	let today = new Date();
	let year = today.getFullYear();
	let month = today.getMonth() + 1;
	let dateParts = value.split(/[-]/);
	if(dateParts[0] > year){
		return true;
	}
	else if(dateParts[0] == year){
		if(dateParts[1] > month){
			return true;
		}
		else{
			return false; //month fails;
		}
	}
	else{
		return false; //year fails;
	}
}

/*
FunctionName: validateEmail
Parameters:
	- value: the email string to test
Process:
	- Use a Regular Expression (RegEx) to determine if the string value conforms to a typical email address
		 (example: username@domain.com)
		- If the test fails,
			-  Display an appropriate error message
			- Return false
Output: 
	- If the test passes, return true
	- If the test fails, return false
*/
function validateEmail(value){
	let emailRegEx = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+.[a-zA-Z0-9_-]*$/
	if(value.match(emailRegEx)){
		return true;
	}
	else{
		return false;
	}
}


/*
FunctionName: validateForm
Parameters:
	- none
Process:
	- Call each of the functions in some order to validate the form's fields
		(Note: Some functions may need to be called more than once.)
		- validateControl
		- validateCreditCard
		- validateDate
		- validateEmail
		- validateState
	- If all the functions return true
		- Display an appropriate message such as Payment Submitted

Output: 
	- Always return false
		(Note: If this function does not return false, the web browser may display an error message)
*/
function validateForm(){
	/* variables that just need to have a field filled out */
	let firstName = document.forms["thisForm"]["fname"].value;
	if (firstName == "") {
		alert("Please put your first name.");
		return false;
	}
	let lastName = document.forms["thisForm"]["lname"].value;
	if (lastName == "") {
		alert("Please put your last name.");
		return false;
	}
	let address = document.forms["thisForm"]["address"].value;
	if (address == "") {
		alert("Please put your address.");
		return false;
	}
	let city = document.forms["thisForm"]["city"].value;
	if (city == "") {
		alert("Please put your city.");
		return false;
	}
	let nameOnCard = document.forms["thisForm"]["cardholder"].value;
	if (nameOnCard== "") {
		alert("Please put the name of the card holder.");
		return false;
	}
	
	/* variables with functions involved */
	//creditCard
	let creditCard = document.forms["thisForm"]["cardnum"].value;
	if (creditCard == "") {
		alert("Please put the credit card number.");
		return false;
	}
	else if(!validateCreditCard(creditCard)){
		return false;
	}
	//date
	let expireDate = document.forms["thisForm"]["expiration"].value;
	if(!validateDate(expireDate)){
		alert("The expiration date is invalid.");
		return false;
	}
	//state
	let state = document.forms["thisForm"]["states"].value;
	if(!validateState(state)){
		alert("Please select a state.");
		return false;
	}
	
	//zip
	let zip = document.forms["thisForm"]["zip"].value;
	if(!validateControl(zip, "Zip Code", 5)){
		return false;
	}
	
	//email
	let email = document.forms["thisForm"]["email"].value;
	if(!validateEmail(email)){
		alert("Invalid email address.");
		return false;
	}
	
	//cvvc2c
	let cvv2cvc = document.forms["thisForm"]["cvv2cvc"].value;
	if(!validateControl(cvv2cvc, "CVV2/CVC", 3)){
		return false;
	}
	
	alert("Payment submitted.");
	return false;
}

/*
FunctionName: validateStae
Parameters:
	- value: the index of the selected option in the <select> control to test (umm... no...actually its just the name of the state)
Process:
	- Test whether the Select State option is currently selected
	- If the test fails,
		- Display an appropriate error message
		- Return false
Output: 
	- If the test passes, return true
	- If the test fails, return false
*/
function validateState(value){
	if(value == 0){
		return false;
	}
	else{
		return true;
	}
}