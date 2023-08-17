import { useCallback, useRef } from "react";

const usePagination = (isFetchingNextPage, fetchNextPage, hasNextPage) => {
  const intObserver = useRef(null);

  const targetRef = useCallback(
    (image) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((images) => {
        if (images[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (image) intObserver.current.observe(image);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  return targetRef;
};
export default usePagination;
