import React, { useRef, useState } from "react";
import { Button } from "@/ui/atoms";
import styles from "./FileInput.module.scss";

interface FileInputProps {
  accept?: string;
  error?: string;
  onChange?: (file: File | null) => void;
  required?: boolean;
  id?: string;
}

const LIMIT_CHARS = 25;

function FileInput({
  accept = "image/*",
  error,
  onChange,
  required = false,
  id = "photo-upload",
}: FileInputProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    onChange?.(file);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <Button
          type="button"
          onClick={handleButtonClick}
          className={styles.button}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          Upload
        </Button>
        <div className={`${styles.fileName} ${error ? styles.error : ""}`}>
          {selectedFile
            ? selectedFile.name.slice(0, LIMIT_CHARS)
            : "Upload your photo"}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className={styles.hiddenInput}
          required={required}
          id={id}
          aria-label="Upload your photo"
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
