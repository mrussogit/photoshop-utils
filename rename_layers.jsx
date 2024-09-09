@@ -0,0 +1,96 @@
#target photoshop

// Create dialog
var dlg = new Window("dialog", "Layer Renamer");
dlg.orientation = "column";

// Prepend input
var prependGroup = dlg.add("group");
prependGroup.add("statictext", undefined, "Prepend:");
var prependInput = prependGroup.add("edittext", undefined, "");
prependInput.characters = 15;

// Layer name input
var nameGroup = dlg.add("group");
nameGroup.add("statictext", undefined, "Layer Name:");
var layerNameInput = nameGroup.add("edittext", undefined, "Layer");
layerNameInput.characters = 15;

// Append input
var appendGroup = dlg.add("group");
appendGroup.add("statictext", undefined, "Append:");
var appendInput = appendGroup.add("edittext", undefined, "");
appendInput.characters = 15;

// Checkboxes
var startWithZeroCheck = dlg.add("checkbox", undefined, "Start with 0");
var topToBottomCheck = dlg.add("checkbox", undefined, "Top to bottom");

// Run button
var runBtn = dlg.add("button", undefined, "Run");

runBtn.onClick = function() {
    if (app.documents.length > 0) {
        var doc = app.activeDocument;
        var selectedLayers = getSelectedLayers(doc);
        
        if (selectedLayers.length > 0) {
            var baseName = layerNameInput.text;
            var prepend = prependInput.text;
            var append = appendInput.text;
            var startIndex = startWithZeroCheck.value ? 0 : 1;
            var isTopToBottom = topToBottomCheck.value;
            
            renameLayers(selectedLayers, baseName, prepend, append, startIndex, isTopToBottom);
            alert("Layers renamed successfully!");
        } else {
            alert("No layers selected. Please select layers and try again.");
        }
    } else {
        alert("No document open. Please open a document and try again.");
    }
    dlg.close();
}

function getSelectedLayers(doc) {
    var selectedLayers = [];
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var desc = executeActionGet(ref);
    if (desc.hasKey(stringIDToTypeID('targetLayers'))) {
        desc = desc.getList(stringIDToTypeID('targetLayers'));
        var len = desc.count;
        for (var i = 0; i < len; i++) {
            try {
                activeDocument.activeLayer = activeDocument.layers[desc.getReference(i).getIndex() - 1];
                selectedLayers.push(activeDocument.activeLayer);
            } catch (e) {}
        }
    } else {
        selectedLayers.push(activeDocument.activeLayer);
    }
    return selectedLayers;
}

function renameLayers(layers, baseName, prepend, append, startIndex, isTopToBottom) {
    var layerCount = layers.length;
    for (var i = 0; i < layerCount; i++) {
        var index = isTopToBottom ? i : (layerCount - 1 - i);
        var newName = (prepend ? prepend : "") + 
                      baseName + 
                      (startIndex + i) + 
                      (append ? append : "");
        
        var idset = charIDToTypeID("setd");
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putIdentifier(charIDToTypeID("Lyr "), layers[index].id);
        desc.putReference(charIDToTypeID("null"), ref);
        var nameDesc = new ActionDescriptor();
        nameDesc.putString(charIDToTypeID("Nm  "), newName);
        desc.putObject(charIDToTypeID("T   "), charIDToTypeID("Lyr "), nameDesc);
        executeAction(idset, desc, DialogModes.NO);
    }
}

dlg.show();
No newline at end of file
