import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Header from "./components/Header";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./configs/axios";
import ImageContainer from "./components/ImageContainer";
import { useState } from "react";

// const searchCollectionsUrl = `/search/collections`;
const searchPhotosUrl = `/search/photos`;

function App() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("cat");

  const { isLoading, data } = useQuery({
    queryKey: ["images", page, searchTerm],
    queryFn: async () => {
      const {
        data: { results },
      } = await apiFetch(
        `${searchPhotosUrl}?client_id=${
          import.meta.env.VITE_UNSPLASH_ACCESS_KEY
        }&page=${page}&query=${searchTerm}`
      );
      return results;
    },
  });

  return (
    <>
      <Header setSearchTerm={setSearchTerm} />
      {!isLoading && (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 1000: 3 }}
        >
          <Masonry gutter="2rem">
            {data?.map((image) => (
              <ImageContainer key={image.id} image={image} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </>
  );
}

export default App;
