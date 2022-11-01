interface Props {
  text: string;
  max: number;
  value: number;
}

function ProgressBar({ text, value, max }: Props) {
  return (
    <div className="button button--text">
      <span>{text}</span>
      <progress max={max} value={value} />
    </div>
  );
}

export default ProgressBar;
