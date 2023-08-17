import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Header, SearchList, PhotoList, Footer } from "./components";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 600);

  return (
    <>
      <Header setSearchTerm={setSearchTerm} />
      {searchTerm.length < 3 ? (
        <PhotoList />
      ) : (
        <SearchList searchTerm={debouncedSearch} />
      )}
      <Footer />
    </>
  );
}

export default App;
