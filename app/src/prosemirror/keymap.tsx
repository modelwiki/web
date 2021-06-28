import {toggleMark} from "prosemirror-commands"
import {keymap} from "prosemirror-keymap"
import modelSchema from "./schema"
import { toggleLink } from "./menu";
import { splitListItem } from "prosemirror-schema-list";
import { goToNextCell } from "prosemirror-tables";

let modelKeymap = keymap({
  "Ctrl-b": toggleMark(modelSchema.marks.bold),
  "Ctrl-i": toggleMark(modelSchema.marks.italic),
  "Ctrl-k": toggleLink(true),
  Enter: splitListItem(modelSchema.nodes.list_item),
  "Tab": goToNextCell(1),
  "Shift-Tab": goToNextCell(-1)
});

export default modelKeymap;
