import "./Input.scss";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  type: string;
  id: string;
  error: FieldError | undefined;
  placeholder: string;
  register: UseFormRegisterReturn;
  value: string;
  helperMessage?: string;
};

export const Input = ({
  type,
  id,
  error,
  placeholder,
  register,
  value,
  helperMessage,
}: InputProps) => {
  const isInputEmpty = value === "";
  return (
    <div className="input__container">
      <label
        htmlFor={id}
        className={`input__label ${error ? "input__label--error" : ""} ${
          isInputEmpty ? "" : "input__label--active"
        }`}
      >
        {placeholder}
      </label>
      <input
        type={type}
        id={id}
        autoComplete="off"
        {...register}
        className={`input ${error ? "input__error" : ""}`}
      />
      <span className="input__message-container">
        {error && <p className="input__error-message">{error.message}</p>}
        {helperMessage && !error && (
          <p className="input__helper-message">{helperMessage}</p>
        )}
      </span>
    </div>
  );
};
