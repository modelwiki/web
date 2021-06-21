import {toggleMark} from "prosemirror-commands"
import {keymap} from "prosemirror-keymap"
import modelSchema from "./schema"
import { toggleLink } from "./menu";
import { splitListItem } from "prosemirror-schema-list";

let modelKeymap = keymap({
  "Ctrl-b": toggleMark(modelSchema.marks.bold),
  "Ctrl-i": toggleMark(modelSchema.marks.italic),
  "Ctrl-k": toggleLink(true),
  Enter: splitListItem(modelSchema.nodes.list_item),
});

export default modelKeymap;
