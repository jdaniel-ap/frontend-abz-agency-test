import React, { useRef, useState } from "react";
import { Button } from "@/ui/atoms";
import styles from "./FileInput.module.scss";
import { useTranslation } from "react-i18next";

interface FileInputProps {
  accept?: string;
  error?: string;
  onChange?: (file: File | null) => void;
  required?: boolean;
  id?: string;
}

const LIMIT_CHARS = 25;

function FileInput({
  accept = "image/jpeg,image/jpg,.jpg,.jpeg",
  error,
  onChange,
  required = false,
  id = "photo-upload",
}: FileInputProps) {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file && !file.type.includes("jpeg") && !file.type.includes("jpg")) {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setSelectedFile(file);
    onChange?.(file);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.inputGroup} ${error ? styles.error : ""}`}
        onClick={handleButtonClick}
        style={{ cursor: "pointer" }}
      >
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleButtonClick();
          }}
          className={styles.button}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          {t("form.uploadButton")}
        </Button>
        <div className={styles.fileName}>
          {selectedFile
            ? selectedFile.name.slice(0, LIMIT_CHARS)
            : t("form.uploadPlaceholder")}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className={styles.hiddenInput}
          required={required}
          id={id}
          aria-label={t("form.uploadAriaLabel")}
        />
      </div>
      {error && (
        <div className={styles.errorText} id={`${id}-error`} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default FileInput;
