import React, { FC, useState } from "react";
import { debounce } from "lodash";
import SearchField from "./SearchField";
import List from "./ListItems";
import axios from "axios";

const API_URL = "https://www.googleapis.com/books/v1/volumes";
const DEBOUNCE = 1000;

/**
 * This the search function we need to fetch data from the API using axios
 * Also we need to set the value of isLoading to indicate to the user that the results are being fetched
 * and once the fetching is done we need to set the response data as our search results so they can be consumed by the component
 * @param {*} queryParam the search string
 * @param setResults a function to set update the state of the component with search result
 * @param setIsloading a function to control the loading state
 */

const searchFun = (
  queryParam: string,
  setResults: (value: string[]) => void,
  setIsLoading: (value: boolean) => void
) => {
  axios
    .get(API_URL, {
      params: {
        q: queryParam
      }
    })
    .then(({ data }) => {
      const { totalItems, items } = data;
      setIsLoading(false);
      //googleBook api return the number of total items, in case it is 0 we need to make sure this checked ,
      // in other apis you might get different type of results where it is always array of strings and we don't have to do this check
      setResults(totalItems ? items.map((i: any) => i.volumeInfo.title) : []);
    });
};

/**
 * This is the debounced function that we will run once the user hit a key
 * lodash debounce return a function, that can be invoked any time
 * this function takes a function, searchFunction, and a debounce time
 * in this way we guarantee that the we only fetch after certin time and we don't spam the api with calls every time the user hits a key
 */
const debouncedSearch = debounce(searchFun, DEBOUNCE);
/**
 * searchFun and debouncedSearch can live outside the component
 * we don't need to assign them whenever the component rerender
 * which in this case on every state change
 * They still can work as fine, but it is simply not necessary
 */

const AutoComplete: FC = () => {
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSerach = (v: string) => {
    const search = debouncedSearch;
    if (!v) {
      // when the user clear the field we don't want to perform a search, we need to clear the state and do nothing else
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
