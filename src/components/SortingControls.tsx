import { SortBy } from "../types";

type SortingControlsRef = {
  onClick: (type: SortBy) => void;
  sortBy: string;
};

export default function SortingControls({
  onClick,
  sortBy,
}: SortingControlsRef) {
  return (
    <section className="sorting">
      <i className={`fa-solid fa-arrow-down-short-wide`}></i>

      <SortingButton
        isActive={sortBy === "relevant"}
        onClick={() => onClick("relevant")}
      >
        Relevant
      </SortingButton>
      <SortingButton
        isActive={sortBy === "recent"}
        onClick={() => onClick("recent")}
      >
        Recent
      </SortingButton>
    </section>
  );
}

type SortingButtonProps = {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
};
function SortingButton({ onClick, children, isActive }: SortingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--recent ${
        isActive && "sorting__button--active"
      } `}
    >
      {children}
    </button>
  );
}
