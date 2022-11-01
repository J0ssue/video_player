interface Props {
  children?: React.ReactNode;
  text?: string;
  value?: number | string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function ButtonControls({ onClick, ...rest }: Props) {
  return (
    <button className="button button--controls" onClick={onClick} {...rest}>
      {(rest.value ? `${rest.value}x` : `${rest.text}`) || rest.children}
    </button>
  );
}
export default ButtonControls;
