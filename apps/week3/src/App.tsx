import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import localeKo from './lang/ko.json';
import localeEnUS from './lang/en-US.json';
import styles from './App.module.css';
import Title from './components/Title';
import Header from './components/Header';
import { LOCALE } from './constants/locale';

const { KO, EN_US } = LOCALE;

export default function App() {
  const [locale, setLocale] = useState<string>(
    localStorage.getItem('locale') || 'ko'
  );
  const messages = { [KO]: localeKo, [EN_US]: localeEnUS }[locale];

  return (
    <div className={styles.container}>
      <Header locale={locale} setLocale={setLocale} />
      <IntlProvider locale={locale} messages={messages}>
        <main>
          <Title />
        </main>
      </IntlProvider>
    </div>
  );
}
