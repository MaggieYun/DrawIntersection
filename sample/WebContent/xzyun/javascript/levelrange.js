var options=[];   
        
var onChangeHandler = function(){
	var select = document.getElementById("startlevel");
	var selectedItem = select.selectedIndex;

	for(var i=0;i<options.length;i++){
		var endlevel = document.getElementById("endlevel");
		endlevel.remove(options[i]);
	}
           
	for(var i=selectedItem+1;i<=19;i++){
		var endlevel = document.getElementById("endlevel");
		var newOption = document.createElement("option");
		newOption.value = i;
		newOption.text = i;
		options.push(newOption);            
		endlevel.add(newOption);
	};
};