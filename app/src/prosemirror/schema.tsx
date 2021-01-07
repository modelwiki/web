import {Schema} from "prosemirror-model"

let modelSchema = new Schema({
  nodes: {
    text: {
      group: "inline",
    },
    input: {
      inline: true,
      group: "inline",
      content: "text*",
      marks: "",
      toDOM() { return ["mw-input", 0] },
      parseDOM: [{tag: "mw-input"}]
    },
    output: {
      inline: true,
      group: "inline",
      content: "text*",
      marks: "",
      toDOM() { return ["mw-output", 0] },
      parseDOM: [{tag: "mw-output"}]
    },
    paragraph: {
      group: "block",
      content: "inline*",
      toDOM() { return ["p", 0] },
      parseDOM: [{tag: "p"}]
    },
    subheading: {
      defining: true,
      group: "block",
      content: "inline*",
      toDOM() { return ["h2", 0] },
      parseDOM: [{tag: "h2,h3,h4,h5,h6"}]
    },
    title: {
      defining: true,
      content: "text*",
      marks: "",
      toDOM() { return ["h1", 0] },
      parseDOM: [{tag: "h1"}]
    },
    doc: {
      content: "title block*"
    }
  },
  marks: {
    bold: {
      toDOM() { return ["b", 0] },
      parseDOM: [{tag: "b"}]
    },
    italic: {
      toDOM() { return ["i", 0] },
      parseDOM: [{tag: "i"}]
    },
    link: {
      attrs: {href: {}},
      toDOM(node) { return ["a", {href: node.attrs.href}, 0] },
      parseDOM: [{tag: "a", getAttrs(dom) { return {href: dom instanceof HTMLAnchorElement ? dom.href : false}}}],
      inclusive: false
    }
  }
});

export default modelSchema;
