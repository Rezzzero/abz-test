import { useState } from "react";
import "../../styles/_globals.scss";
import { Button } from "../button/Button";
import "./RegForm.scss";
import { useForm } from "react-hook-form";
import type { NewUser } from "../list/types";
import { initialNewUserBlur } from "./states/user";
import { Input } from "./input/Input";
import { SelectPosition } from "./select/SelectPosition";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  position: string;
};

export const RegForm = () => {
  const {
    register,
    trigger,
    setValue,
    watch,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();
  const [newUserBlur, setNewUserBlur] = useState(initialNewUserBlur);
  const [isDisabled, setIsDisabled] = useState(true);

  const createOnChange = (field: keyof NewUser) => () => {
    if (newUserBlur[field]) {
      trigger(field);
    }
  };

  const createOnBlur = (field: keyof NewUser) => async () => {
    setNewUserBlur((prev) => ({ ...prev, [field]: true }));

    await trigger(field);
  };

  return (
    <form className="form container">
      <h1 className="user-list__title">Working with GET request</h1>
      <div>
        <Input
          type="text"
          id="name"
          error={errors.name}
          placeholder="Your name"
          register={register("name", {
            required: "Name is required",
            onChange: createOnChange("name"),
            onBlur: createOnBlur("name"),
          })}
        />
        <Input
          type="text"
          id="email"
          error={errors.email}
          placeholder="Your email"
          register={register("email", {
            required: "Email is required",
            onChange: createOnChange("email"),
            onBlur: createOnBlur("email"),
          })}
        />
        <Input
          type="text"
          id="phone"
          error={errors.phone}
          placeholder="Your phone"
          register={register("phone", {
            required: "Phone is required",
            onChange: createOnChange("phone"),
            onBlur: createOnBlur("phone"),
          })}
        />
        <SelectPosition />
      </div>
      <Button
        text="Sign up"
        isDisabled={isDisabled}
        onClick={() => {}}
        type={"submit"}
      />
    </form>
  );
};
