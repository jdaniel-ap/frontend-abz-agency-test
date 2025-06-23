import styles from "./UserCard.module.scss";
import { Avatar, Text } from "@/ui/atoms";
import { TextWithTooltip } from "@/ui/organisms";
import type { User } from "@/types/api";
import { useTranslation } from "react-i18next";

interface UserCardProps {
  user?: User;
}

function UserCard({ user }: UserCardProps) {
  const { t } = useTranslation();

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.avatar}>
          <div className={styles.placeholder}></div>
        </div>
        <Text className={styles.name}>{t("users.loading")}</Text>
        <Text className={styles.position}>...</Text>
        <Text className={styles.email}>...</Text>
        <Text className={styles.phone}>...</Text>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Avatar src={user.photo} alt={user.name} loading="lazy" />
      <TextWithTooltip className={styles.name}>{user.name}</TextWithTooltip>
      <div>
        <TextWithTooltip className={styles.position}>
          {user.position}
        </TextWithTooltip>
        <TextWithTooltip className={styles.email}>{user.email}</TextWithTooltip>
        <Text className={styles.phone}>{user.phone}</Text>
      </div>
    </div>
  );
}

export default UserCard;
