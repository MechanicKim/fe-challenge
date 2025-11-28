import Dropdown, { type Option } from "./components/Dropdown/Dropdown";

const dropdownOptions = [
  { value: 'apple', label: '🍎 사과' },
  { value: 'banana', label: '🍌 바나나' },
  { value: 'cherry', label: '🍒 체리' },
  { value: 'grape', label: '🍇 포도' },
];

export default function App() {
  const handleSelection = (selected: Option) => {
    console.log('선택된 항목:', selected);
  };

  return (
    <div>
      <h1>12주차: 클릭 아웃사이드(Click Outside) 훅/디렉티브</h1>
      <Dropdown options={dropdownOptions} onSelect={handleSelection} />
    </div>
  );
}
