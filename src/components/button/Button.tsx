import "./Button.scss";

export const Button = ({
  text,
  onClick,
  type,
  isDisabled,
}: {
  text: string;
  onClick: () => void;
  type: "button" | "submit";
  isDisabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${isDisabled ? "disabled" : "normal"}`}
    >
      {text}
    </button>
  );
};
