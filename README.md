# Rundiz Pagination.JS

JavaScript Pagination.<br>
The highly customizable JS pagination class. 

[![npm](https://img.shields.io/npm/v/rd-pagination.js)](https://www.npmjs.com/package/rd-pagination.js) 
[![NPM](https://img.shields.io/npm/l/rd-pagination.js)](https://www.npmjs.com/package/rd-pagination.js) 
[![npm](https://img.shields.io/npm/dt/rd-pagination.js)](https://www.npmjs.com/package/rd-pagination.js)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/rundiz/rd-pagination.js)
![GitHub repo size](https://img.shields.io/github/repo-size/rundiz/rd-pagination.js)
![GitHub all releases](https://img.shields.io/github/downloads/Rundiz/rd-pagination.js/total?style=social)

Example:  
All HTML you need.
```html
<div id="content">Your content.</div>
<nav class="rd-pagination" aria-label="Page navigation example"></nav>
<script src="assets/js/rd-pagination.js"></script>
```
All JavaScript you need.
```js
const rdPagination = new RdPagination('.rd-pagination', {
    base_url: '?start=%PAGENUMBER%',
    page_number_value: 0,
    total_records: 195,
});
rdPagination.createLinks();
```
That's all. See more samples in folder **tests/samples**.

# Pagination parts description
![Pagination](https://github.com/Rundiz/pagination/raw/master/tests/via-http/pagination-description.jpg "Pagination description")

* "before unavailable" items number can be set via `unavailable_before` option. Example: `{unavailable_before: 1}`
* "unavailable" text can be set via `unavailable_text` option. Example: `{unavailable_text: '..'}`
* "adjacent pages" can be set the number via `number_adjacent_pages` option. Example: `{number_adjacent_pages: = 3}`
* "after unavailable" items number can be set via `unavailable_after` option. Example: `{unavailable_after: 2}`
* Read more in JS class constructor on `options` argument.