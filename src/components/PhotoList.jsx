import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageContainer from "./ImageContainer";
import usePagination from "../hooks/usePagination";
import { useGetImages } from "../hooks/useGetImages";

const PhotoList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useGetImages();

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
              return page.map((image, i) => (
                <ImageContainer
                  key={image.id}
                  image={image}
                  ref={page.length === i + 1 ? targetRef : null}
                />
              ));
            })}
          </Masonry>
        </ResponsiveMasonry>
      </main>
    )
  );
};
export default PhotoList;
