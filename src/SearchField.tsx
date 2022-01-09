import React from "react";

interface SearchFieldProps {
  onSearch: (v: string) => void;
  isLoading: boolean;
}
const SearchField: React.FC<SearchFieldProps> = ({ onSearch, isLoading }) => {
  console.log(isLoading);

  return (
    <div className="input-group position-relative">
      <input
        className="form-control"
        placeholder="search"
        onChange={(e) => onSearch(e.target.value)}
      />
      {isLoading && (
        <span className="position-absolute" style={{ top: 3, right: 5 }}>
          <div className="spinner-border" role="status" />
        </span>
      )}
    </div>
  );
};

export default SearchField;
