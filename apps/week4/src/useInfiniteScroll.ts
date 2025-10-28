import { useEffect, useRef } from 'react';

const useInfiniteScroll = (callback: () => void, hasNextPage: boolean) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;

    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) callback();
      },
      { threshold: 0.8 } 
    );

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [callback, hasNextPage]);

  return targetRef;
};

export default useInfiniteScroll;