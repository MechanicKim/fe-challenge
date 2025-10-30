import type { SetStateAction, Dispatch } from 'react';
import { LOCALE } from '../constants/locale';
import styles from './Header.module.css';

interface Props {
  locale: string;
  setLocale: Dispatch<SetStateAction<string>>;
}

const { KO, EN_US } = LOCALE;
const localeList = [
  { locale: KO, name: '한글' },
  { locale: EN_US, name: 'English' },
];

export default function Header({ locale, setLocale }: Props) {
  return (
    <header>
      {localeList.map((item) => (
        <button
          key={item.locale}
          type="button"
          className={locale === item.locale ? styles.selected : ''}
          onClick={() => {
            localStorage.setItem('locale', item.locale);
            setLocale(item.locale);
          }}
        >
          {item.name}
        </button>
      ))}
    </header>
  );
}
