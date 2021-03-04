import { format } from 'path';
import React from 'react';
import "./RichTextEditor.css"
import {Descriptor} from "../data/types"
import InputVariable from "./InputVariable"

function RichTextViewer(props: {
  richText: any, 
  code: string, 
  descriptorCode: string, 
  readOnly: boolean, 
  onChangeCode: (code: string) => void,
  onChangeDescriptorCode: (code: string) => void,
}) {

  const [inputValues, setInputValues] = React.useState(new Map<string, number>());

  let descriptors = new Map<string, Descriptor>();
  try {
    const codeFunction = React.useMemo(() => new Function(props.descriptorCode), [props.descriptorCode]);
    const codeOutputs = codeFunction();
    const entries = Object.entries(codeOutputs ?? {});
    function process(pair: [string, any]): [string, Descriptor] {
      const [variable, descriptor] = pair;
      return [variable, processDescriptor(descriptor)];
    }
    descriptors = new Map([...entries.map(process)]);
  } catch(e) {
    console.log(e?.message ?? e);
  }

  let outputValues = new Map<string, number>();
  try {
    const codeFunction = React.useMemo(() => new Function('inputs', props.code), [props.code]);
    function process(pair: [string, Descriptor]): [string, number] {
      const [variable, descriptor] = pair;
      return [variable, descriptor.defaultValue];
    }
    const defaults = Object.entries({...Object.fromEntries(descriptors)}).map(process);
    const codeOutputs = codeFunction({...Object.fromEntries(defaults), ...Object.fromEntries(inputValues)});
    outputValues = new Map([...Object.entries(codeOutputs ?? {})]) as Map<string, number>;
  } catch(e) {
    console.log(e?.message ?? e);
  }

  const html = props.richText.doc.content.map((block: any, blockIndex: number) => {

    const content = block.content?.map((span: any, spanIndex: number) => {
      if(span.marks?.[0]?.type === 'input') {
        const descriptor = descriptors.get(span.text) ?? processDescriptor({});
        const value = inputValues.get(span.text) ?? descriptor.defaultValue;
        const text = formatValue(value, descriptor);
        return <span key={spanIndex}>
          <InputVariable 
            value={value} 
            text={text} 
            descriptor={descriptor} 
            onChange={newValue => setInputValues(new Map([...inputValues, [span.text, newValue]]))} />
        </span>;
      } else if(span.marks?.[0]?.type === 'output') {
        const descriptor = descriptors.get(span.text) ?? processDescriptor({});
        const value = outputValues.get(span.text) ?? descriptor.defaultValue;
        const text = formatValue(value, descriptor);
        return <span className="mw-output" key={spanIndex}>{"" + text}</span>;
      } else {
        return <span key={spanIndex}>{span.text}</span>;
      }
    }) ?? [];

    return block.type === 'title' ? <h1 key={blockIndex}>{content}</h1> : <p key={blockIndex}>{content}</p>;

  });

  return (
    <div style={{height: "100%"}} className="RichTextEditor">
      <div style={{height: "100%"}}>
        {html}
        <textarea 
          readOnly={props.readOnly} 
          value={props.code} 
          onChange={e => props.onChangeCode(e.target.value)} 
          style={{marginTop: "100px", width: "90%", height: "150px", fontWeight: "bold"}} />
        <textarea 
          readOnly={props.readOnly} 
          value={props.descriptorCode} 
          onChange={e => props.onChangeDescriptorCode(e.target.value)} 
          style={{marginTop: "50px", width: "90%", height: "150px", fontWeight: "bold"}} />
      </div>
    </div>
  );

}

function processDescriptor(o: any): Descriptor {
  const defaultValue = o.defaultValue ?? 0;
  const min = o.min ?? 0;
  const max = o.max ?? 100;
  const step = o.step ?? 1;
  const prefix = o.prefix ?? '';
  const suffix = o.suffix ?? '';
  const thousands = o.thousands || 'comma';
  return {defaultValue, min, max, step, prefix, suffix, thousands};
}

function formatValue(value: number, descriptor: Descriptor): string {
  return (descriptor.prefix ?? '') + value + (descriptor.suffix ?? '');
}

export default RichTextViewer;
