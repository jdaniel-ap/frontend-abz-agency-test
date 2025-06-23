import { useState } from "react";
import { Spinner } from "@/ui/atoms";
import { SuccessMessage } from "@/ui/molecules";
import { RegistrationForm } from "@/ui/organisms";
import styles from "./Signup.module.scss";
import { usePositions } from "@/hooks/useApi";
import { useUsersStore } from "@/stores";

function Signup() {
  const [sentSuccess, setSentSuccess] = useState(false);
  const { isLoading: positionsLoading } = usePositions();
  const { resetToPageOne } = useUsersStore();

  const handleRegistrationSuccess = async () => {
    setSentSuccess(true);
    await resetToPageOne();
  };

  if (positionsLoading) {
    return (
      <div className={styles.container}>
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
        <RegistrationForm onSuccess={handleRegistrationSuccess} />
      )}
    </div>
  );
}

export default Signup;
