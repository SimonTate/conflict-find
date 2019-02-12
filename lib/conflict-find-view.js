'use babel';

export default class ConflictFindView {

  constructor(serializedState) {}

  serialize() {}

  destroy() {}

  nextConflict() {
      let editor;
      let text;

      if (editor = atom.workspace.getActiveTextEditor()) {
          let text = editor.getText();

          // Row counts should start at 1 (IMO)
          let currentRow = editor.getCursorBufferPosition().row + 1;

          // console.log(text);
          var array = this.findConflicts(text)
          var i = 0;
          var found = false;

          while(i++ < array.length && !found) {
              if(array[i] > currentRow) {
                 console.log("Moving to " + array[i]);
                 editor.setCursorScreenPosition([array[i]-1, 0])
                 found = true;
              }
          }

          if(!found && array.length > 0) {
              console.log("Moving to " + array[0]);
              editor.setCursorScreenPosition([array[0]-1, 0])
          }
      }
  }

  findConflicts(text) {
      // split string into lines.
      var arrConflicts = [ ];
      let re = /<<<<<<< HEAD/g;

      if(re.test(text)) {
          var array = text.split(/\r?\n/);
          var lineNumber = 0;
          var numConflicts = 0;

          array.forEach(function(line){
            lineNumber++;
            if(re.test(line)) {
                arrConflicts.push(lineNumber);
                numConflicts++;
            }
        });
    }

    return arrConflicts;
  }


}
