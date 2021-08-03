//Hailey Francis

/*
FunctionName: calcMean
Parameters:
	- array: array of numbers
Process:
	- mathematical process of finding the mean
Output: (decimal/float)
	- the mean of the array of values
*/
function calcMean(array){
	return calcSum(array) / array.length;
}

/*
FunctionName: calcMedian
Parameters:
	- array: array of numbers
Process:
	- mathematical process of finding the median
Output: (decimal/float)
	- the median of the array of values
MOTE: 
	- can use Math.floor() function
*/
function calcMedian(array){
	let length = array.length;
	let half = Math.floor(length/2);
	if(length % 2 == 0){
		return (Number(array[half]) + Number(array[half-1]))/2;
	}
	else{
		return Number(array[half]);
	}
}

/*
FunctionName: calcMode
Parameters:
	- array: array of numbers
Process:
	- mathematical process of finding the mode
	- This function MUST handle 1, 2 (bimodal), and 3 or more (multimodal) modal values correctly
Output: (decimal/float)
	- the mode(s) of the array of values
NOTE:
	- Students do NOT need to worry about special cases that require grouping strategies.
		- Separate the bimodal or multimodal values using spaces
		- The order of the bimodal or multimodal values is not important
PERSONAL NOTE:
	- this is the most convoluted and unneccessary code I've ever written but it's fine everything's fine
*/
function calcMode(array){
	//get the length of eachNum array
	let eachNumArrLength = 0;
	for(let i = 0; i < array.length; i++){
		if(array[i] != array[i+1]){
			eachNumArrLength++;
		}
	}
	
	//make eachNum array and amount array (I would do multidimensional but javascript is being a pain)
	let eachNumIndex = 0;
	let eachNumArr = new Array(eachNumArrLength);
	let eachNumArrAmount = new Array(eachNumArrLength);
	
	//populate eachNumArray
	for(let i = 0; i < array.length; i++){
		if(array[i] != array[i+1]){
			eachNumArr[eachNumIndex] = array[i];
			eachNumIndex++;
		}
	}
	
	//populate amounts array (get amounts for each num)
	let curAmount = 1;
	eachNumIndex = 0;
	for(let i = 0; i < array.length; i++){
		if(i != array.length - 1){ //we love indexOutOfBound errors 
			if(array[i] != array[i+1]){
				eachNumArrAmount[eachNumIndex] = curAmount;
				eachNumIndex++;
				curAmount = 1;
			}
			else{
				curAmount++;
			}
		}
		else{
			eachNumArrAmount[eachNumArrLength - 1] = curAmount;
		}
		
	}
	
	//find out which values have the most
	let maxAmount = 1;
	for(let i = 0; i < eachNumArr.length; i++){
		if(eachNumArrAmount[i] > maxAmount){
			maxAmount = eachNumArrAmount[i];
		}
	}
	
	//put those lovely values into a mode thing
	let mode = "";
	for(let i = 0; i < eachNumArr.length; i++){
		if(eachNumArrAmount[i] == maxAmount){
			mode += eachNumArr[i] + " ";
		}
	}
	return mode;
	
}

/*
FunctionName: calcStdDev
Parameters:
	- array: array of numbers
Process:
	- mathematical process of finding the Std Dev
Output: (decimal/float)
	- the StdDev of the array of values
MOTE: 
	- Perform a POPULATION calculation, not a sample
	- may use the Math.sqrt() function
*/
function calcStdDev(array){
	return Math.sqrt(calcVariance(array));
}

/*
FunctionName: calcSum
Parameters:
	- array: array of numbers
Process:
	- mathematical process of finding the sum of array
Output: (decimal/float)
	- the sum of the array of values
*/
function calcSum(array){
	let sum = 0;
	for(let i = 0; i < array.length; i++){
		sum += Number(array[i]);
	}
	return sum;
}

/*
FunctionName: calcVariance
Parameters:
	- array: array of numbers
Process:
	- mathematical process of finding the variance of array
Output: (decimal/float)
	- the variance of the array of values
MOTE: 
	- Perform a POPULATION calculation, not a sample
	- may use the Math.pow() function
*/
function calcVariance(array){
	let variance = 0;
	let mean = calcMean(array);
	for(let i = 0; i < array.length; i++){
		differenceSquared = Math.pow(Number(array[i]) - Number(mean), 2);
		variance += differenceSquared;
	}
	return variance / array.length;
}

/*
FunctionName: findMax
Parameters:
	- array: array of numbers
Process:
	- mathematical process of finding the max of array
Output: (decimal/float)
	- the max of the array of values
*/
function findMax(array){
	return Number(array[array.length - 1]);
}

/*
FunctionName: findMin
Parameters:
	- array: array of numbers
Process:
	- mathematical process of finding the min of array
Output: (decimal/float)
	- the min of the array of values
*/
function findMin(array){
	return Number(array[0]);
}

/*
FunctionName: performStatistics
Parameters:
	- none
Process:
	- Create a numeric array of the string values entered in the textarea control
	- Call each of the eight (8) statistical functions (in some order)
	- Store the values returned by the functions in the respective text field using the value property
Output:
	- always return false
NOTE:
	- Calling the functions in a logical order will help reduce duplicate code
	- Display the values, except calcMode(), to two (2) decimal places.
*/
function performStatistics(){
	// get the array and turn it into a proper array //
	let numString = document.getElementById("numbers").value;
	let numArr = numString.split(" ");
	
	// sort array (bubble) // (I wish this was a seperate function it looks so ugly here)
	for(let i = 0; i < numArr.length; i++){ //outer pass
		for(let j = 0; j < numArr.length; j++){ //inner pass
			//compare
			if(Number(numArr[j+1]) < Number(numArr[j])
				){
				//swap
				let temp = numArr[j];
				numArr[j] = numArr[j+1];
				numArr[j+1] = temp;
			}
		}
	}
	
	// fill in the stats //
	document.getElementById("mean").value = calcMean(numArr).toFixed(2);
	document.getElementById("variance").value = calcVariance(numArr).toFixed(2);
	document.getElementById("stddev").value = calcStdDev(numArr).toFixed(2);
	document.getElementById("sum").value = calcSum(numArr).toFixed(2);
	document.getElementById("min").value = findMin(numArr).toFixed(2);
	document.getElementById("max").value = findMax(numArr).toFixed(2);
	document.getElementById("median").value = calcMedian(numArr).toFixed(2);
	document.getElementById("mode").value = calcMode(numArr);
	
	return false;
}