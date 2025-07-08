/**
 * Rundiz Pagination.JS
 * 
 * Ported from **Rundiz\Pagination** ( https://github.com/Rundiz/pagination ).
 * 
 * @preserve Preserve file header doc-block.
 * @package rd-pagination.js
 * @version 0.0.3
 */


'use strict';


/**
 * Rundiz Pagination JS class.
 * 
 * @since 0.0.1
 */
class RdPagination {


    /**
     * @namespace
     * @property {Object} events The events to call.
     * @property {string} events.onclick On click event. Event is fired after displayed pagination.
     */
    #events = {};


    /**
     * @type {boolean} Mark `true` if already listened click event.
     */
    #isListenedClickEvent = false;


    /**
     * @see See `constructor()` for more details.
     * @type {object} The options. See `constructor()` for more details.
     */
    #options = {};


    /**
     * @type {string} The selector for HTML elements that will be render the pagination.
     */
    #selector = '';


    /**
     * @type {number} Total pages that was calculated from total records and items per page. This is for use in programatic only.
     */
    #total_pages = 0;


    /**
     * Class constructor.
     * 
     * @param {string} selector The selector for HTML elements that will be render the pagination.
     * @param {object} options The options (Required).
     * @param {string} options.base_url The URL for use when generate page numbers with links (Required).  
     *              Set the position where page numbers will be appears as URI segment or query string with `%PAGENUMBER%` placeholder.  
     *              Example 1: `http://domain.tld/my-category/page/%PAGENUMBER%` This URL use page number as URI segment.  
     *              Example 2: `http://domain.tld/my-category?page=%PAGENUMBER%` This URL use page number as query string.  
     *              Example 3: `http://domain.tld/my-category?filter=some_filter_values&amp;search=foobar&amp;page=%PAGENUMBER%` This URL use page number as query string with other query strings in it, seperate each query string with `&amp;` not just `&`.  
     *              Example 4: `http://domain.tld/my-category?start=%PAGENUMBER%` This URL use page number as query string but use start as the name.  
     *              You have to get the page number value and set its value to this class by call the "page_number_value" option.
     * @param {number} options.page_number_value The current page number value (Required). This class cannot detect current page number automatically because of dynamic styles of URL. So, you have to manually set its value to this option.
     * @param {number} options.total_records The total number of records (Required). This means "all" records by conditions with out the "LIMIT" or slices commands.
     * 
     * @param {number} options.items_per_page The number of items that will be displaying per page. Such as number of articles to display in each page. Default is 10.
     * @param {string} options.page_number_type The page number type. The value can be `start_num` or `page_num`. Default is `start_num`.  
     *              Start number or `start_num` also know as offset number. (eg. page number value will be 0, 10, 20, 30, ...)  
     *              Page number or `page_num`. (eg. page number value will be 1, 2, 3, 4, ...)
     * 
     * @param {boolean} options.current_page_link Display current link at current page. Set to true to display, false not to display. Default is `false`.
     * @param {object} options.current_page_link_attributes The current page link attributes in object where key is attribute name. 
     *              Example `{'class' => 'my class'}`. Must not contains `href`, `data-rd-pagination` attributes.
     * @param {string} options.current_tag_close The current page tag close. If you set to display current page, this will be placed after link to the current page. Default is empty.
     * @param {string} options.current_tag_open The current page tag open. If you set to display current page, this will be placed before link to the current page. Default is empty.
     * 
     * @param {boolean} options.first_page_always_show If you are at first page the first page link will not show if you set this value to false, if you set to true it will be always show the first page link. Default is `false`.
     * @param {object} options.first_page_link_attributes The first page link attributes in object where key is attribute name. 
     *              Example `{'class' => 'my class'}`. Must not contains `href`, `data-rd-pagination` attributes.
     * @param {string|false} options.first_page_text The link text of the paginate that will go to the first page. Set to false to not displaying first page link.
     * @param {string} options.first_tag_close The first page tag close. If you set to display first page, this will be placed after link to the first page. Default is 1 space.
     * @param {string} options.first_tag_open The first page tag open. If you set to display first page, this will be placed before link to the first page. Default is 1 space.
     * 
     * @param {boolean} options.last_page_always_show If you are at last page the last page link will not show if you set this value to false, if you set to true it will be always show the last page link. Default is `false`.
     * @param {object} options.last_page_link_attributes The last page link attributes in object where key is attribute name. 
     *              Example `{'class' => 'my class'}`. Must not contains `href`, `data-rd-pagination` attributes.
     * @param {string|false} options.last_page_text The link text of the paginate that will go to the last page. Set to false to not displaying last page link.
     * @param {string} options.last_tag_close The last page tag close. If you set to display last page, this will be placed after link to the last page. Defauls is 1 space.
     * @param {string} options.last_tag_open The last page tag open. If you set to display last page, this will be placed before link to the last page. Default is 1 space.
     * 
     * @param {boolean} options.next_page_always_show If you are at last page the next page link will not show if you set this value to false, if you set to true it will be always show the next page link. Default is `false`.
     * @param {object} options.next_page_link_attributes The next page link attributes in object where key is attribute name. 
     *              Example `{'class' => 'my class'}`. Must not contains `href`, `data-rd-pagination` attributes.
     * @param {string|false} options.next_page_text The link text of the paginate that will go to the next page. Set to false to not displaying next page link.
     * @param {string} options.next_tag_close The next page tag close. If you set to display next page, this will be placed after link to the next page. Default is 1 space.
     * @param {string} options.next_tag_open The next page tag open. If you set to display next page, this will be placed before link to the next page. Default is 1 space.
     * 
     * @param {number} options.number_adjacent_pages The number of adjacent pages before and after the current page. Defaut is 5.
     * @param {boolean} options.number_display Display the page numbers or not. Set to true to display, false not to display. Default is `true`.
     * @param {object} options.number_page_link_attributes The number page link attributes in object where key is attribute name. 
     *              Example `{'class' => 'my class'}`. Must not contains `href`, `data-rd-pagination` attributes.
     * @param {string} options.number_tag_close The page number tag close. If you set to display page number, this will be placed after link to the page number. Default is 1 space.
     * @param {string} options.number_tag_open The page number tag open. If you set to display page number, this will be placed before link to the page number. Default is 1 space.
     * 
     * @param {string} options.overall_tag_close The overall tag close. It will be place at the very end of displaying page numbers. Default is empty.
     * @param {string} options.overall_tag_open The overall tag open. It will be place at the very beginning of displaying page numbers. Default is empty.
     * 
     * @param {boolean} options.previous_page_always_show If you are at first page the previous page link will not show if you set this value to false, if you set to true it will be always show the previous page link. Default is `false`.
     * @param {object} options.previous_page_link_attributes The previous page link attributes in object where key is attribute name. 
     *              Example `{'class' => 'my class'}`. Must not contains `href`, `data-rd-pagination` attributes.
     * @param {string|false} options.previous_page_text The link text of the paginate that will go to the previous page. Set to false to not displaying previous page link.
     * @param {string} options.previous_tag_close The previous page tag close. If you set to display previous page, this will be placed after link to the previous page. Default is 1 space.
     * @param {string} options.previous_tag_open The previous page tag open. If you set to display previous page, this will be placed before link to the previous page. Default is 1 space.
     * 
     * @param {boolean} options.unavailable_display Display unavailable page (...) or not. Set to true to display, false to not display. Default is `false`.
     * @param {string} options.unavailable_text The unavailable page text. Basically it is something to show that there are pages between these range such as 3 dots text. (...) Default is `&hellip;`.
     * @param {string} options.unavailable_tag_close The unavailable page tag close. If you set to display unavailable page, this will be placed after unavailable page (...). Default is 1 space.
     * @param {string} options.unavailable_tag_open The unavailable page tag open. If you set to display unavailable page, this will be placed before unavailable page (...). Default is 1 space.
     * @param {number|false} options.unavailable_after Number of pages to display after last unavailable page. Set number as integer or set to false to not display the pages after unavailable. Default is 2.
     * @param {number|false} options.unavailable_before Number of pages to display before first unavailable page. Set number as integer or set to false to not display the pages before unavailable. Default is 2.
     * 
     * @param {object} options.events The events to be called.
     * @param {function} options.events.onclick On click event. This event is fired after displayed pagination. Set callback function here to call when user clicked. If you set callback function, this class will not use `preventDefault()` to let you handle it.
     */
    constructor(selector, options = {}) {
        if (typeof(selector) !== 'string') {
            throw new Error('The argument selector must be string.');
        }
        if (typeof(options) !== 'object') {
            throw new Error('The argument options must be an object.');
        }

        this.#events = options.events;

        const defaultOptions = {
            base_url: '',
            page_number_value: 0,
            total_records: 0,

            items_per_page: 10,
            page_number_type: 'start_num',

            current_page_link: false,
            current_page_link_attributes: {},
            current_tag_close: '',
            current_tag_open: '',
            first_page_always_show: false,
            first_page_link_attributes: {},
            first_page_text: '&laquo; First',
            first_tag_close: ' ',
            first_tag_open: ' ',
            last_page_always_show: false,
            last_page_link_attributes: {},
            last_page_text: 'Last &raquo;',
            last_tag_close: ' ',
            last_tag_open: ' ',
            next_page_always_show: false,
            next_page_link_attributes: {},
            next_page_text: 'Next &rsaquo;',
            next_tag_close: ' ',
            next_tag_open: ' ',
            number_adjacent_pages: 5,
            number_display: true,
            number_page_link_attributes: {},
            number_tag_close: ' ',
            number_tag_open: ' ',
            overall_tag_close: '',
            overall_tag_open: '',
            previous_page_always_show: false,
            previous_page_link_attributes: {},
            previous_page_text: '&lsaquo; Previous',
            previous_tag_close: ' ',
            previous_tag_open: ' ',
            unavailable_after: 2,
            unavailable_before: 2,
            unavailable_display: false,
            unavailable_tag_close: ' ',
            unavailable_tag_open: ' ',
            unavailable_text: '&hellip;',
        };
        // force delete unwanted that may have.
        delete options.events;
        delete options.total_pages;
        // merge with default options.
        options = {...defaultOptions, ...options};

        this.#selector = selector;
        this.#options = options;
    }// constructor


    /**
     * Generate pagination URL.
     * 
     * @param {integer} page_value Page number value.
     * @param {string} direction The direction can be first, previous, next, last, number.
     * @param {boolean} return_value_ony Set to true to return the page value only. Set to false to return as URL.
     * @returns {string} Return generated URL.
     */
    #generateUrl(page_value, direction = '', return_value_only = false) {
        if ('first' === direction) {
            if (this.#options.page_number_type == 'start_num') {
                page_value = 0;
            } else if (this.#options.page_number_type == 'page_num') {
                page_value = 1;
            }
        } else if ('previous' === direction) {
            if (this.#options.page_number_type == 'start_num') {
                page_value = (page_value - this.#options.items_per_page);
                if (page_value < 0) {
                    page_value = 0;
                }
            } else if (this.#options.page_number_type == 'page_num') {
                page_value = (page_value - 1);
                if (page_value <= 0) {
                    page_value = 1;
                }
            }
        } else if ('next' === direction) {
            if (this.#options.page_number_type == 'start_num') {
                page_value = (parseFloat(page_value) + parseFloat(this.#options.items_per_page));
                if (page_value > ((this.#total_pages * this.#options.items_per_page) - this.#options.items_per_page)) {
                    page_value = ((this.#total_pages * this.#options.items_per_page) - this.#options.items_per_page);
                }
            } else if (this.#options.page_number_type == 'page_num') {
                page_value = (parseFloat(page_value) + 1);
                if (page_value > ((this.#total_pages * this.#options.items_per_page) / this.#options.items_per_page)) {
                    page_value = ((this.#total_pages * this.#options.items_per_page) / this.#options.items_per_page);
                }
            }
        } else if ('last' === direction) {
            if (this.#options.page_number_type == 'start_num') {
                page_value = (page_value - this.#options.items_per_page);
            } else if (this.#options.page_number_type == 'page_num') {
                page_value = (page_value / this.#options.items_per_page);
            }
        } else {
            // calculate page querystring number from generated before and after current pages. example 1 2 [3] 4 5 current is 3, generated is 1 2 and 4 5
            if (this.#options.page_number_type == 'start_num') {
                page_value = ((page_value * this.#options.items_per_page) - this.#options.items_per_page);
            }
        }

        if (return_value_only === true) {
            return parseFloat(page_value);
        } else {
            return this.#options.base_url.replace('%PAGENUMBER%', page_value);
        }
    }// #generateUrl


    /**
     * Get generated pagination HTML.
     * 
     * @param {object} pagination_data The pagination data that can be generated from `getPaginationData()` method.
     * @returns {string} Return generated HTML as string.
     */
    #getPaginationHTML(pagination_data) {
        let pagination_rendered = "\n";
        if (pagination_data?.overall_tag_open) {
            pagination_rendered += pagination_data.overall_tag_open;
        }

        if (typeof(pagination_data?.generated_pages) === 'object') {
            for (const page_key of pagination_data.generated_page_keys) {
                if (!pagination_data.generated_pages[page_key]) {
                    console.warn('[rd-pageination.js] There is no generated pages key: ' + page_key);
                    continue;
                }

                const page_item = pagination_data.generated_pages[page_key];
                let propertyName = null;
                if (page_item?.tag_open) {
                    pagination_rendered += page_item.tag_open;
                }
                if (page_item?.link) {
                    let linkAttributes = 'data-rd-pagination-link="true"' +
                        ' data-rd-pagination-page-value="' + page_item.page_value + '"';
                    if (isNaN(page_key) && this.#options[page_key + '_link_attributes']) {
                        propertyName = page_key + '_link_attributes';
                    } else if (!isNaN(page_key)) {
                        propertyName = 'number_page_link_attributes';
                        if (page_item?.current_page === true) {
                            propertyName = 'current_page_link_attributes';
                        }
                    }

                    if (!this.#isEmptyObject(this.#options[propertyName])) {
                        for (const [attributeName, attributeValue] of Object.entries(this.#options[propertyName])) {
                            if (
                                attributeName.toLocaleLowerCase() === 'href' ||
                                attributeName.toLocaleLowerCase() === 'data-rd-pagination-link' ||
                                attributeName.toLocaleLowerCase() === 'data-rd-pagination-page-value'
                            ) {
                                continue;
                            }
                            linkAttributes += ' ' + attributeName + '="' + attributeValue + '"';
                        }// end for;
                    }

                    pagination_rendered += '<a ' + linkAttributes + ' href="' + page_item.link + '">';
                }// endif; page link
                if (page_item?.text) {
                    pagination_rendered += page_item.text;
                }
                if (page_item?.link) {
                    pagination_rendered += '</a>'
                }
                if (page_item?.tag_close) {
                    pagination_rendered += page_item.tag_close;
                }
            };// endfor; generated_pages
        }// endif; `generated_pages`

        if (pagination_data?.overall_tag_close) {
            pagination_rendered += pagination_data.overall_tag_close;
        }
        pagination_rendered += "\n";

        return pagination_rendered;
    }// #getPaginationHTML


    /**
     * Is it currently in the first page?
     * 
     * @returns {boolean} Return `true` if the page that is displaying is first page, return `false` for otherwise.
     */
    #isCurrentlyFirstPage() {
        if (this.#options.page_number_type === 'start_num') {
            if (parseFloat(this.#options.page_number_value) === 0) {
                return true;
            }
        } else if (this.#options.page_number_type === 'page_num') {
            if (parseFloat(this.#options.page_number_value) === 1) {
                return true;
            }
        }

        return false;
    }// #isCurrentlyFirstPage


    /**
     * Is it currently in the last page?
     * 
     * @returns {boolean} Return `true` if the page that is displaying is last page, return `false` for otherwise.
     */
    #isCurrentlyLastPage() {
        if (this.#options.page_number_type === 'start_num') {
            if (this.#options.page_number_value >= (this.#total_pages * this.#options.items_per_page) - this.#options.items_per_page) {
                return true;
            }
        } else if (this.#options.page_number_type === 'page_num') {
            if (this.#options.page_number_value >= this.#total_pages) {
                return true;
            }
        }

        return false;
    }// #isCurrentlyLastPage


    /**
     * Check if object is empty or not.
     * 
     * @link https://stackoverflow.com/a/32108184/128761 Original source code.
     * @param {object} obj 
     * @returns {boolean}
     * @throws Throw the errors if wrong argument type.
     */
    #isEmptyObject(obj) {
        if (typeof(obj) !== 'object') {
            throw new Error('The argument obj must be an object.');
        }

        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false;
            }
        }

        return true;
    }// #isEmptyObject


    /**
     * Listen click event and execute the callback function.  
     * The arguments passing to callback function are `thisTarget` (on link tag), `event` object, `options` That was set via constructor method.
     */
    #listenClickEvent() {
        if (true === this.#isListenedClickEvent) {
            return ;
        }

        document.addEventListener('click', (event) => {
            let thisTarget = event.target;
            if (
                thisTarget.closest('[data-rd-pagination-link]') &&
                thisTarget.closest(this.#selector)
            ) {
                thisTarget = thisTarget.closest('[data-rd-pagination-link]');
            } else {
                return ;
            }

            // update option.
            this.updateOptions({page_number_value: thisTarget.dataset.rdPaginationPageValue});
            // display pagination.
            this.createLinks();
            if (this.#events?.onclick && typeof(this.#events?.onclick) === 'function') {
                // if there is `onclick` property specified and it is function (including class.method, anonymous function).
                // fire callback event.
                this.#events.onclick(thisTarget, event, this.#options);
            } else {
                // if there is no `onclick` property.
                // handle `preventDefault()`. This will not call `preventDefault()` when there is `onclick` property specified to let dev handle the way it works.
                event.preventDefault();
            }
        });

        this.#isListenedClickEvent = true;
    }// #listenClickEvent


    /**
     * Validate options and throw errors if something went wrong.
     * 
     * @throws Throw the error if validate failed.
     */
    #validateOptions() {
        if (typeof(this.#options.base_url) !== 'string') {
            throw new Error('The option `base_url` must be string.');
        } else if (this.#options.base_url === '') {
            throw new Error('The option `base_url` is required.');
        } else if (isNaN(this.#options.page_number_value)) {
            throw new Error('The option `page_number_value` must be number.');
        } else if (isNaN(this.#options.total_records)) {
            throw new Error('The option `total_records` must be number.');
        }

        if (typeof(this.#options.current_tag_close) !== 'string') {
            this.#options.current_tag_close = '';
        }
        if (typeof(this.#options.current_tag_open) !== 'string') {
            this.#options.current_tag_open = '';
        }
        if (typeof(this.#options.current_page_link) !== 'boolean') {
            this.#options.current_page_link = false;
        }
        if (typeof(this.#options.current_page_link_attributes) !== 'object') {
            this.#options.current_page_link_attributes = {};
        }
        if (typeof(this.#options.first_page_always_show) !== 'boolean') {
            this.#options.first_page_always_show = false;
        }
        if (typeof(this.#options.first_page_link_attributes) !== 'object') {
            this.#options.first_page_link_attributes = {};
        }
        if (typeof(this.#options.first_page_text) !== 'string' && this.#options.first_page_text !== false) {
            this.#options.first_page_text = '&laquo; First';
        }
        if (typeof(this.#options.first_tag_close) !== 'string') {
            this.#options.first_tag_close = '';
        }
        if (typeof(this.#options.first_tag_open) !== 'string') {
            this.#options.first_tag_open = '';
        }
        if (isNaN(this.#options.items_per_page)) {
            this.#options.items_per_page = 10;
        }
        if (typeof(this.#options.last_page_always_show) !== 'boolean') {
            this.#options.last_page_always_show = false;
        }
        if (typeof(this.#options.last_page_link_attributes) !== 'object') {
            this.#options.last_page_link_attributes = {};
        }
        if (typeof(this.#options.last_page_text) !== 'string' && this.#options.last_page_text !== false) {
            this.#options.last_page_text = 'Last &raquo;';
        }
        if (typeof(this.#options.last_tag_close) !== 'string') {
            this.#options.last_tag_close = '';
        }
        if (typeof(this.#options.last_tag_open) !== 'string') {
            this.#options.last_tag_open = '';
        }
        if (typeof(this.#options.next_page_always_show) !== 'boolean') {
            this.#options.next_page_always_show = false;
        }
        if (typeof(this.#options.next_page_link_attributes) !== 'object') {
            this.#options.next_page_link_attributes = {};
        }
        if (typeof(this.#options.next_page_text) !== 'string' && this.#options.next_page_text !== false) {
            this.#options.next_page_text = 'Next &rsaquo;';
        }
        if (typeof(this.#options.next_tag_close) !== 'string') {
            this.#options.next_tag_close = '';
        }
        if (typeof(this.#options.next_tag_open) !== 'string') {
            this.#options.next_tag_open = '';
        }
        if (typeof(this.#options.number_adjacent_pages) !== 'number') {
            this.#options.number_adjacent_pages = 5;
        }
        if (typeof(this.#options.number_page_link_attributes) !== 'object') {
            this.#options.number_page_link_attributes = {};
        }
        if (typeof(this.#options.number_display) !== 'boolean') {
            this.#options.number_display = true;
        }
        if (typeof(this.#options.number_tag_close) !== 'string') {
            this.#options.number_tag_close = '';
        }
        if (typeof(this.#options.number_tag_open) !== 'string') {
            this.#options.number_tag_open = '';
        }
        if (typeof(this.#options.overall_tag_close) !== 'string') {
            this.#options.overall_tag_close = '';
        }
        if (typeof(this.#options.overall_tag_open) !== 'string') {
            this.#options.overall_tag_open = '';
        }
        if (this.#options.page_number_type !== 'start_num' && this.#options.page_number_type !== 'page_num') {
            this.#options.page_number_type = 'start_num';
        }
        if (typeof(this.#options.previous_page_always_show) !== 'boolean') {
            this.#options.previous_page_always_show = false;
        }
        if (typeof(this.#options.previous_page_link_attributes) !== 'object') {
            this.#options.previous_page_link_attributes = {};
        }
        if (typeof(this.#options.previous_page_text) !== 'string' && this.#options.previous_page_text !== false) {
            this.#options.previous_page_text = '&lsaquo; Previous';
        }
        if (typeof(this.#options.previous_tag_close) !== 'string') {
            this.#options.previous_tag_close = '';
        }
        if (typeof(this.#options.previous_tag_open) !== 'string') {
            this.#options.previous_tag_open = '';
        }
        if (typeof(this.#options.unavailable_display) !== 'boolean') {
            this.#options.unavailable_display = '';
        }
        if (typeof(this.#options.unavailable_tag_close) !== 'string') {
            this.#options.unavailable_tag_close = '';
        }
        if (typeof(this.#options.unavailable_tag_open) !== 'string') {
            this.#options.unavailable_tag_open = '';
        }
        if (typeof(this.#options.unavailable_text) !== 'string') {
            this.#options.unavailable_text = '&hellip;';
        }
        if (typeof(this.#options.unavailable_after) !== 'number' && this.#options.unavailable_after !== false) {
            this.#options.unavailable_after = 2;
        }
        if (typeof(this.#options.unavailable_before) !== 'number' && this.#options.unavailable_before !== false) {
            this.#options.unavailable_before = 2;
        }
    }// #validateOptions


    /**
     * Create pagination links in HTML and put into web page.
     * 
     * @returns {string} Return generated pagination HTML.
     */
    createLinks() {
        const pagination_data = this.getPaginationData();
        this.#listenClickEvent();

        if (typeof(pagination_data) !== 'object') {
            return null;
        }

        // render the pagination. --------------------------------------
        const pagination_rendered = this.#getPaginationHTML(pagination_data);
        // end render the pagination. ----------------------------------

        document.querySelectorAll(this.#selector)?.forEach((eachDOM) => {
            eachDOM.innerHTML = pagination_rendered;
        });
    }// createLinks


    /**
     * Get options from `#options` property.
     * 
     * @since 0.0.2
     */
    get options() {
        return this.#options;
    }// options


    /**
     * Generate the pagination data for render in HTML.  
     * You can call to this method directly if you want to render pagination on your own styles.
     * 
     * @returns {object} Return generated pagination data as object.
     * @throws Throw the error if validate option failed.
     */
    getPaginationData() {
        this.#validateOptions();

        // prepare output.
        let output = {};

        this.#total_pages = Math.ceil(this.#options.total_records / this.#options.items_per_page);
        output['total_pages'] = this.#total_pages;
        output['page_number_type'] = this.#options.page_number_type;
        output['current_page_number_displaying'] = 1;
        // Set current page number "displaying". The current page number displaying will be always start from 1 even its type is start_num.
        // The page number "displaying" is not the same with page number value. 
        // The page number value is up to `page_number_type` settings while page number "displaying" is always like this. 1, 2, 3, ...
        if (this.#options.page_number_type === 'start_num') {
            // Page number type display page query string or URI as 0, 10, 20, 30, ...
            output['current_page_number_displaying'] = Math.ceil((this.#options.page_number_value / this.#options.items_per_page) + 1);
        } else if (this.#options.page_number_type === 'page_num') {
            // Page number type display page query string or URI as 1, 2, 3, 4, ...
            output['current_page_number_displaying'] = parseFloat(this.#options.page_number_value);
        }
        if (output['current_page_number_displaying'] > this.#total_pages) {
            output['current_page_number_displaying'] = parseFloat(this.#total_pages);
        } else if (output['current_page_number_displaying'] < 1) {
            output['current_page_number_displaying'] = 1;
        }

        output['overall_tag_open'] = this.#options.overall_tag_open;
        // Prepare for generate all pages by settings. -------------------------------
        let generated_pages = {};
        let generated_page_keys = [];

        // First page link
        generated_pages.first_page = {};
        generated_pages['first_page']['tag_open'] = null;
        generated_pages['first_page']['link'] = null;
        generated_pages['first_page']['page_value'] = null;
        generated_pages['first_page']['text'] = null;
        generated_pages['first_page']['tag_close'] = null;
        generated_page_keys.push('first_page');
        if (this.#options.first_page_text !== false) {
            if (
                this.#options.first_page_always_show === true || 
                (this.#options.first_page_always_show === false && !this.#isCurrentlyFirstPage())
            ) {
                generated_pages['first_page']['tag_open'] = this.#options.first_tag_open;
                generated_pages['first_page']['link'] = this.#generateUrl(this.#options.page_number_value, 'first');
                generated_pages['first_page']['page_value'] = this.#generateUrl(this.#options.page_number_value, 'first', true);
                generated_pages['first_page']['text'] = this.#options.first_page_text;
                generated_pages['first_page']['tag_close'] = this.#options.first_tag_close;
            }
        }

        // Previous page link
        generated_pages['previous_page'] = {};
        generated_pages['previous_page']['tag_open'] = null;
        generated_pages['previous_page']['link'] = null;
        generated_pages['previous_page']['page_value'] = null;
        generated_pages['previous_page']['text'] = null;
        generated_pages['previous_page']['tag_close'] = null;
        generated_page_keys.push('previous_page');
        if (this.#options.previous_page_text !== false) {
            if (
                this.#options.previous_page_always_show === true || 
                (this.#options.previous_page_always_show === false && !this.#isCurrentlyFirstPage())
            ) {
                generated_pages['previous_page']['tag_open'] = this.#options.previous_tag_open;
                generated_pages['previous_page']['link'] = this.#generateUrl(this.#options.page_number_value, 'previous');
                generated_pages['previous_page']['page_value'] = this.#generateUrl(this.#options.page_number_value, 'previous', true);
                generated_pages['previous_page']['text'] = this.#options.previous_page_text;
                generated_pages['previous_page']['tag_close'] = this.#options.previous_tag_close;
            }
        }

        // Numbering pages.
        if (this.#options.number_display === true) {
            let i;
            // Pages before unavailable
            if (
                this.#options.unavailable_display === true && 
                this.#options.unavailable_before !== false && 
                (output['current_page_number_displaying'] - this.#options.number_adjacent_pages) > 1
            ) {
                let number_adjacent_before_current = (output['current_page_number_displaying'] - this.#options.number_adjacent_pages);
                let number_before_unavailable =  this.#options.unavailable_before;
                if (number_adjacent_before_current <= number_before_unavailable) {
                    number_before_unavailable = (number_adjacent_before_current - 1);
                }
                for (i = 1; i <= number_before_unavailable; i++) {
                    generated_pages[i] = {};
                    generated_pages[i]['tag_open'] = this.#options.number_tag_open;
                    generated_pages[i]['link'] = this.#generateUrl(i);
                    generated_pages[i]['page_value'] = this.#generateUrl(i, '', true);
                    generated_pages[i]['text'] = i;
                    generated_pages[i]['tag_close'] = this.#options.number_tag_close;
                    generated_page_keys.push(i);
                }
                if (number_adjacent_before_current > (number_before_unavailable + 1)) {
                    generated_pages['unavailable_before'] = {};
                    generated_pages['unavailable_before']['tag_open'] = this.#options.unavailable_tag_open;
                    generated_pages['unavailable_before']['link'] = null;
                    generated_pages['unavailable_before']['page_value'] = null;
                    generated_pages['unavailable_before']['text'] = this.#options.unavailable_text;
                    generated_pages['unavailable_before']['tag_close'] = this.#options.unavailable_tag_close;
                    generated_page_keys.push('unavailable_before');
                }
                
            }// endif; unavailable before.

            // Adjacent pages before current
            if (this.#options.number_adjacent_pages > 0) {
                for (i = (output['current_page_number_displaying'] - this.#options.number_adjacent_pages); i < output['current_page_number_displaying']; i++) {
                    if (i > 0) {
                        generated_pages[i] = {};
                        generated_pages[i]['tag_open'] = this.#options.number_tag_open;
                        generated_pages[i]['link'] = this.#generateUrl(i);
                        generated_pages[i]['page_value'] = this.#generateUrl(i, '', true);
                        generated_pages[i]['text'] = i;
                        generated_pages[i]['tag_close'] = this.#options.number_tag_close;
                        generated_page_keys.push(i);
                    }
                }
            }

            // The current page
            generated_pages[i] = {};
            generated_pages[i]['tag_open'] = this.#options.current_tag_open;
            generated_pages[i]['link'] = (this.#options.current_page_link === true ? this.#generateUrl(i) : null);
            generated_pages[i]['current_page'] = true;
            generated_pages[i]['page_value'] = this.#generateUrl(i, '', true);
            generated_pages[i]['text'] = output['current_page_number_displaying'];
            generated_pages[i]['tag_close'] = this.#options.current_tag_close;
            generated_page_keys.push(i);

            // Adjacent pages after current
            if (this.#options.number_adjacent_pages > 0) {
                for (i = (output['current_page_number_displaying'] + 1); i <= (output['current_page_number_displaying'] + this.#options.number_adjacent_pages); i++) {
                    if (i <= this.#total_pages) {
                        generated_pages[i] = {};
                        generated_pages[i]['tag_open'] = this.#options.number_tag_open;
                        generated_pages[i]['link'] = this.#generateUrl(i);
                        generated_pages[i]['page_value'] = this.#generateUrl(i, '', true);
                        generated_pages[i]['text'] = i;
                        generated_pages[i]['tag_close'] = this.#options.number_tag_close;
                        generated_page_keys.push(i);
                    }
                }
            }

            // Pages after unavailable
            if (
                this.#options.unavailable_display === true && 
                this.#options.unavailable_after !== false && 
                (output['current_page_number_displaying'] + this.#options.number_adjacent_pages) < this.#total_pages
            ) {
                let number_adjacent_after_current = (output['current_page_number_displaying'] + this.#options.number_adjacent_pages);
                let number_after_unavailable = (this.#total_pages - (this.#options.unavailable_after - 1));
                if (number_adjacent_after_current >= number_after_unavailable) {
                    number_after_unavailable = (number_adjacent_after_current + 1);
                }
                if ((number_adjacent_after_current + 1) < number_after_unavailable) {
                    generated_pages['unavailable_after'] = {};
                    generated_pages['unavailable_after']['tag_open'] = this.#options.unavailable_tag_open;
                    generated_pages['unavailable_after']['link'] = null;
                    generated_pages['unavailable_after']['page_value'] = null;
                    generated_pages['unavailable_after']['text'] = this.#options.unavailable_text;
                    generated_pages['unavailable_after']['tag_close'] = this.#options.unavailable_tag_close;
                    generated_page_keys.push('unavailable_after');
                }
                for (i = number_after_unavailable; i <= this.#total_pages; i++) {
                    generated_pages[i] = {};
                    generated_pages[i]['tag_open'] = this.#options.number_tag_open;
                    generated_pages[i]['link'] = this.#generateUrl(i);
                    generated_pages[i]['page_value'] = this.#generateUrl(i, '', true);
                    generated_pages[i]['text'] = i;
                    generated_pages[i]['tag_close'] = this.#options.number_tag_close;
                    generated_page_keys.push(i);
                }
            }// endif; unavailable after.
        }// endif; display numbers.

        // Next page link
        generated_pages['next_page'] = {};
        generated_pages['next_page']['tag_open'] = null;
        generated_pages['next_page']['link'] = null;
        generated_pages['next_page']['page_value'] = null;
        generated_pages['next_page']['text'] = null;
        generated_pages['next_page']['tag_close'] = null;
        generated_page_keys.push('next_page');
        if (this.#options.next_page_text !== false) {
            if (
                this.#options.next_page_always_show === true || 
                (this.#options.next_page_always_show === false && !this.#isCurrentlyLastPage())
            ) {
                generated_pages['next_page']['tag_open'] = this.#options.next_tag_open;
                generated_pages['next_page']['link'] = this.#generateUrl(this.#options.page_number_value, 'next');
                generated_pages['next_page']['page_value'] = this.#generateUrl(this.#options.page_number_value, 'next', true);
                generated_pages['next_page']['text'] = this.#options.next_page_text;
                generated_pages['next_page']['tag_close'] = this.#options.next_tag_close;
            }
        }

        // Last page link
        generated_pages['last_page'] = {};
        generated_pages['last_page']['tag_open'] = null;
        generated_pages['last_page']['link'] = null;
        generated_pages['last_page']['page_value'] = null;
        generated_pages['last_page']['text'] = null;
        generated_pages['last_page']['tag_close'] = null;
        generated_page_keys.push('last_page');
        if (this.#options.last_page_text !== false) {
            if (
                this.#options.last_page_always_show === true || 
                (this.#options.last_page_always_show === false && !this.#isCurrentlyLastPage())
            ) {
                generated_pages['last_page']['tag_open'] = this.#options.last_tag_open;
                generated_pages['last_page']['link'] = this.#generateUrl((this.#total_pages * this.#options.items_per_page), 'last');
                generated_pages['last_page']['page_value'] = this.#generateUrl((this.#total_pages * this.#options.items_per_page), 'last', true);
                generated_pages['last_page']['text'] = this.#options.last_page_text;
                generated_pages['last_page']['tag_close'] = this.#options.last_tag_close;
            }
        }

        output['generated_pages'] = generated_pages;
        output['generated_page_keys'] = generated_page_keys;
        // End prepare for generate all pages by settings. ---------------------------
        output['overall_tag_close'] = this.#options.overall_tag_close;

        return output;
    }// getPaginationData


    /**
     * Re-create links on all selector matched.  
     * This is for reduce process on method `getPaginationData()` in case there is already one.
     * 
     * @since 0.0.4
     * @param {object} pagination_data Processed data from `getPaginationData()`.
     */
    reCreateLinks(pagination_data) {
        if (typeof(pagination_data) !== 'object') {
            throw new Error('The argument `pagination_data` must be object.');
        }

        // render the pagination. --------------------------------------
        const pagination_rendered = this.#getPaginationHTML(pagination_data);
        // end render the pagination. ----------------------------------

        document.querySelectorAll(this.#selector)?.forEach((eachDOM) => {
            eachDOM.innerHTML = pagination_rendered;
        });
    }// reCreateLinks


    /**
     * Update options that is already exists on class's property.
     * 
     * @param {object} options The options. See more at class constructor.
     */
    updateOptions(options = {}) {
        if (options?.events) {
            this.#events = options.events;
        }

        // force delete unwanted that may have.
        delete options.events;
        delete options.total_pages;
        // merge and set options.
        this.#options = {...this.#options, ...options};
    }// updateOptions


}// RdPagination


if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = RdPagination;
}
