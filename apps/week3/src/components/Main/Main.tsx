import { useEffect, useRef, useState } from "react";
import { FormattedMessage, FormattedDate } from "react-intl";
import styles from "./Main.module.css";

interface Props {
  userName: string;
}

function Title({ userName }: Props) {
  return (
    <h1>
      <FormattedMessage id="title" values={{ userName }} />
    </h1>
  );
}

function DateTime() {
  const [dateTime, setDateTime] = useState(new Date());
  const ref = useRef<number | null>(null);

  useEffect(() => {
    ref.current = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, []);

  return (
    <div className={styles.dateTime}>
      <FormattedDate
        value={dateTime}
        year="numeric"
        month="numeric"
        day="numeric"
        hour="numeric"
        minute="numeric"
        second="numeric"
      />
    </div>
  );
}

export default function Main({ userName }: Props) {
  return (
    <main className={styles.main}>
      <Title userName={userName} />
      <DateTime />
    </main>
  );
}
