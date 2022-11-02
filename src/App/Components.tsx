import { ChangeEvent } from "react";
import { BaseReactPlayerProps } from "react-player/base";

interface InputPropsType {
  labelText?: string;
  state?: BaseReactPlayerProps;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ state, onChange }: InputPropsType) => (
  <div className="button button--controls url-input-container">
    <label htmlFor="urlInput">
      <strong>paste url to change video: </strong>
    </label>
    <input
      id="urlInput"
      type="text"
      onChange={onChange}
      value={state?.url as string}
    />
  </div>
);

export const FileInput = ({ onChange, labelText }: InputPropsType) => (
  <div className="button button--controls file-input">
    <label htmlFor="fileInput">{labelText}</label>
    <input
      id="fileInput"
      type="file"
      onChange={onChange}
      placeholder={labelText}
    />
  </div>
);
