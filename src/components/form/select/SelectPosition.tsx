import "./SelectPosition.scss";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

const positions = [
  { id: 1, name: "Lawyer" },
  { id: 2, name: "Content manager" },
  { id: 3, name: "Security" },
  { id: 4, name: "Designer" },
];

export const SelectPosition = ({
  onSelect,
  value,
  register,
  error,
}: {
  onSelect: (id: number) => void;
  value: number;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
}) => {
  return (
    <div>
      <p>Select your position</p>
      <div className="select-button-container">
        {positions.map((position) => (
          <button
            key={position.id}
            type="button"
            onClick={() => onSelect(position.id)}
            className="select-button"
          >
            <span
              className={`select-button__icon ${
                value === position.id ? "active" : ""
              }`}
            />
            {position.name}
          </button>
        ))}
      </div>
      {error && <p className="select-error-message">{error.message}</p>}
    </div>
  );
};
