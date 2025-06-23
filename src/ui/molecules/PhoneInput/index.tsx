import React from "react";
import { Input } from "@/ui/atoms";

interface PhoneInputProps {
  label: string;
  value?: string;
  onChange?: (cleanPhone: string) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  id?: string;
}

function PhoneInput({
  label,
  value = "",
  onChange,
  error,
  helperText,
  required = false,
  id,
}: PhoneInputProps) {
  // Format phone for display: +380 XX XXX XX XX
  const formatPhoneDisplay = (phone: string): string => {
    const cleaned = phone.replace(/[^\d+]/g, "");

    let formatted = cleaned;
    if (!formatted.startsWith("+380")) {
      formatted = "+380" + formatted.replace(/^\+?380?/, "");
    }

    // Apply mask: +380 XX XXX XX XX
    const digits = formatted.slice(4);
    if (digits.length <= 2) {
      return `+380 ${digits}`;
    } else if (digits.length <= 5) {
      return `+380 ${digits.slice(0, 2)} ${digits.slice(2)}`;
    } else if (digits.length <= 7) {
      return `+380 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
        5
      )}`;
    } else {
      return `+380 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
        5,
        7
      )} ${digits.slice(7, 9)}`;
    }
  };

  const cleanPhoneForSubmission = (phone: string): string => {
    const cleaned = phone.replace(/[^\d+]/g, "");
    if (cleaned.startsWith("+380")) {
      return cleaned.slice(0, 13);
    }
    return "+380" + cleaned.replace(/^\+?380?/, "").slice(0, 9);
  };

  const displayValue = value ? formatPhoneDisplay(value) : "+380 ";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (!inputValue.startsWith("+380")) {
      return;
    }

    const cleanValue = cleanPhoneForSubmission(inputValue);
    onChange?.(cleanValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent deletion of +380 prefix
    const input = e.target as HTMLInputElement;
    const cursorPosition = input.selectionStart || 0;

    if ((e.key === "Backspace" || e.key === "Delete") && cursorPosition <= 4) {
      e.preventDefault();
    }
  };

  return (
    <Input
      label={label}
      type="text"
      value={displayValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      error={error}
      helperText={helperText}
      required={required}
      id={id}
      placeholder="+380 XX XXX XX XX"
    />
  );
}

export default PhoneInput;
