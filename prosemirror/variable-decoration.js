// Not currently used due to cursor movement wierdness

import {Decoration, DecorationSet} from "prosemirror-view"
import {Plugin, TextSelection} from "prosemirror-state"

let variableValues = {
  1: "123 cats",
  2: "246 dogs",
};

function variableDecoration(doc) {
  let decos = []
  doc.descendants((node, pos) => {
    if(node.type.name == "variable") {
      decos.push(Decoration.widget(pos, variableElement(node.attrs.variableId)));
    }
  })
  return DecorationSet.create(doc, decos)
}

function variableElement(variableId) {
  let element = document.createElement("span");
  element.className = "m-variable";
  element.innerText = variableValues[variableId];
  return element;
}

export let variablePlugin = new Plugin({
  state: {
    init(_, {doc}) { return variableDecoration(doc) },
    apply(tr, old) { return tr.docChanged ? variableDecoration(tr.doc) : old }
  },
  props: {
    decorations(state) { return this.getState(state) },
  }
})
