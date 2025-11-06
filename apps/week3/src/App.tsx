import { useState } from "react";
import { IntlProvider } from "react-intl";
import localeKo from "./lang/ko.json";
import localeEnUS from "./lang/en-US.json";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import { LOCALE } from "./constants/locale";
import Main from "./components/Main/Main";

const { KO, EN_US } = LOCALE;

export default function App() {
  const [locale, setLocale] = useState<string>(
    localStorage.getItem("locale") || KO
  );
  const messages = { [KO]: localeKo, [EN_US]: localeEnUS }[locale];

  return (
    <div className={styles.container}>
      <Header locale={locale} setLocale={setLocale} />
      <IntlProvider locale={locale} messages={messages}>
        <Main userName={locale === KO ? "민규" : "Jason"} />
      </IntlProvider>
    </div>
  );
}
