import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import useJobItems from "../hooks/useJobItems";
import useDebounce from "../hooks/useDebounce";
import { Toaster } from "react-hot-toast";

function App() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchText = useDebounce(searchText, 250);
  const { isLoading, jobItems } = useJobItems(debouncedSearchText);
  const jobItemSliced = jobItems?.slice(0, 7);
  const totalNumberOfResults = jobItems?.length;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleChangePage = (direction: "next" | "previous") => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm onChange={handleOnChange} searchText={searchText} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfResults={totalNumberOfResults} />
            <SortingControls />
          </SidebarTop>
          <JobList isLoading={isLoading} jobItems={jobItemSliced} />
          <PaginationControls
            currentPage={currentPage}
            onChangePage={handleChangePage}
          />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
