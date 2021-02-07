# Marvel Challenge

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Build project version can be seen on [Marvel Challenge](https://app-marvel-challenge.netlify.app/)

Project is written in React.js. Default characters (first 20) are fetched on page initial load. At that moment total characters number and first 20 characters are saved in the local state and displayed.

The search input is provided and characters are filtered on typing, 1 second after the user finishes typing. The characters are filtered on the backend side. If search results on provided search value are empty, bookmarked characters are displayed.

Users can bookmark (select/unselect) characters by clicking on the star icon on every character card. Bookmarked characters are saved in the local storage. Users can bookmark a maximum of 5 items. When maximum has reached, info message is displayed. After 3 seconds, the info message will automatically hide.

Bellow section with the characters is the pagination section. Users can change the page by inserting the page number in the input field and press ENTER key, or by clicking on PREV/NEXT button. Pagination is hidden when bookmarked characters are displayed.

- State management with React Hooks and user local storage.
- For pagination is used rc-pagination library.
- Deployed by Netlify
