import { Button, Heading, Spinner } from "@/ui/atoms";
import styles from "./Users.module.scss";
import UserCard from "@/ui/molecules/UserCard";
import { useUsers } from "@/hooks/useApi";
import { useState, useEffect, useCallback } from "react";
import type { User } from "@/types/api";
import { useTranslation } from "react-i18next";

function Users() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const {
    data: usersData,
    isLoading,
    error,
  } = useUsers({
    page: currentPage,
    count: 6,
  });

  const hasNextPage = usersData?.links.next_url !== null;

  const revalidateUsers = useCallback(() => {
    if (usersData?.users) {
      if (currentPage === 1) {
        setAllUsers(usersData.users);
      } else {
        setAllUsers((prev) => [...prev, ...usersData.users]);
      }
    }
  }, [usersData, currentPage]);

  const handleLoadMore = () => {
    if (usersData?.links.next_url) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    revalidateUsers();
  }, [usersData, revalidateUsers]);

  if (error) {
    return (
      <section className={styles.container}>
        <Heading>{t("users.title")}</Heading>
        <div className={styles.users}>
          <div>
            {t("users.errorLoading")} {error.message}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <Heading>{t("users.title")}</Heading>
      {!isLoading && allUsers.length === 0 && (
        <div className={styles.users}>{t("users.noUsers")}</div>
      )}
      <div className={styles.users}>
        {allUsers.map((user) => (
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
