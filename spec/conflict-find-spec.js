'use babel';

import ConflictFind from '../lib/conflict-find';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('ConflictFind', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('conflict-find');
  });

  describe('when the conflict-find:next-conflict event is triggered', () => {
    it('goes to next conflict', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.conflict-find')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'conflict-find:next-conflict');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.conflict-find')).toExist();

        let conflictFindElement = workspaceElement.querySelector('.conflict-find');
        expect(conflictFindElement).toExist();

        let conflictFindPanel = atom.workspace.panelForItem(conflictFindElement);
        expect(conflictFindPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'conflict-find:next-conflict');
        expect(conflictFindPanel.isVisible()).toBe(false);
      });
    });
  });
});
