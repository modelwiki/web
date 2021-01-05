import {Plugin} from "prosemirror-state"
import {toggleMark, setBlockType, wrapIn} from "prosemirror-commands"
import {schema} from "prosemirror-schema-basic"

class MenuView {
  constructor(items, editorView) {
    this.items = items
    this.editorView = editorView

    this.dom = document.createElement("div")
    this.dom.className = "RichTextEditor-menu"
    items.forEach(({dom}) => this.dom.appendChild(dom))
    this.update()

    this.dom.addEventListener("mousedown", e => {
      e.preventDefault()
      editorView.focus()
      items.forEach(({command, dom}) => {
        if (dom.contains(e.target))
          command(editorView.state, editorView.dispatch, editorView)
      })
    })
  }

  update() {
    this.items.forEach(({command, dom}) => {
      let active = command(this.editorView.state, null, this.editorView)
      dom.style.display = active ? "" : "none"
    })
  }

  destroy() { this.dom.remove() }
}

function menuPlugin(items) {
  return new Plugin({
    view(editorView) {
      let menuView = new MenuView(items, editorView)
      editorView.dom.parentNode.insertBefore(menuView.dom, editorView.dom)
      return menuView
    }
  })
}

// Helper function to create menu icons
function icon(text, name) {
  let span = document.createElement("span")
  span.className = "RichTextEditor-menu-item " + name
  span.title = name
  span.textContent = text
  return span
}

// Create an icon for a heading at the given level
function heading(level) {
  return {
    command: setBlockType(schema.nodes.heading, {level}),
    dom: icon("H" + level, "heading")
  }
}

export default menuPlugin([
  {command: toggleMark(schema.marks.strong), dom: icon("B", "b")},
  {command: toggleMark(schema.marks.em), dom: icon("I", "i")},
  //{command: setBlockType(schema.nodes.paragraph), dom: icon("p", "paragraph")},
  //heading(1), heading(2), heading(3),
  //{command: wrapIn(schema.nodes.blockquote), dom: icon(">", "blockquote")}
])
