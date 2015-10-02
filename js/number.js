var maxDur=273;
var numSnd = 15;
var numRpt = 5;
var atEnd = true;
var end = maxDur;
var atBegin = true;
var begin = 0;
var numTries = 10;

//var numRpt = parseInt( Math.random()*(0.25*numSnd));
var numArr = [];
var addStr = "";
var durArr = [];







//========================================================

function coinFlip(){
//my version of a coin flip
	var ret = (Math.random() - 0.5) > 0;

	return ret

};


function makeArr(num){

	for(var i=0; i<numSnd; i++){
		numArr.push(i+1);
	};
	while(numRpt > 0){
		var randIdx = parseInt(Math.random() * (numSnd-1) + 0.1);
		numArr.push(numArr[randIdx]);
		numRpt--;
	};

};

function qsort(arr, first, last){
	var n = last-first+1;
	if(n>1){
		randIdx = parseInt(Math.random() * (n-1 + 0.1))+ first;
		var temp = arr[randIdx];
		arr[randIdx] = arr[last];
		arr[last] = temp;
		var pivot = arr[last];
		var i = first;
		for(var j = first; j<last; j++){
			if(arr[j] < pivot){
				temp = arr[j];
				arr[j] = arr[i];
				arr[i] = temp;
				i = i + 1;
			};

		};
		temp = arr[i];
		arr[i] = pivot;
		arr[last] = temp;
		qsort(arr, first, i-1);
		qsort(arr, i+1, last);

	};


};


function fisherYates(arr){
	for(var i=arr.length-1; i>=1; i--){
		var j = parseInt(Math.random() * (arr.length - 1.1));
		if(i != j){
			var temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		};
	};


};

function secToStamp(ipt){
	//go from seconds to timestamp in minutes seconds
	var min, sec, minStr, secStr;
	min = parseInt(ipt/60);
	sec = ipt % 60;
	minStr = String(min);
	if(sec<10){
	secStr = "0"+String(sec);

	}
	else{
		secStr = String(sec);

	};
	var ret = minStr + "'" + secStr + "''";
	return ret;
};

function atEndBegin(){
	var prop;
//I do this so that it doesn't have to start at 0'00" or at the specified ending, but within the ballpark
	atEnd = coinFlip();
	atBegin = coinFlip();
	if(!atEnd || !atBegin){
	//ballpark = 10% of piece
		prop = maxDur * 0.1;
	};
	if(!atEnd){
		end -= parseInt(Math.random()*prop);

	};
	if(!atBegin){
		begin += parseInt(Math.random()*prop);
	};




};


function makeDurs(){
	//randomly generating all the timestamps for the brackets
	durArr.push(begin);
	durArr.push(end);
	var len = end - begin;
	for(var i=1;i<((numArr.length*4)-1);i++){
		var curTries = numTries;
		var randDur = parseInt(Math.random() * (len + 0.1))+begin;
		var decTries = end > (numSnd * numRpt);
		while(durArr.indexOf(randDur) >= 0 && curTries > 0){
			randDur = parseInt(Math.random() * (len+0.1))+begin;
			if(decTries){
				curTries--;
			};

		};
		durArr.push(randDur);
	};

};






function makeScore(){
	for(var i=0;i<numArr.length;i++){
		var divClass;
		var lBrDur1 = 4*i; //index in durArr

		var lBrDur2 = lBrDur1 + 2; //make the dur overlap with the right bracket first dur
		var rBrDur1 = lBrDur1 + 1;
		var rBrDur2 = rBrDur1 + 2;
		var lBrDur1Str = secToStamp(durArr[lBrDur1]);
		var lBrDur2Str = secToStamp(durArr[lBrDur2]);
		var rBrDur1Str = secToStamp(durArr[rBrDur1]);
		var rBrDur2Str = secToStamp(durArr[rBrDur2]);
		var durStr = lBrDur1Str + " &harr; " + lBrDur2Str + "&emsp;&emsp;&emsp;" + rBrDur1Str + " &harr; " + rBrDur2Str;
		durStr = "<span class='brack'>" + durStr + "</span><br>";
		var numStr = "<span class='num'>" + String(numArr[i]) + "</span>";
		
		if(i % 2 == 0){
			divClass = "chunkL";

			}
		else{
			divClass = "chunkR";
		};
		var addStr = "<div class='" + divClass + "'>" + durStr + numStr + "</div>";
		$("#music").append(addStr);


	};
};



function compute(){

	makeArr(numSnd);
	fisherYates(numArr);
	atEndBegin();
	makeDurs();
	qsort(durArr, 0, durArr.length-1);
	makeScore();
};
$(document).ready( function(){
$("#headButt").hide();
$("#headButt").css('z-index', 99);
});
