import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  type: string;
  id: string;
  error: FieldError | undefined;
  placeholder: string;
  register: UseFormRegisterReturn;
};

export const Input = ({
  type,
  id,
  error,
  placeholder,
  register,
}: InputProps) => {
  return <input type="text" />;
};
