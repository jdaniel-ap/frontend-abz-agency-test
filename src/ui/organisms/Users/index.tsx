import { Button, Heading, Spinner } from "@/ui/atoms";
import styles from "./Users.module.scss";
import UserCard from "@/ui/molecules/UserCard";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUsersStore } from "@/stores";

function Users() {
  const { t } = useTranslation();

  const { users, isLoading, error, hasNextPage, loadUsers, loadMoreUsers } =
    useUsersStore();

  const handleLoadMore = () => {
    loadMoreUsers();
  };

  useEffect(() => {
    if (users.length === 0) {
      loadUsers(1);
    }
  }, [users.length, loadUsers]);

  if (error) {
    return (
      <section className={styles.container}>
        <Heading>{t("users.title")}</Heading>
        <div className={styles.users}>
          <div>
            {t("users.errorLoading")} {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container} id="users">
      <Heading>{t("users.title")}</Heading>
      {!isLoading && users.length === 0 && (
        <div className={styles.users}>{t("users.noUsers")}</div>
      )}
      <div className={styles.users}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      {isLoading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : hasNextPage ? (
        <Button onClick={handleLoadMore}>{t("users.loadMore")}</Button>
      ) : null}
    </section>
  );
}

export default Users;
