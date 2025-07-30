/* eslint-disable */

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  RefObject,
} from "react";
import Quill from "quill";
const Delta = Quill.import("delta");

type Props = {
  readOnly: boolean;
  defaultValue: any;
  onTextChange: (...args: any[]) => void;
  onSelectionChange: (...args: any[]) => void;
  ref: RefObject<Quill | null>;
};

// Editor is an uncontrolled React component
function EditorContainer({
  readOnly,
  defaultValue,
  onTextChange,
  onSelectionChange,
  ref,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const onTextChangeRef = useRef(onTextChange);
  const onSelectionChangeRef = useRef(onSelectionChange);

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
    onSelectionChangeRef.current = onSelectionChange;
  });

  useEffect(() => {
    ref.current?.enable(!readOnly);
  }, [ref, readOnly]);

  useEffect(() => {
    const container = containerRef.current!;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div"),
    );
    const quill = new Quill(editorContainer, {
      theme: "snow",
    });

    ref.current = quill;

    if (defaultValueRef.current) {
      quill.setContents(defaultValueRef.current);
    }

    quill.on(Quill.events.TEXT_CHANGE, (...args) => {
      onTextChangeRef.current?.(...args);
    });

    quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
      onSelectionChangeRef.current?.(...args);
    });

    return () => {
      ref.current = null;
      container.innerHTML = "";
    };
  }, [ref]);

  return <div ref={containerRef}></div>;
}

EditorContainer.displayName = "Editor";

const Editor = () => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const quillRef = useRef<Quill | null>(null);

  return (
    <div>
      <EditorContainer
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={new Delta()
          .insert("Hello")
          .insert("\n", { header: 1 })
          .insert("Some ")
          .insert("initial", { bold: true })
          .insert(" ")
          .insert("content", { underline: true })
          .insert("\n")}
        onSelectionChange={setRange}
        onTextChange={setLastChange}
      />
    </div>
  );
};

export default Editor;
