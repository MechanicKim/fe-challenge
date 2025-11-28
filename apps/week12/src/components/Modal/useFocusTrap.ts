import { useCallback, useEffect, useRef } from "react";

export default function useFocusTrap() {
  // 모달 컨테이너 DOM 요소를 참조
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 포커스 가능한 요소들을 쿼리하는 함수
  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];

    // 일반적인 포커스 가능한 요소 셀렉터
    const FOCUSABLE_SELECTOR = `a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]`;

    // containerRef 내부의 모든 포커스 가능한 요소를 배열로 반환
    return Array.from<HTMLElement>(
      containerRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
    ).filter((el) => el.offsetWidth > 0 || el.offsetHeight > 0); // 화면에 표시되는 요소만
  }, []);

  // 키보드 이벤트 핸들러 (Tab 키 동작 제어)
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== "Tab") return; // 활성화되지 않았거나 Tab 키가 아니면 무시

      const focusable = getFocusableElements();
      if (focusable.length === 0) {
        event.preventDefault(); // 기본 Tab 동작 중단
        return;
      }

      const firstFocusableEl = focusable[0];
      const lastFocusableEl = focusable[focusable.length - 1];

      // Shift + Tab (역방향 이동): 현재 포커스가 첫 번째 요소에 있을 때, 마지막 요소로 이동
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          event.preventDefault(); // 기본 Tab 동작 중단
        }
      }
      // Tab (정방향 이동): 현재 포커스가 마지막 요소에 있을 때, 첫 번째 요소로 이동
      else {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          event.preventDefault(); // 기본 Tab 동작 중단
        }
      }
    },
    [getFocusableElements]
  );

  useEffect(() => {
    const focusable = getFocusableElements();
    if (focusable.length > 0) {
      focusable[0].focus();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, getFocusableElements]);

  return { containerRef };
}
