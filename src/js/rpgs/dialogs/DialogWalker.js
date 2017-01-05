"use strict";

let DialogWalker = (function(){
  let _currTalk = new WeakMap();
  let _rpgs = new WeakMap();
  let _dialog = new WeakMap();

  return class DialogWalker {
    constructor(rpgs) {
      _rpgs.set(this,rpgs);
      _dialog.set(this,null);
      _currTalk.set(this,null);
    }

    reset() {
      let dialog = _dialog.get(this);
      if(dialog !== null){
        this.setTalk(dialog.getStartTalk());
      }
    }

    _findNode(nodeId) {
      return _rpgs.get(this).findNode(nodeId);
    }

    setDialog(dialogId) {
      let dialog = this._findNode(dialogId);
      if(dialog === null) {
        throw new Error(`DialogNode with the id "${dialogId}" does not exists.`);
      }
      _dialog.set(this,dialog);
      this.reset();
    }

    setTalk(talkId) {
      console.log('setTalk',talkId);
      let talk = this._findNode(talkId);
      if(talk === null) {
        throw new Error(`TalkNode with the id "${talkId}" does not exists.`);
      }
      _currTalk.set(this,talk);
    }

    getConversation() {
      let conversation = {};
      conversation.text = _currTalk.get(this).getText();
      let children = _currTalk.get(this).getChildren();
      conversation.options = children.map((answerId) => {
        let answer = this._findNode(answerId);
        return {
          id:answer.getId(),
          text:answer.getText(),
          isActive:answer.isActive(),
          isVisible:answer.isVisible()
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
        let answerNode = this._findNode(answerId[0]);
        console.log('selectOption::answerNode',answerNode,answerNode.getId());
        if(answerNode !== null) this.setTalk(answerNode.getTalk());
      }
    }
  }
})();
module.exports = DialogWalker;
