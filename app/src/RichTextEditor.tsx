import React from 'react';
import {keymap} from "prosemirror-keymap"
import {history, undo, redo} from "prosemirror-history"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {baseKeymap} from "prosemirror-commands"
import modelKeymap from "./prosemirror/keymap"
import modelSchema from "./prosemirror/schema"
import modelUpdate from "./prosemirror/update"
import "./RichTextEditor.css"
import "prosemirror-view/style/prosemirror.css"

const historyKeymap = keymap({"Mod-z": undo, "Mod-Shift-z": redo, "Mod-y": redo})

function initializeProseMirror(place: Node, callback: (richText: any) => void, richText: any) {
  return new EditorView(place, {
    state: EditorState.create({
      schema: modelSchema,
      plugins: [modelUpdate(callback), modelKeymap, historyKeymap, keymap(baseKeymap), history()]
    })
  })
}

function RichTextEditor(props: {initialRichText: any, onChange: (richText: any) => void}) {
  const editorElement = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const editor = editorElement.current;
    if(editor != null) {
      const editorView = initializeProseMirror(editor, props.onChange, props.initialRichText);
      return () => editorView.destroy()
    }
  }, [props.onChange, props.initialRichText]);
  return (
    <div style={{height: "100%"}} className="RichTextEditor">
      <div ref={editorElement} style={{height: "100%"}}></div>
    </div>
  );
}

export default RichTextEditor;
