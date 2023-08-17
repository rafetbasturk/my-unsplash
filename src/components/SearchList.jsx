import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageContainer from "./ImageContainer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { apiFetch } from "../configs/axios";
import usePagination from "../hooks/usePagination";

const SearchList = ({ searchTerm }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["searchImages", searchTerm],
      queryFn: async ({ pageParam = 1 }) => {
        const { data } = await apiFetch(
          `/search/photos?client_id=${
            import.meta.env.VITE_UNSPLASH_ACCESS_KEY
          }&page=${pageParam}&query=${searchTerm}`
        );
        return data;
      },
      getNextPageParam: (lastPage, pages) => pages.length + 1,
    });

  const targetRef = usePagination(
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  );

  return (
    status !== "loading" && (
      <main>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 1000: 3 }}
        >
          <Masonry gutter="2rem">
            {data?.pages.map((page) => {
              return page?.results.map((image, i) => {
                return (
                  <ImageContainer
                    key={image.id}
                    image={image}
                    ref={page.results.length === i + 1 ? targetRef : null}
                  />
                );
              });
            })}
          </Masonry>
        </ResponsiveMasonry>
      </main>
    )
  );
};
export default SearchList;
