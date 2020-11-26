import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {Schema, DOMParser} from "prosemirror-model"
import {schema} from "prosemirror-schema-basic"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"
import {variableNodeSpec} from "./variable-node"
import {variablePlugin} from "./variable-decoration"

const listSchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks
})

const mainSchema = new Schema({
  nodes: listSchema.spec.nodes.addBefore("image", "variable", variableNodeSpec),
  marks: listSchema.spec.marks
})

window.view = new EditorView(document.querySelector("#editor"), {
  state: EditorState.create({
    doc: DOMParser.fromSchema(mainSchema).parse(document.querySelector("#content")),
    plugins: exampleSetup({schema: mainSchema}).concat([/*variablePlugin*/])
  })
})
