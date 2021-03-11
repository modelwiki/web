import React from 'react';
import {Descriptor} from "../data/types"

function InputVariable(props: {value: number, text: string, descriptor: Descriptor, onChange: (value: number) => void}) {

  const [sliding, setSliding] = React.useState<null | {initialValue: number, initialX: number}>(null);

  function onMouseDown(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    if(event.buttons !== 1) return;
    event.preventDefault();
    setSliding({initialValue: props.value, initialX: event.pageX});
  }

  function onMouseMove(event: MouseEvent) {
    event.preventDefault();
    if(event.buttons !== 1 || sliding === null) {
        setSliding(null);
    } else {
        const steps = event.pageX - sliding.initialX;
        const val = sliding.initialValue + props.descriptor.step * steps;
        props.onChange(Math.max(props.descriptor.min, Math.min(val, props.descriptor.max)));
    }
  }

  React.useEffect(() => {
    if(sliding) {
        document.addEventListener("mousemove", onMouseMove);
        document.body.style.cursor = 'ew-resize';
        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.body.style.cursor = '';
        }
    }
  });

  return (
    <span className="mw-input" onMouseDown={onMouseDown}>{props.text}</span>
  );

}

export default InputVariable;
