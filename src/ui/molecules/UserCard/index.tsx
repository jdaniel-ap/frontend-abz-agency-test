import styles from "./UserCard.module.scss";
import { Avatar, Text } from "@/ui/atoms";
import type { User } from "@/types/api";

interface UserCardProps {
  user?: User;
}

function UserCard({ user }: UserCardProps) {
  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.avatar}>
          <div className={styles.placeholder}></div>
        </div>
        <Text className={styles.name}>Loading...</Text>
        <Text className={styles.position}>...</Text>
        <Text className={styles.email}>...</Text>
        <Text className={styles.phone}>...</Text>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Avatar src={user.photo} alt={user.name} loading="lazy" />
      <Text className={styles.name} title={user.name}>
        {user.name}
      </Text>
      <div>
        <Text className={styles.position}>{user.position}</Text>
        <Text className={styles.email} title={user.email}>
          {user.email}
        </Text>
        <Text className={styles.phone}>{user.phone}</Text>
      </div>
    </div>
  );
}

export default UserCard;
