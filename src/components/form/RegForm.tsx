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
  position: number;
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

    if (watch(field)) {
      await trigger(field);
    }
  };

  const onSelect = (id: number) => {
    setValue("position", id);
    clearErrors("position");
  };

  return (
    <form className="form container">
      <h1 className="user-list__title">Working with POST request</h1>
      <div className="form__inputs">
        <Input
          type="text"
          id="name"
          error={errors.name}
          placeholder="Your name"
          register={register("name", {
            required: "Name is required",
            pattern: {
              value:
                /^[a-zA-Zа-яА-Я]{2,}(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
              message: "The name must be at least 2 characters.",
            },
            onChange: createOnChange("name"),
            onBlur: createOnBlur("name"),
          })}
          value={watch("name")}
        />
        <Input
          type="text"
          id="email"
          error={errors.email}
          placeholder="Email"
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email format",
            },
            onChange: createOnChange("email"),
            onBlur: createOnBlur("email"),
          })}
          value={watch("email")}
        />
        <Input
          type="text"
          id="phone"
          error={errors.phone}
          placeholder="Phone"
          register={register("phone", {
            required: "Phone is required",
            pattern: {
              value: /^\+380\d{9}$/,
              message: "Invalid phone format",
            },
            onChange: createOnChange("phone"),
            onBlur: createOnBlur("phone"),
          })}
          value={watch("phone")}
          helperMessage="+38 (XXX) XXX - XX - XX"
        />
        <SelectPosition onSelect={onSelect} value={watch("position")} />

        <input type="file" accept="image/jpeg, image/jpg" />
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
