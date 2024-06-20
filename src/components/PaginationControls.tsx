import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { type PageDirection } from "../types";

type PaginationControlsProp = {
  onChangePage: (direction: PageDirection) => void;
  currentPage: number;
  totalNumberOfPages: number;
};

type PaginationButtonProp = {
  onClick: (direction: PageDirection) => void;
  currentPage: number;
  direction: PageDirection;
};

export default function PaginationControls({
  onChangePage,
  currentPage,
  totalNumberOfPages,
}: PaginationControlsProp) {
  return (
    <section className="pagination">
      <PaginationButton
        currentPage={currentPage}
        direction={"previous"}
        onClick={onChangePage}
      />
      {currentPage <= totalNumberOfPages && (
        <PaginationButton
          currentPage={currentPage}
          direction={"next"}
          onClick={onChangePage}
        />
      )}
    </section>
  );
}

function PaginationButton({
  direction,
  onClick,
  currentPage,
}: PaginationButtonProp) {
  const calculatedPage = currentPage <= 1 ? 1 : currentPage;
  return (
    <button
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.currentTarget.blur();
        onClick(direction);
      }}
      className="pagination__button"
    >
      {" "}
      {direction === "next" ? <ArrowRightIcon /> : <ArrowLeftIcon />}Page{" "}
      {direction === "next" ? calculatedPage + 1 : calculatedPage - 1}
    </button>
  );
}
