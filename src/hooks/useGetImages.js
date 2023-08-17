import { useInfiniteQuery } from "@tanstack/react-query";
import { apiFetch } from "../configs/axios";

export const useGetImages = (searchTerm) => {
  const url = searchTerm
    ? `/search/photos?client_id=${
        import.meta.env.VITE_UNSPLASH_ACCESS_KEY
      }&query=${searchTerm}`
    : `/photos?client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["images"],
      queryFn: async ({ pageParam = 1 }) => {
        const { data } = await apiFetch(`${url}&page=${pageParam}`);
        return data;
      },
      getNextPageParam: (lastPage, pages) => pages.length + 1,
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status };
};
