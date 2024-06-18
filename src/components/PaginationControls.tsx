import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationDirection = "next" | "previous";
type PaginationControlsProp = {
  onChangePage: (direction: PaginationDirection) => void;
  currentPage: number;
};

type PaginationButtonProp = {
  onClick: (direction: PaginationDirection) => void;
  currentPage: number;
  direction: PaginationDirection;
};

export default function PaginationControls({
  onChangePage,
  currentPage,
}: PaginationControlsProp) {
  return (
    <section className="pagination">
      <PaginationButton
        currentPage={currentPage}
        direction={"previous"}
        onClick={onChangePage}
      />
      <PaginationButton
        currentPage={currentPage}
        direction={"next"}
        onClick={onChangePage}
      />
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
    <button onClick={() => onClick(direction)} className="pagination__button">
      {" "}
      {direction === "next" ? <ArrowRightIcon /> : <ArrowLeftIcon />}Page{" "}
      {direction === "next" ? calculatedPage + 1 : calculatedPage - 1}
    </button>
  );
}
