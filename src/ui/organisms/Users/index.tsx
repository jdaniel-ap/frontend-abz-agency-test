import { Heading } from "@/ui/atoms";
import styles from "./Users.module.scss";
import UserCard from "@/ui/molecules/UserCard";
function Users() {
  return (
    <section className={styles.container}>
      <Heading>Working with GET request</Heading>
      <div className={styles.users}>
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </section>
  );
}

export default Users;
