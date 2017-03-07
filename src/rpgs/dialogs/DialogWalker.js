'use strict';

let DialogWalker = (function () {
  let _currTalk = new WeakMap();
  let _rpgs = new WeakMap();
  let _dialog = new WeakMap();

  return class DialogWalker {
    constructor(rpgs) {
      if (!(rpgs && rpgs.findNode)) {
        throw new Error('RPGSystem instance not passed to constructor.');
      }
      _rpgs.set(this, rpgs);
      _dialog.set(this, null);
      _currTalk.set(this, null);
    }

    setDialog(dialogId) {
      let dialog = _rpgs.get(this).findNode(dialogId);

      if (dialog === null || !dialog.getStartTalk) {
        throw new Error(`DialogNode with the id "${dialogId}" does not exists.`);
      }
      _dialog.set(this, dialog);
      this.reset();
    }

    setTalk(talkId) {
      let talk = _rpgs.get(this).findNode(talkId);

      if (talk === null) {
        throw new Error(`TalkNode with the id "${talkId}" does not exists.`);
      }
      _currTalk.set(this, talk);
    }

    getConversation() {
      let conversation = {};
      let currTalk = _currTalk.get(this);
      let children = currTalk ? currTalk.getChildren() : [];

      conversation.text = currTalk ? currTalk.getText() : '';
      conversation.options = children.map((answer) => {
        return {
          id: answer.getId(),
          text: answer.getText(),
          active: answer.isActive(),
          enabled: answer.isVisible()
        };
      });
      return conversation;
    }

    // should return boolean that indicates if there is next talk
    selectOption(id) {
      let children = _currTalk.get(this).getChildren();
      let answer = children.filter((child, index, array) => {
        return child.getId() === id;
      });

      if (answer[0] !== undefined) {
        let answerNode = answer[0];
        let talkId;

        if (answerNode !== null) {
          talkId = answerNode.getWires('goto')[0];
          if (talkId !== undefined) {
            this.setTalk(talkId);
            return true;
          }
        }
      }
      return false;
    }

    reset() {
      let dialog = _dialog.get(this);

      if (dialog !== null) {
        this.setTalk(dialog.getStartTalk());
      }
    }
  };
})();

module.exports = DialogWalker;
