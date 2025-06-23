import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading, Button, RadioButton, FileInput, Spinner } from "@/ui/atoms";
import { SuccessMessage } from "@/ui/molecules";
import styles from "./Form.module.scss";
import Input from "@/ui/atoms/Input";
import { usePositions, useRegisterUser } from "@/hooks/useApi";
import {
  userRegistrationSchema,
  type UserRegistrationForm,
} from "@/schemas/userRegistration";

function Form() {
  const [sentSuccess, setSentSuccess] = useState(false);
  const { data: positionsData, isLoading } = usePositions();
  const registerUser = useRegisterUser();
  const form = useForm<UserRegistrationForm>({
    resolver: zodResolver(userRegistrationSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const errors = form.formState.errors;

  const isSubmitActionDisabled =
    registerUser.isPending ||
    Boolean(Object.keys(form.formState.errors).length);

  const watchedPositionId = form.watch("position_id");

  const onSubmit = async (data: UserRegistrationForm) => {
    try {
      await registerUser.mutateAsync(data);
      form.reset();
      setSentSuccess(true);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Heading>Working with POST request</Heading>
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {sentSuccess ? (
        <SuccessMessage />
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Heading>Working with POST request</Heading>
          <div className={styles.fields}>
            <Input
              label="Your name"
              {...form.register("name")}
              error={errors.name?.message}
              required
            />
            <Input
              label="Email"
              type="email"
              {...form.register("email")}
              error={errors.email?.message}
              required
            />
            <Input
              label="Phone"
              {...form.register("phone")}
              helperText="+38 (XXX) XXX - XX - XX"
              error={errors.phone?.message}
              required
            />

            <fieldset className={styles.positionsSection}>
              <legend className={styles.sectionTitle}>
                Select your position
              </legend>
              <div className={styles.positions}>
                {positionsData?.positions?.map((position) => (
                  <RadioButton
                    key={position.id}
                    name="position_id"
                    value={position.id.toString()}
                    label={position.name}
                    checked={watchedPositionId === position.id}
                    onChange={(e) =>
                      form.setValue("position_id", parseInt(e.target.value), {
                        shouldValidate: true,
                      })
                    }
                  />
                ))}
              </div>
              {errors.position_id && (
                <div className={styles.errorText} role="alert">
                  {errors.position_id.message}
                </div>
              )}
            </fieldset>

            <FileInput
              onChange={(file) => form.setValue("photo", file as File)}
              error={errors.photo?.message}
              required
            />

            <div className={styles.actions}>
              <Button disabled={isSubmitActionDisabled} type="submit">
                {registerUser.isPending ? "Signing up..." : "Sign up"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default Form;
