import {toggleMark} from "prosemirror-commands"
import {keymap} from "prosemirror-keymap"
import modelSchema from "./schema"

let modelKeymap = keymap({
  "Ctrl-b": toggleMark(modelSchema.marks.bold),
  "Ctrl-i": toggleMark(modelSchema.marks.italic),
});

export default modelKeymap;
