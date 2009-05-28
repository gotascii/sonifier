function $cheerio()
{
  // 2. Save a reference to this object.
	var thisPtr = this;

  // 3. Create an inlet and an outlet.
	this.inlet1 = new this.inletClass("inlet1", this, "any input triggers a bang if the box is checked.");
	this.outlet1 = new this.outletClass("outlet1", this, "bang if checked");

  // 4. Create a variable to hold a reference to the checkbox.
	var checkEl = null;

  // 9. Add a handler to the inlet. 
  this.inlet1["anything"] = function (val) {
    if (val == "bang") {
      checkEl.checked = !checkEl.checked;
    } else if (checkEl.checked) {
      thisPtr.outlet1.doOutlet("bang");
    }
  }

  // 5. Create a custm ui for this object using an input html element.
	this.ui = new LilyObjectView(this, "<input style=\"width:10px;height:10px\" id=\"" + this.createElID("checkbox") + "\" type=\"checkbox\"/>");
  // 6. Render the view we just created.
	this.ui.draw();
  // 7. Get a reference to the input DOM element we just created.
	checkEl = this.ui.getElByID(thisPtr.createElID("checkbox"));
  // 8. Prevent clicking the checkbox to also select the object for editing.
	this.controller.attachObserver(this.createElID("checkbox"), "click", LilyUtils.preventDefault, "edit");

	return this;
}

// 1. Setup this objects required metadata.
var $cheerioMetaData = {
	textName:"cheerio",
	htmlName:"cheerio",
	objectCategory:"Interaction",
	objectSummary:"Passes messages if checked.",
	objectArguments:""
}