import "./FileInput.scss";
import { useEffect, useRef, useState } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { truncateText } from "../../../utils/text/truncateText";

type FileInputProps = {
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
  fileValue?: FileList | null;
};

export const FileInput = ({ register, error, fileValue }: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const { onChange, onBlur, name, ref } = register;

  useEffect(() => {
    if (!fileValue || fileValue.length === 0) {
      setFileName("");
    } else {
      setFileName(fileValue[0].name);
    }
  }, [fileValue]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        name={name}
        accept="image/jpeg, image/jpg"
        ref={(e) => {
          ref(e);
          fileInputRef.current = e;
        }}
        onChange={(e) => {
          onChange(e);
          const file = e.target.files?.[0];
          setFileName(file ? file.name : "");
        }}
        onBlur={onBlur}
        style={{ display: "none" }}
      />

      <div className="upload-button-container">
        <button
          type="button"
          onClick={handleClick}
          className={`upload-button ${error ? "upload-button-error" : ""}`}
        >
          Upload
        </button>

        <p className={`upload-text ${error ? "upload-text-error" : ""}`}>
          {truncateText(fileName, 20) || "Upload your photo"}
        </p>
      </div>
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
};
