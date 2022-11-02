import { ChangeEvent } from "react";
import { Container } from "../LayoutComponents";

interface Props {
  min: number;
  max: number;
  children?: React.ReactNode;
  text?: string;
  value?: number | string;
  onMouseDown?: () => void;
  onMouseUp?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
function InputControls({
  value,
  text,
  onMouseDown,
  onMouseUp,
  onChange,
  min,
  max,
}: Props) {
  return (
    <Container className="button button--controls">
      <label htmlFor={`range-input-${text}`}>{text}</label>
      <input
        id={`range-input-${text}`}
        type="range"
        min={min}
        max={max}
        step="any"
        value={value}
        onMouseDown={onMouseDown}
        onChange={onChange}
        onMouseUp={onMouseUp}
      />
    </Container>
  );
}
export default InputControls;
