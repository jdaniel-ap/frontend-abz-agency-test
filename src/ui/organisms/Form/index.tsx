import React, { useState } from "react";
import { Heading, Button, RadioButton, FileInput } from "@/ui/atoms";
import styles from "./Form.module.scss";
import Input from "@/ui/atoms/Input";
import { usePositions } from "@/hooks/useApi";
import type { UserRegistrationRequest } from "@/types/api";

function Form() {
  const { data: positionsData, isLoading } = usePositions();
  const [formData, setFormData] = useState<Partial<UserRegistrationRequest>>({
    name: "",
    email: "",
    phone: "",
    position_id: undefined,
    photo: undefined,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange =
    (field: keyof UserRegistrationRequest) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }
    };

  const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      position_id: parseInt(event.target.value),
    }));
    if (errors.position_id) {
      setErrors((prev) => ({
        ...prev,
        position_id: "",
      }));
    }
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      photo: file || undefined,
    }));
    if (errors.photo) {
      setErrors((prev) => ({
        ...prev,
        photo: "",
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement form submission
    console.log("Form submitted:", formData);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Heading>Working with POST request</Heading>
        <div>Loading positions...</div>
      </div>
    );
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Heading>Working with POST request</Heading>
      <div className={styles.fields}>
        <Input
          label="Your name"
          name="name"
          value={formData.name}
          onChange={handleInputChange("name")}
          error={errors.name}
          required
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange("email")}
          error={errors.email}
          required
        />
        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange("phone")}
          helperText="+38 (XXX) XXX - XX - XX"
          error={errors.phone}
          required
        />

        <div className={styles.positionsSection}>
          <h3 className={styles.sectionTitle}>Select your position</h3>
          <div className={styles.positions}>
            {positionsData?.positions?.map((position) => (
              <RadioButton
                key={position.id}
                name="position_id"
                value={position.id.toString()}
                label={position.name}
                checked={formData.position_id === position.id}
                onChange={handlePositionChange}
              />
            ))}
          </div>
          {errors.position_id && (
            <div className={styles.errorText}>{errors.position_id}</div>
          )}
        </div>

        <FileInput onChange={handleFileChange} error={errors.photo} required />

        <div className={styles.actions}>
          <Button disabled type="submit">
            Sign up
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Form;
