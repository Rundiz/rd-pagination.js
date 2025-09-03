# Rundiz Pagination.JS

JavaScript Pagination.  
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

### Samples
* [Sample 1](https://rundiz.github.io/rd-pagination.js/tests/samples/sample01.html) use offset query string.
* [Sample 2](https://rundiz.github.io/rd-pagination.js/tests/samples/sample02.html) use page number query string.
* [Sample 3](https://rundiz.github.io/rd-pagination.js/tests/samples/sample03.html) use different selector.
* [Sample 4](https://rundiz.github.io/rd-pagination.js/tests/samples/sample04.html) full options.
* [Sample 5](https://rundiz.github.io/rd-pagination.js/tests/samples/sample05.html) use pre-set style class.
* [Sample 6](https://rundiz.github.io/rd-pagination.js/tests/samples/sample06-ajax.html) use AJAX. (Please download and try it from your server.)
* [Sample 7](https://rundiz.github.io/rd-pagination.js/tests/samples/sample07.html) use multiple pagination.
* [Sample 8](https://rundiz.github.io/rd-pagination.js/tests/samples/sample08.html) use custom design.
