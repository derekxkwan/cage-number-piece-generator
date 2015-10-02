
//=======================================================
//INPUT

$("#dur").change(function(){
	var val = this.value;
	var valStr = secToStamp(val);
	$("#durVal").html(valStr);
	maxDur = val;
	end = val;
});

$("#numSnd").change(function(){
	var val = this.value;
	var valStr = String(val);
	$("#numSndVal").html(valStr);
	numSnd = val;
});

$("#numRpt").change(function(){
	var val = this.value;
	var valStr = String(val);
	$("#numRptVal").html(valStr);
	numRpt = val;
});

function gen(){
	maxDur = $("#dur").val();
	numSnd = $("#numSnd").val();
	numRpt = $("#numRpt").val();
	compute();
	$("#param").css('z-index', 1);
	$("#directions").css('z-index', 1);
	$("#music").css('z-index', 99);
	$("#cover").css('z-index', -1);
	$("#headButt").css('z-index', 99);
};

function startAgain(){
	numArr = [];
	addStr = "";
	durArr = [];
	$("#music").html("");
	$("#param").css('z-index', 99);
	$("#directions").css('z-index', 99);
	$("#music").css('z-index', 1);
	$("#cover").css('z-index', 99);
	$("#headButt").css('z-index', -1);
	
};

function rnd(slidId, numBox, minVal, maxVal){
	var valStr;
	var randVal = parseInt(Math.random() * (maxVal-minVal + 0.1))+minVal;
	$(slidId).val(randVal);

	switch(slidId){
		case "#dur":
			valStr = secToStamp(randVal); 
			maxDur = randVal;
			end = randVal;
			break;
		case "#numSnd":
			valStr = String(randVal);
			numSnd = randVal;
			break;
		case "#numRpt":
			valStr = String(randVal);
			numRpt = randVal;
			break;
	};
	$(numBox).html(valStr);



};


