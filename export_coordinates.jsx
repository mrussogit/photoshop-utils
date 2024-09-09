// Bring application forward
app.bringToFront();

// Set active Document variable and decode name for output
var docRef = app.activeDocument;
var docName = decodeURI(activeDocument.name);
docName = docName.replace(".psd", "");

// Define pixels as the unit of measurement
var defaultRulerUnits = preferences.rulerUnits;
preferences.rulerUnits = Units.PIXELS;

// Define variables for the active layer in the active document
var layerRef = app.activeDocument.activeLayer;

// Define variables for x and y of layers
var LB = activeDocument.activeLayer.bounds;
var x = (layerRef.bounds[0] + layerRef.bounds[2]) / 2;
var y = (layerRef.bounds[1] + layerRef.bounds[3]) / 2;
var coords = "";

function pad(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

// Loop to iterate through all layers
function recurseLayers(currLayers) {
  for (var i = currLayers.layers.length - 1; i >= 0; i--) {
    layerRef = currLayers.layers[i];

    if (layerRef.typename === "ArtLayer" && layerRef.visible) {
      x = (layerRef.bounds[0] + layerRef.bounds[2]) / 2;
      y = (layerRef.bounds[1] + layerRef.bounds[3]) / 2;
      coords += pad(Math.round(x.value), 4) + "," + pad(Math.round(y.value), 4) + "\n";
    }

    // Test if it's a layer set
    if (layerRef.typename === "LayerSet") {
      recurseLayers(layerRef);
    }
  }
}

// Ask the user for the folder to export to
var FPath = Folder.selectDialog("Save exported coordinates to");

// Detect line feed type
var fileLineFeed = ($.os.search(/windows/i) !== -1) ? "Windows" : "Macintosh";

// Export to txt file
function writeFile(info) {
  try {
    var f = new File(FPath + "/" + docName + ".txt");
    f.remove();
    f.open('a');
    f.lineFeed = fileLineFeed;

    // Exclude writing a line feed after the last coordinate
    if (info.length > 0) {
      f.write(info);
      if (info.charAt(info.length - 1) !== "\n") {
        f.write("\n");
      }
    }

    f.close();
  } catch (e) { }
}


// Run the functions
recurseLayers(docRef);
preferences.rulerUnits = defaultRulerUnits;

// Set preferences back to the user's defaults
writeFile(coords);

// Show results
if (FPath == null) {
  alert("Export aborted", "Canceled");
} else {
  alert(
    "Exported coordinates of visible layers to " +
      FPath +
      "/" +
      docName +
      ".txt " +
      "using " +
      fileLineFeed +
      " line feeds.",
    "Success!"
  );
}
