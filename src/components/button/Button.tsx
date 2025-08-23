import "./Button.scss";

export const Button = ({
  text,
  onClick,
  type,
  isDisabled,
}: {
  text: string;
  onClick?: () => void;
  type: "button" | "submit";
  isDisabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      className={`button ${isDisabled ? "disabled" : "normal"}`}
    >
      {text}
    </button>
  );
};
