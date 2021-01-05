import React from 'react';
import {keymap} from "prosemirror-keymap"
import {history, undo, redo} from "prosemirror-history"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {baseKeymap} from "prosemirror-commands"
import modelKeymap from "../prosemirror/keymap"
import modelSchema from "../prosemirror/schema"
import modelUpdate from "../prosemirror/update"
import menu from "../prosemirror/menu"
import "./RichTextEditor.css"
import "prosemirror-view/style/prosemirror.css"

const historyKeymap = keymap({"Mod-z": undo, "Mod-Shift-z": redo, "Mod-y": redo})

function initializeProseMirror(place: Node, callback: (richText: any) => void, richText: any) {
  const configuration = {
    schema: modelSchema,
    plugins: [menu, modelUpdate(callback), modelKeymap, historyKeymap, keymap(baseKeymap), history()]
  };
  return new EditorView(place, {
    state: richText == null ? EditorState.create(configuration) : EditorState.fromJSON(configuration, richText)
  })
}

function RichTextEditor(props: {selectedIndex: number|null, initialRichText: any, onChange: (richText: any) => void}) {
  const editorElement = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const editor = editorElement.current;
    if(editor != null) {
      const editorView = initializeProseMirror(editor, props.onChange, props.initialRichText);
      return () => editorView.destroy()
    }
  }, [props.selectedIndex]);
  return (
    <div style={{height: "100%"}} className="RichTextEditor">
      <div ref={editorElement} style={{height: "100%"}}></div>
    </div>
  );
}

export default RichTextEditor;
