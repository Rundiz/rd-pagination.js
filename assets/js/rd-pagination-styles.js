/**
 * Rundiz Pagination.JS pre-set styles.
 * 
 * @package rd-pagination.js
 * @since 0.0.1
 */


/**
 * Rundiz Pagination.JS pre-set styles class.
 * 
 * @since 0.0.1
 */
class RdPaginationStyles {


    /**
     * Get Bootstrap 3 style options.
     * 
     * @returns {object}
     */
    #bootstrap3() {
        return {
            current_page_link: true,
            current_page_link_attributes: {
                'aria-current': 'page',
            },
            current_tag_close: '</li>',
            current_tag_open: '<li class="active" aria-current="page">',

            first_page_text: false,

            last_page_text: false,

            next_tag_close: '</li>',
            next_tag_open: '<li>',

            number_tag_close: '</li>',
            number_tag_open: '<li>',

            overall_tag_close: '</ul>',
            overall_tag_open: '<ul class="pagination">',

            previous_tag_close: '</li>',
            previous_tag_open: '<li>',
        };
    }// #bootstrap3


    /**
     * Get Bootstrap 4 style options.
     * 
     * @returns {object}
     */
    #bootstrap4() {
        return {
            current_page_link: true,
            current_page_link_attributes: {
                class: 'page-link',
                'aria-current': 'page',
            },
            current_tag_close: '</li>',
            current_tag_open: '<li class="page-item active" aria-current="page">',

            first_page_text: false,

            last_page_text: false,

            next_page_link_attributes: {
                class: 'page-link',
            },
            next_tag_close: '</li>',
            next_tag_open: '<li class="page-item">',

            number_page_link_attributes: {
                class: 'page-link',
            },
            number_tag_close: '</li>',
            number_tag_open: '<li class="page-item">',

            overall_tag_close: '</ul>',
            overall_tag_open: '<ul class="pagination">',

            previous_page_link_attributes: {
                class: 'page-link',
            },
            previous_tag_close: '</li>',
            previous_tag_open: '<li class="page-item">',
        };
    }// #bootstrap4


    /**
     * Get Bootstrap 5 style options.
     * 
     * @returns {object}
     */
    #bootstrap5() {
        return this.#bootstrap4();
    }// #bootstrap5


    /**
     * Get Bulma 1 style options.
     * 
     * @returns {object}
     */
    #bulma1() {
        return {
            current_page_link: true,
            current_page_link_attributes: {
                class: 'pagination-link is-current',
                'aria-current': 'page',
            },
            current_tag_close: '</li>',
            current_tag_open: '<li>',

            first_page_text: false,

            last_page_text: false,

            next_page_link_attributes: {
                class: 'pagination-link',
            },
            next_tag_close: '</li>',
            next_tag_open: '<li>',

            number_page_link_attributes: {
                class: 'pagination-link',
            },
            number_tag_close: '</li>',
            number_tag_open: '<li>',

            overall_tag_close: '</ul>',
            overall_tag_open: '<ul class="pagination-list">',

            previous_page_link_attributes: {
                class: 'pagination-link',
            },
            previous_tag_close: '</li>',
            previous_tag_open: '<li>',
        };
    }// #bulma1


    /**
     * Get Foundation 6 style options.
     * 
     * @returns {object}
     */
    #foundation6() {
        return {
            current_page_link: false,
            current_page_link_attributes: {
                'aria-current': 'page',
            },
            current_tag_close: '</li>',
            current_tag_open: '<li class="current">',

            first_page_text: false,

            last_page_text: false,

            next_page_text: 'Next',
            next_tag_close: '</li>',
            next_tag_open: '<li class="pagination-next">',

            number_tag_close: '</li>',
            number_tag_open: '<li class="page-item">',

            overall_tag_close: '</ul>',
            overall_tag_open: '<ul class="pagination">',

            previous_page_text: 'Previous',
            previous_tag_close: '</li>',
            previous_tag_open: '<li class="pagination-previous">',
        };
    }// #foundation6


    /**
     * Get options based on style name.
     * 
     * @param {string} name The style name. Accepted: 'bootstrap5', 'bootstrap4', 'bootstrap3', 'bulma1', 'foundation6'.
     * @returns {object} Return read to use options for Rundiz Pagination.JS.
     * @throws Throw the errors if invalid argument.
     */
    getOptionsStyle(name) {
        if (typeof(name) !== 'string') {
            throw new Error('The argument name must be string.');
        }
        name = name.trim();

        if ('bootstrap5' === name) {
            return this.#bootstrap5();
        } else if ('bootstrap4' === name) {
            return this.#bootstrap4();
        } else if ('bootstrap3' === name) {
            return this.#bootstrap3();
        }

        if ('bulma1' === name) {
            return this.#bulma1();
        } else if ('foundation6' === name) {
            return this.#foundation6();
        }
        return {};
    }// getOptionsStyle


}// RdPaginationStyles
