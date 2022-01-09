import React, { FC, useRef, useState } from "react";
import { debounce } from "lodash";
import SearchField from "./SearchField";
import List from "./ListItems";
import axios from "axios";

const API_URL = "https://www.googleapis.com/books/v1/volumes";
const DEBOUNCE = 1000;

const searchFun = (v: string, setResults: any, setIsLoading: any) => {
  axios
    .get(API_URL, {
      params: {
        q: v
      }
    })
    .then(({ data }) => {
      const { totalItems, items } = data;
      setIsLoading(false);
      setResults(totalItems ? items.map((i: any) => i.volumeInfo.title) : []);
    });
};

const debouncedSearch = debounce(searchFun, DEBOUNCE);

const AutoComplete: FC = () => {
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSerach = (v: string) => {
    const search = debouncedSearch;
    if (!v) {
      debouncedSearch.cancel();
      setResults([]);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      search(v, setResults, setIsLoading);
    }
  };

  return (
    <>
      <SearchField onSearch={onSerach} isLoading={isLoading} />
      {!!results.length && <List items={results} onSelect={(i) => alert(i)} />}
    </>
  );
};

export default AutoComplete;
