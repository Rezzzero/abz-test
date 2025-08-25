import { useState } from "react";
import "../../styles/_globals.scss";
import { Button } from "../button/Button";
import "./RegForm.scss";
import { useForm } from "react-hook-form";
import { initialNewUserBlur } from "./states/user";
import { Input } from "./input/Input";
import { SelectPosition } from "./select/SelectPosition";
import { FileInput } from "./file-input/FileInput";
import axios from "axios";
import type { NewUser } from "../list/types";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  position_id: number;
  photo: FileList | null;
};

export const RegForm = () => {
  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    watch,
    control,
    reset,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });
  const [newUserBlur, setNewUserBlur] = useState(initialNewUserBlur);

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
    setValue("position_id", id);
    clearErrors("position_id");
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("position_id", String(data.position_id));
    if (data.photo?.[0]) {
      formData.append("photo", data.photo[0]);
    }

    try {
      const tokenRes = await axios.post(
        "https://frontend-test-assignment-api.abz.agency/api/v1/token"
      );
      const newToken = tokenRes.data.token;

      const response = await axios.post(
        "https://frontend-test-assignment-api.abz.agency/api/v1/users",
        formData,
        {
          headers: {
            Token: `${newToken}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      reset({
        name: "",
        email: "",
        phone: "",
        position_id: 0,
        photo: null,
      });
      setNewUserBlur(initialNewUserBlur);
      clearErrors();
    }
  };

  return (
    <form className="form container" onSubmit={handleSubmit(onSubmit)}>
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
        <SelectPosition
          onSelect={onSelect}
          value={watch("position_id")}
          register={register("position_id", {
            required: "Position is required",
          })}
          error={errors.position_id}
        />
        <FileInput
          register={register("photo", {
            required: "Photo is required",
            validate: {
              lessThan5MB: (files) =>
                !files ||
                files[0]?.size < 5 * 1024 * 1024 ||
                "File size must be < 5MB",
              isJpg: (files) =>
                !files ||
                ["image/jpeg", "image/jpg"].includes(files[0]?.type) ||
                "Only JPG/JPEG allowed",
            },
          })}
          fileValue={watch("photo")}
          error={errors.photo}
        />
      </div>
      <Button text="Sign up" isDisabled={!isValid} type="submit" />
    </form>
  );
};
