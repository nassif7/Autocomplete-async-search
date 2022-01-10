# Autocomplete_code_challenge

Created with CodeSandbox

I got this challenge to build an Async auto complete search component. I
had to build it using lodash and axion. I sturggled to understand how to
manage it specially with lodach debounce but after checking some doces i
found that debounce would return a functtion. from there on it was
simpler. here a basic implemetation of above i used Bootstrap just to
make things easier you can check in the network tab to see that the app
only fetch after the debounce time so it wont be fetching with every key
the user hit. I also used google book api, that's why i am also maping
over the results to get only the titles.
