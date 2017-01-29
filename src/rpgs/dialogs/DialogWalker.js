'use strict';

let DialogWalker = (function(){
  let _currTalk = new WeakMap();
  let _rpgs = new WeakMap();
  let _dialog = new WeakMap();

  return class DialogWalker {
    constructor(rpgs) {
      if(!(rpgs && rpgs.findNode)) {
        throw new Error('RPGSystem instance not passed do constructor.');
      }
      _rpgs.set(this,rpgs);
      _dialog.set(this,null);
      _currTalk.set(this,null);
    }

    setDialog(dialogId) {
      let dialog = _rpgs.get(this).findNode(dialogId);
      if(dialog === null || !dialog.getStartTalk) {
        throw new Error(`DialogNode with the id "${dialogId}" does not exists.`);
      }
      _dialog.set(this,dialog);
      this.reset();
    }

    setTalk(talkId) {
      let talk = _rpgs.get(this).findNode(talkId);
      if(talk === null) {
        throw new Error(`TalkNode with the id "${talkId}" does not exists.`);
      }
      _currTalk.set(this,talk);
    }

    getConversation() {
      let conversation = {};
      let currTalk = _currTalk.get(this);
      let children = currTalk ? currTalk.getChildren() : [];
      conversation.text = currTalk ? currTalk.getText() : '';
      conversation.options = children.map((answerId) => {
        let answer = _rpgs.get(this).findNode(answerId);
        return {
          id:answer.getId(),
          text:answer.getText(),
          active:answer.isActive(),
          enabled:answer.isVisible()
        }
      });
      return conversation;
    }

    selectOption(id) {
      let children = _currTalk.get(this).getChildren();
      let answerId = children.filter((currId,index,array) => {
        return currId === id;
      });
      if(answerId[0] !== undefined) {
        let answerNode = _rpgs.get(this).findNode(answerId[0]);
        if(answerNode !== null) this.setTalk(answerNode.getTalk());
      }
    }

    reset() {
      let dialog = _dialog.get(this);
      if(dialog !== null){
        this.setTalk(dialog.getStartTalk());
      }
    }
  }
})();
module.exports = DialogWalker;
