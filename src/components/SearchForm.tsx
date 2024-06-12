type SearchFormProp = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchText: string;
};

export default function SearchForm({ onChange, searchText }: SearchFormProp) {
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      }}
      action="#"
      className="search"
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        onChange={onChange}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
