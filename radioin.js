function $radioin(args)
{
	var thisPtr = this;
	this.args = args;
	var argsArr = args.split(" ") || [];
	var radioParent = null;

	this.buttons = (argsArr.length && argsArr[0] && typeof(argsArr[0]) != "undefined") ? argsArr[0] : 2;
	this.orientation = (argsArr.length && argsArr[1] && typeof(argsArr[1]) != "undefined") ? argsArr[1] : "horizontal";

	function initButtons(num) {
		var orientation = (thisPtr.orientation == "vertical") ? "<br/>" : "";
		var str = "";
		for(var j = 0; j < num; j++) {
			str += "<input name=\""+ thisPtr.createElID("radiogroup") +"\" id=\""+ thisPtr.createElID("radio_"+j) +"\" type=\"radio\"/>" + orientation;
		}
		return str;
	}

	function addObservers() {
		//add observers for all  buttons
		for(var i=0;i<thisPtr.buttons;i++)
			thisPtr.controller.attachObserver(thisPtr.createElID("radio_"+i),"click",clickFunc,"performance");
		
	}

	this.inlet1 = new this.inletClass("inlet1", this, "number selects radio at index");
	this.outlet1 = new this.outletClass("outlet1",this,"onclick output the index number of radio button clicked.");	

	this.inlet1["num"] = function (val) {
	  if ((val <= (thisPtr.buttons - 1)) && (val >= 0)) {
      thisPtr.ui.getElByID(thisPtr.createElID("radio_"+val)).checked = true;
			thisPtr.outlet1.doOutlet(val);
    }
	}

	function clickFunc() {		
		//find the selected button and output its index.
		for(var j=0;j<thisPtr.buttons;j++) {
			if(thisPtr.ui.getElByID(thisPtr.createElID("radio_"+j)).checked)
				thisPtr.outlet1.doOutlet(j);
		}
	}
	
	//create a config with the params we want to be user editable in the inspector
	//must follow the form- property name, property value, label (for inspector), data type (number,boolean,string)
	this.setInspectorConfig([
		{name:"buttons",value:thisPtr.buttons,label:"Number of Buttons",type:"number",input:"text"},
		{name:"orientation",value:thisPtr.orientation,label:"Orientation",type:"string",options:[{label:"Vertical",value:"vertical"},{label:"Horizontal",value:"horizontal"}],input:"radio"}
	]);
	
	//save the values returned by the inspector- returned in form {valueName:value...}
	//called after the inspector window is saved
	this.saveInspectorValues=function(vals) {
		
		//update the local properties
		for(var x in vals)
			if(x=="orientation")
				this[x]=vals[x];
			else
				this[x]=parseInt(vals[x]);
			
		//update the arg str
		this.args=""+vals["buttons"]+" "+vals["orientation"];
		
		//redraw the buttons
		radioParent.innerHTML = initButtons(thisPtr.buttons);
		
		//add observers
		addObservers();			

	}		
	
	//custom html
	this.ui=new LilyObjectView(this,("<div id=\""+thisPtr.createElID("radio")+"\">"+initButtons(thisPtr.buttons)+"</div>"));
	this.ui.draw();
	
	//attach the listeners
	addObservers();
	//get a ref to parent node.
	radioParent = thisPtr.ui.getElByID(thisPtr.createElID("radio"));	
		
//	this.displayElement=thisPtr.ui.getElByID(thisPtr.createElID("radio"));
//	this.resizeElement=this.displayElement;
	return this;
}

var $radioinMetaData = {
	textName:"radioin",
	htmlName:"radioin",
	objectCategory:"Interaction",
	objectSummary:"Send messages using HTML radio buttons.",
	objectArguments:"number of radio buttons [2], orientation [horizontal]"
}