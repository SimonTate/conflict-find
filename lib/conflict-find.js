'use babel';

import ConflictFindView from './conflict-find-view';
import { CompositeDisposable } from 'atom';

export default {
  conflictFindView: null,
  subscriptions: null,

  activate(state) {
    this.conflictFindView = new ConflictFindView(state.conflictFindViewState);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that does stuff
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'conflict-find:next-conflict': () => this.nextConflict()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'conflict-find:prev-conflict': () => this.prevConflict()
    }));

  },

  deactivate() {
    this.subscriptions.dispose();
    this.conflictFindView.destroy();
  },

  serialize() {
    return {
      conflictFindViewState: this.conflictFindView.serialize()
    };
  },

  nextConflict() {
    this.conflictFindView.nextConflict();
  },

  prevConflict() {
    this.conflictFindView.prevConflict();
  },


};
