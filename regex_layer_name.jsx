// Select all
function main() {
   try {
      
      // Paul's function to loop through document
      function findReplaceLayerName(obj,Find,Replace) {
         var regFind = new RegExp(Find,"gi");
         if (obj.artLayers.length > 0) {
            for (var z = 0; z < obj.artLayers.length; z++) {
                  var layer = obj.artLayers[z];
                  if(layer.visible){ 
                     layer.name = layer.name.replace(regFind,Replace);
                  }
            }
            if (obj.layerSets.length > 0) {
                  for (var l = 0; l < obj.layerSets.length; l++) {
                        findReplaceLayerName(obj.layerSets[l],Find,Replace);
                        }
                  }
            }
         }

      // build dialog box
      var win = new Window("dialog{text:'Rename',bounds:[100,100,350,240],\
            panel0:Panel{bounds:[10,10,240,130] , text:'Find & Replace' ,properties:{borderStyle:'etched',su1PanelCoordinates:true},\
               statictext0:StaticText{bounds:[10,20,90,37] , text:'Find:' ,properties:{scrolling:undefined,multiline:undefined}},\
               statictext1:StaticText{bounds:[10,40,90,57] , text:'Replacement:' ,properties:{scrolling:undefined,multiline:undefined}},\
               edittext0:EditText{bounds:[100,16,220,36] , text:'change_this' ,properties:{multiline:false,noecho:false,readonly:false}},\
               edittext1:EditText{bounds:[100,40,220,60] , text:'to_this' ,properties:{multiline:false,noecho:false,readonly:false}},\
               button0:Button{bounds:[10,70,220,100] , text:'Go!' }\
            }\
      };");

      // set dialog button to execute our function
      win.panel0.button0.onClick = function() {
         findReplaceLayerName(activeDocument,win.panel0.edittext0.text,win.panel0.edittext1.text);
         alert("DONE!");
      }

      // show user the dialog
      win.center();
      win.show();

   } catch(e) {
      alert("Script failed with the following error: \n\n"+ e);
   }
}

main();