import React, { useRef, useState } from "react";
import "./index.css";

interface IProps {
  value: string;
  onChange: (text: string) => void;
  label: string;
  labelActiveColor?: string;
  labelDeActiveColor?: string;
  borderActiveColor?: string;
  borderDeActiveColor?: string;
  style?: React.CSSProperties | undefined;
}

const FloatLabelTextField: React.FC<IProps> = ({
  value = "",
  onChange,
  style,
  labelActiveColor = "blue",
  borderActiveColor = "dodgerblue",
  labelDeActiveColor,
  borderDeActiveColor,
  label,
}) => {
  const [isFocused, setFocused] = useState(false);
  const [text, setText] = useState(value);

  const inputRef = useRef<any | undefined>(undefined);

  const onFocus = (e: any) => {
    if (e.currentTarget === e.target) {
      setFocused(true);
    }
  };
  const onBlur = (e: any) => {
    if (e.currentTarget === e.target) {
      setFocused(false);
    }
  };

  const handleTextChanged = (e: any) => {
    setText(e.target.value);
    onChange(e.target.value);
  };

  const handleParentClick = () => inputRef.current?.focus();

  const isLabelTop = isFocused || text.length > 0;
  return (
    <div
      onClick={handleParentClick}
      className="float-container"
      style={{
        borderColor: isFocused ? borderActiveColor : borderDeActiveColor,
        width: "100%",
        ...style,
      }}
    >
      <label
        className="float-label"
        style={{
          top: isLabelTop ? 0 : "50%",
          transform: isLabelTop
            ? `translate(8px, -50%) scale(0.75)`
            : `translate(0, -50%) scale(1)`,
          color: isFocused ? labelActiveColor : labelDeActiveColor,
          backgroundColor: isLabelTop ? "white" : "transparent",
        }}
      >
        {label}
      </label>
      <div className="float-input-container">
        <input
          ref={inputRef}
          className="float-input"
          value={value}
          onChange={handleTextChanged}
          onFocus={onFocus}
          onBlur={onBlur}
          type="text"
        />
      </div>
    </div>
  );
};

export default FloatLabelTextField;
