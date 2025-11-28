import { useRef, useState } from "react";
import styles from "./Dropdown.module.css";
import useClickOutside from "../../hooks/useClickOutside";

export interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  onSelect?: (option: { label: string; value: string }) => void;
}

export default function Dropdown({ options, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const ref = useRef<HTMLUListElement | null>(null);
  useClickOutside({
    ref,
    callback: () => {
      console.log("Click outside!");
      setIsOpen(false);
    },
  });

  const toggleDropdown = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className={styles.dropdown}>
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : "옵션을 선택하세요"}
        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <ul ref={ref} className="dropdown-menu">
          {options.map((option) => (
            <li
              key={option.value}
              className="dropdown-item"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
