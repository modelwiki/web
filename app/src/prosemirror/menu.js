import {Plugin} from "prosemirror-state"
import {toggleMark, setBlockType} from "prosemirror-commands"
import { wrapInList } from 'prosemirror-schema-list';
import schema from "./schema"

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
        if (dom.contains(e.target)) {
          const effect = command(true)
          if (effect) {
            effect(editorView.state, editorView.dispatch, editorView)
          }
        }
      })
    })
  }

  update() {
    this.items.forEach(({command, dom}) => {
      let active = command(false)(this.editorView.state, null, this.editorView)
      dom.className = "RichTextEditor-menu-item " + (active ? "RichTextEditor-menu-item-active " : "")
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
  span.className = "RichTextEditor-menu-item "
  span.title = name
  span.textContent = text
  return span
}

// Create an icon for a heading at the given level
function heading(level) {
  return {
    command: () => setBlockType(schema.nodes.heading, {level}),
    dom: icon("H" + level, "heading")
  }
}

function toggleLink(clicked) {
  function inner(state, dispatch) {
    let {doc, selection} = state
    if (selection.empty) return false

    let attrs = null

    if (clicked && !doc.rangeHasMark(selection.from, selection.to, schema.marks.link)) {
      attrs = {href: prompt("Link to where?", "")}
      try {
        new URL(attrs.href)
      } catch {
        return false
      }
    }

    return toggleMark(schema.marks.link, attrs)(state, dispatch)
  }
  return inner
}

function insertSpacer(clicked) {
  function inner(state, dispatch) {
    if (clicked) {
      return dispatch(state.tr.replaceSelectionWith(schema.node("hr")))
    }
    return true
  }
  return inner
}

function insertTable(clicked) {
  function inner(state, dispatch) {
    if (clicked) {
      let rowCount = 2
      let colCount = 2

      const cells = []
      while (colCount--) {
        cells.push(schema.nodes.table_cell.createAndFill())
      }
      const rows = []
      while (rowCount--) {
        rows.push(schema.nodes.table_row.createAndFill(null, cells))
      }

      const table = schema.nodes.table.createAndFill(null, rows)
      return dispatch(state.tr.replaceSelectionWith(table))
    } else {
      return true
    }
  }
  return inner
}


export default menuPlugin([
  {command: () => toggleMark(schema.marks.bold), dom: icon("B", "bold")},
  {command: () => toggleMark(schema.marks.italic), dom: icon("I", "italic")},
  {command: () => setBlockType(schema.nodes.subheading), dom: icon("H", "subheading")},
  {command: () => toggleMark(schema.marks.input), dom: icon("x", "input")},
  {command: () => toggleMark(schema.marks.output), dom: icon("f", "output")},
  {command: (clicked) => toggleLink(clicked), dom: icon("://", "link")},
  {command: (clicked) => insertSpacer(clicked), dom: icon("-", "spacer")},
  {command: () => wrapInList(schema.nodes.ordered_list), dom: icon("1.", "Wrap in ordered list")},
  {command: () => wrapInList(schema.nodes.bullet_list), dom: icon("*", "Wrap in bullet list")},
  {command: (clicked) => insertTable(clicked), dom: icon("T", "Insert table")},
])

export { toggleLink }