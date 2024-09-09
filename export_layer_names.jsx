app.bringToFront();

var docRef = app.activeDocument;
var docName = decodeURI(app.activeDocument.name);
docName = docName.slice(0, -4); // Remove the last 4 characters (extension)


// Define pixels as unit of measurement
//var defaultRulerUnits = preferences.rulerUnits;
//preferences.rulerUnits = Units.PIXELS;

var layerNum = app.activeDocument.artLayers.length;

var layerRef = app.activeDocument.activeLayer;

var layerNames = "";

function pad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

// Loop to iterate through all layers
function recurseLayers(currLayers) {
  for ( var i = currLayers.layers.length - 1; i >= 0; i-- ) {
    layerRef = currLayers.layers[i];
	
    // test if layer is visible
    if (layerRef.visible) {
      var name = layerRef.name.replace(/_/g, " ");
      name = name.charAt(0).toUpperCase() + name.slice(1);
      layerNames += name + "\n";
    }

    // test if it's a layer set
    if (isLayerSet(currLayers.layers[i])) {
      if (currLayers.layers[i].artLayers.length > 0) {
        recurseLayers(currLayers.layers[i]);
      }
    }
  }
}

// a test for a layer set
function isLayerSet(layer) {
  try {
    if (layer.layers.length > 0) {
      return true;
    }
  } catch (err) {
    return false;
  }
}

// Ask the user for the folder to export to
var FPath = Folder.selectDialog("Save exported layer names to");

// Detect line feed type
if ($.os.search(/windows/i) !== -1) {
  fileLineFeed = "Windows";
} else {
  fileLineFeed = "Macintosh";
}

// Export to txt files
function writeFiles(info, fileName) {
  try {

   var f = new File(FPath + "/" + docName + "_names.txt");
    f.remove();
    f.open("a");
    f.lineFeed = fileLineFeed;
    f.write(info);
    f.close();
  } catch (e) {}
}

// Run the functions
recurseLayers(docRef);
//preferences.rulerUnits = defaultRulerUnits;

// Set preferences back to user's defaults
writeFiles(layerNames, docName);

// Show results
if (FPath == null) {
  alert("Export aborted", "Canceled");
} else {
  alert(
    "Exported " +
      layerNum +
      " layer names to " +
      FPath +
      "/" +
      docName +
      "_names.txt " +
      "using " +
      fileLineFeed +
      " line feeds.",
    "Success!"
  );
}
