import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading, Button, RadioButton, FileInput, Spinner } from "@/ui/atoms";
import { SuccessMessage, PhoneInput } from "@/ui/molecules";
import styles from "./Form.module.scss";
import Input from "@/ui/atoms/Input";
import { usePositions, useRegisterUser } from "@/hooks/useApi";
import {
  userRegistrationSchema,
  type UserRegistrationForm,
} from "@/schemas/userRegistration";
import { useTranslation } from "react-i18next";
import { useUsersStore } from "@/stores";

function Signup() {
  const { t } = useTranslation();
  const [sentSuccess, setSentSuccess] = useState(false);
  const { data: positionsData, isLoading: positionsLoading } = usePositions();
  const registerUser = useRegisterUser();
  const { resetToPageOne } = useUsersStore();

  const form = useForm({
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
      await resetToPageOne();
    } catch (error: unknown) {
      console.error(t("errors.registrationFailed"), error);
    }
  };

  if (positionsLoading) {
    return (
      <div className={styles.container}>
        <Heading>{t("form.title")}</Heading>
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} id="signup">
      {sentSuccess ? (
        <SuccessMessage />
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Heading>{t("form.title")}</Heading>
          <div className={styles.fields}>
            <Input
              label={t("form.nameLabel")}
              {...form.register("name")}
              error={errors.name?.message}
            />
            <Input
              label={t("form.emailLabel")}
              {...form.register("email")}
              error={errors.email?.message}
            />
            <PhoneInput
              label={t("form.phoneLabel")}
              value={form.watch("phone")}
              onChange={(cleanPhone) =>
                form.setValue("phone", cleanPhone, { shouldValidate: true })
              }
              helperText={t("form.phoneHelper")}
              error={errors.phone?.message}
              required
            />

            <fieldset className={styles.positionsSection}>
              <legend className={styles.sectionTitle}>
                {t("form.positionTitle")}
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
              onChange={(file) =>
                form.setValue("photo", file as File, { shouldValidate: true })
              }
              error={errors.photo?.message}
            />

            <div className={styles.actions}>
              <Button disabled={isSubmitActionDisabled} type="submit">
                {registerUser.isPending
                  ? t("form.submitting")
                  : t("form.submitButton")}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default Signup;
