import { useEffect, useState } from "react";
import { Data as datos } from "./data.js";

export default function EmojiPickerDiv({ updateInputValue }) {
  const [data, setData] = useState(datos);
  const [text, setText] = useState("");

  function handleChange(e) {
    const texto = e.target.value;
    setText(texto);
    if (!!texto) {
      const search = datos.filter((emojis) => {
        return (
          emojis.keywords.toLowerCase().includes(texto) ||
          emojis.name.toLowerCase().includes(texto)
        );
      });
      setData(search);
    } else {
      setData(datos);
    }
  }

  function handleClick(emoji) {
    updateInputValue(emoji);
  }

  return (
    <div>
      <div>
        <input type="text" onChange={handleChange}></input>
      </div>
      {data?.map((item) => {
        const emoji = item.symbol;
        return (
          <div onClick={() => handleClick(emoji)}>
            <label>{item.symbol}</label>
          </div>
        );
      })}
    </div>
  );
}
