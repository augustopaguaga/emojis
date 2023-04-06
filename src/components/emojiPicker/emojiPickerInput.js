import { useRef, useState, useEffect } from "react";
import EmojiPickerDiv from "./emojiPickerDiv";

export default function EmojiPickerInput() {
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(0);

  function handleChange(e) {
    const value = e.target.value;
    setText(value);
  }

  function handleClick() {
    setVisible(!visible);
  }

  function updateInputValue(emoji) {
    const cursorPos = inputRef.current.selectionStart;
    const text = inputRef.current.value;
    const prev = text.slice(0, cursorPos);
    const next = text.slice(cursorPos);

    inputRef.current.value = prev + emoji + next;

    inputRef.current.selectionStart = cursorPos + emoji.length;
    inputRef.current.selectionEnd = cursorPos + emoji.length;

    inputRef.current.focus();
  }

  function handleBlur() {
    inputRef.current.selectionStart = inputRef.current.value.length;
  }

  useEffect(() => {
    setCursorPosition(inputRef.current.selectionStart);
  }, []);

  return (
    <div>
      <div>
        <input
          type="text"
          ref={inputRef}
          onBlur={handleBlur}
          onChange={handleChange}
          value={text}
        />
        <button onClick={handleClick}>😊</button>
      </div>
      <div style={visible ? { display: "block" } : { display: "none" }}>
        <EmojiPickerDiv updateInputValue={updateInputValue} />
      </div>
    </div>
  );
}
