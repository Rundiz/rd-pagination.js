/**
 * JS file for sample08.html
 * 
 * This file is no need in your project.
 */


class Sample08 {


    /**
     * @type {RdPagination} Custom pagination object.
     */
    #paginationObj;


    /**
     * @type {number} Current start offset for main contents.
     */
    #currentOffset = 0;


    /**
     * @type {object} Raw data of custom pagination.
     */
    #customPaginationRawData = {};


    /**
     * @type {array} Dummy data from fetched will be store here.
     */
    #dummyData = [];


    /**
     * @type {number} Number of items per page to display.
     */
    #itemsPerPage = 10;


    /**
     * @type {string} Main content selector.
     */
    #mainContentSelector = '#content';


    /**
     * @type {string} Custom pagination selector for main content.
     */
    #mainCustomPaginationSelector = '#main-content-pagination-custom';


    /**
     * @type {string} Pagination selector for main content.
     */
    #mainPaginationSelector = '#main-content-pagination';


    /**
     * @type {string} Side bar content selector.
     */
    #sidebarContentSelector = '#sidebar-content';


    /**
     * Delay before process next. Use with `async`/`await`.
     * 
     * @param {number} delayInms 
     * @returns 
     */
    #delay(delayInms) {
        if (typeof(delayInms) !== 'number') {
            delayInms = 0;
        }
        return new Promise(resolve => setTimeout(resolve, delayInms));
    }// #delay


    /**
     * Diaplay custom pagination for main contents.
     * 
     * @returns {void} Return void if not found a placeholder (wrapper) to display custom pagination.
     */
    #content_displayCustomPagination() {
        const paginationPlaceholder = document.querySelector(this.#mainCustomPaginationSelector);
        if (!paginationPlaceholder) {
            return ;
        }
        const rawPaginationData = this.#customPaginationRawData;

        const generatedPages = rawPaginationData.generated_pages;
        let paginationHTML = '<ul class="rdpjs-custom-pagination-selectbox">';
        paginationHTML += '<li><a href="' + generatedPages?.previous_page?.link + '"'
            + ' data-rd-pagination-link="true" data-rd-pagination-page-value="' + generatedPages?.previous_page?.page_value + '"'
            + '>' 
            + '&lsaquo;'
            + '</a></li>';
        paginationHTML += '<li>';
        paginationHTML += '<select id="custom-pagination">';
        for (let i = 1; i <= rawPaginationData.total_pages; ++i) {
            paginationHTML += '<option value="' + i + '"';
            paginationHTML += ' data-rd-pagination-page-value="' + ((i - 1) * parseFloat(this.#itemsPerPage)) + '"';
            if (i === rawPaginationData.current_page_number_displaying) {
                paginationHTML += ' selected';
            }
            paginationHTML += '>';
            paginationHTML += i;
            paginationHTML += '</option>';
        }// endfor;
        paginationHTML += '</select> / <span class="main-total-pages"></span>';
        paginationHTML += '</li>';
        paginationHTML += '<li><a href="' + generatedPages?.next_page?.link + '"'
            + ' data-rd-pagination-link="true" data-rd-pagination-page-value="' + generatedPages?.next_page?.page_value + '"' 
            + '>'
            + '&rsaquo;'
            + '</a></li>';
        paginationHTML += '</ul>';
        paginationPlaceholder.innerHTML = paginationHTML;
    }// #content_displayCustomPagination


    /**
     * Display pagination placeholders such as number of start, end, total.
     * 
     * @param {number} start Start offset number.
     */
    #content_displayPaginationPlaceholders(start = 0) {
        if (typeof(start) !== 'number') {
            start = 0;
        }

        const allMainStartItem = document.querySelectorAll('.main-start-item');
        allMainStartItem?.forEach((mainStartItem) => {
            mainStartItem.innerText = parseFloat(start) + 1;
        });

        let endItemNumber = (parseFloat(start) + this.#itemsPerPage);
        if (endItemNumber > this.#dummyData.length) {
            endItemNumber = this.#dummyData.length;
        }
        const allMainEndItem = document.querySelectorAll('.main-end-item');
        allMainEndItem?.forEach((mainEndItem) => {
            mainEndItem.innerText = endItemNumber;
        });

        const allMainTotalItems = document.querySelectorAll('.main-total-items');
        allMainTotalItems?.forEach((mainTotalItems) => {
            mainTotalItems.innerText = this.#dummyData.length;
        });

        const allMainTotalPages = document.querySelectorAll('.main-total-pages');
        allMainTotalPages?.forEach((mainTotalPages) => {
            mainTotalPages.innerText = this.#customPaginationRawData.total_pages;
        });
    }// #content_displayPaginationPlaceholders


    /**
     * Pagination tasks.
     * 
     * Display custom pagination & display placeholders in pagination such as start item, end item, etc.
     * 
     * @param {HTMLElement|null} thisTarget The selected element that is active on event such as clicked, changed. Use `null` for not on event.
     * @param {number} pageValue Pagination value (or offset) on currently active page.
     */
    #content_paginationTasks(thisTarget, pageValue) {
        this.#content_displayCustomPagination();
        this.#content_displayPaginationPlaceholders(pageValue);

        if (thisTarget instanceof HTMLElement) {
            let href = '';
            if (thisTarget.href) {
                href = thisTarget.href;
            } else if (thisTarget.options) {
                const selected = thisTarget.options[thisTarget.options.selectedIndex];
                href = '?start=' + selected.dataset.rdPaginationPageValue;
            }
            
            if ('' !== href) {
                const data = {
                    'pageValue': pageValue,
                    'prevURL': window.location.href,
                };
                window.history.pushState(data, '', href);
            }
        }
    }// #content_paginationTasks


    /**
     * Listen change on custom pagination select box.
     */
    #listenCustomPaginationChangeEvent() {
        document.addEventListener('change', (event) => {
            const thisTarget = event.target;
            if (thisTarget.getAttribute('id') !== 'custom-pagination') {
                return ;
            } else {
                event.preventDefault();
            }

            const selected = thisTarget.options[thisTarget.options.selectedIndex];
            const pageValue = parseInt(selected.dataset.rdPaginationPageValue);
            this.#currentOffset = pageValue;
            // update main contents
            this.content_display();
            // update option to pagination class and re-display custom pagination again.
            this.#paginationObj.updateOptions({page_number_value: pageValue});
            this.#customPaginationRawData = this.#paginationObj.getPaginationData();
            this.#content_paginationTasks(thisTarget, pageValue);
            // re-create primary pagination links.
            this.#paginationObj.reCreateLinks(this.#customPaginationRawData);
        });
    }// #listenCustomPaginationChangeEvent


    /**
     * Listen click on custom pagination links (prev/next).
     */
    #listenCustomPaginationClickEvent() {
        document.addEventListener('click', (event) => {
            let thisTarget = event.target;
            if (
                thisTarget.closest('[data-rd-pagination-link]') &&
                thisTarget.closest(this.#mainCustomPaginationSelector)
            ) {
                thisTarget = thisTarget.closest('[data-rd-pagination-link]');
                event.preventDefault();
            } else {
                return ;
            }

            const pageValue = parseInt(thisTarget.dataset.rdPaginationPageValue);
            this.#currentOffset = pageValue;
            // update main contents
            this.content_display();
            // update option to pagination class and re-display custom pagination again.
            this.#paginationObj.updateOptions({page_number_value: pageValue});
            this.#customPaginationRawData = this.#paginationObj.getPaginationData();
            this.#content_paginationTasks(thisTarget, pageValue);
            // re-create primary pagination links.
            this.#paginationObj.reCreateLinks(this.#customPaginationRawData);
        });
    }// #listenCustomPaginationClickEvent


    /**
     * Listen pop state and display contents based on URL.
     */
    #listenPopState() {
        window.addEventListener('popstate', (event) => {
            if (typeof(event.state?.pageValue) === 'number') {
                const pageValue = parseInt(event.state.pageValue);
                this.#currentOffset = pageValue;
                // update main contents
                this.content_display();
                // update option to pagination class and re-display custom pagination again.
                this.#paginationObj.updateOptions({page_number_value: pageValue});
                this.#customPaginationRawData = this.#paginationObj.getPaginationData();
                this.#content_paginationTasks(null, pageValue);
                // re-create primary pagination links.
                this.#paginationObj.reCreateLinks(this.#customPaginationRawData);
            }
        });
    }// #listenPopState


    /**
     * Set initial history state.
     */
    #setInitialHistoryState() {
        this.content_prepareOffset();
        const data = {
            'pageValue': this.#currentOffset,
            'pageURL': window.location.href,
        };
        window.history.replaceState(data, '', window.location.href);
    }// #setInitialHistoryState


    /**
     * Sample 8 JS class constructor.
     */
    constructor() {
        this.#listenPopState();
        this.#setInitialHistoryState();
    }// constructor


    /**
     * Display main contents.
     * 
     * @async
     * @returns 
     */
    async content_display() {
        const start = this.#currentOffset;

        const data = this.#dummyData.slice(start, (parseFloat(start) + this.#itemsPerPage));

        return new Promise((resolve, reject) => {
            let dataHTML = '<div class="rdpjs-data-table-wrapper">';
            dataHTML += '<table class="rdpjs-data-table">';
            dataHTML += '<thead><tr><th>ID</th><th>First name</th><th>Last name</th><th>Gender</th></tr></thead>';
            dataHTML += '<tbody>';
            for (const row of data) {
                dataHTML += '<tr>';
                dataHTML += '<td>' + row.id + '</td>';
                dataHTML += '<td>' + row.first_name + '</td>';
                dataHTML += '<td>' + row.last_name + '</td>';
                dataHTML += '<td>' + row.gender + '</td>';
                dataHTML += '</tr>';
            }
            dataHTML += '</tbody>';
            dataHTML += '</table>';
            dataHTML += '</div>';
            const contentPlaceholder = document.querySelector(this.#mainContentSelector);
            if (contentPlaceholder) {
                contentPlaceholder.innerHTML = dataHTML;
            }

            resolve(data);
        });
    }// content_display


    /**
     * Prepare main content data.
     * 
     * @async 
     * @returns {fetch}
     */
    content_prepareData() {
        return fetch('./mockdata.json')
        .then((rawResponse) => {
            return rawResponse.json();
        })
        .then((response) => {
            this.#dummyData = response;
        });
    }// content_prepareData


    /**
     * Prepare current offset.
     */
    content_prepareOffset() {
        const params = new URL(document.location.toString()).searchParams;
        const start = params.get('start');
        if (start) {
            this.#currentOffset = parseInt(start);
        }
    }// content_prepareOffset


    /**
     * Setup main contents.
     * 
     * This will be called when pagination from `createLinks()` were clicked.
     * 
     * @param {object} thisTarget 
     * @param {object} event 
     * @param {object} options 
     */
    content_setup(thisTarget, event, options) {
        event.preventDefault();
        const pageValue = parseInt(thisTarget.dataset.rdPaginationPageValue);
        sample08Obj.#currentOffset = pageValue;
        sample08Obj.content_display();

        // get raw data to custom pagination and display them again.
        sample08Obj.#customPaginationRawData = sample08Obj.#paginationObj.getPaginationData();
        sample08Obj.#content_paginationTasks(thisTarget, pageValue);
    }// content_setup


    /**
     * Setup main pagination.
     */
    content_setupPagination() {
        this.#paginationObj = new RdPagination(this.#mainPaginationSelector, {
            base_url: '?start=%PAGENUMBER%',
            page_number_value: this.#currentOffset,
            total_records: this.#dummyData.length,
            items_per_page: this.#itemsPerPage,

            current_page_link: true,
            current_page_link_attributes: {
                class: 'current-link active-link page-link',
            },
            current_tag_close: '</span>',
            current_tag_open: '<span class="current-page pagination-item">',

            first_page_always_show: true,
            first_page_link_attributes: {
                class: 'first-page-link page-link',
            },
            first_page_text: '&larrb;',
            first_tag_close: '</span>',
            first_tag_open: '<span class="first-page pagination-item">',

            last_page_always_show: true,
            last_page_link_attributes: {
                class: 'last-page-link page-link',
            },
            last_page_text: '&rarrb;',
            last_tag_close: '</span>',
            last_tag_open: '<span class="last-page pagination-item">',

            next_page_always_show: true,
            next_page_link_attributes: {
                class: 'next-page-link page-link',
            },
            next_page_text: '&rarr;',
            next_tag_close: '</span>',
            next_tag_open: '<span class="next-page pagination-item">',

            number_adjacent_pages: 1,
            number_display: true,
            number_page_link_attributes: {
                class: 'number-page-link page-link',
            },
            number_tag_close: '</span>',
            number_tag_open: '<span class="number-page pagination-item">',

            overall_tag_close: '</div>',
            overall_tag_open: '<div class="inner-pagination pagination-list">',

            previous_page_always_show: true,
            previous_page_link_attributes: {
                class: 'prev-page-link page-link',
            },
            previous_page_text: '&larr;',
            previous_tag_close: '</span>',
            previous_tag_open: '<span class="prev-page pagination-item">',

            unavailable_display: false,
            unavailable_text: '&#8229;',
            unavailable_tag_close: '</span>',
            unavailable_tag_open: '<span class="unavailable-page pagination-item">',
            unavailable_after: 1,
            unavailable_before: 1,
            events: {
                onclick: this.content_setup,
            },
        });
        this.#paginationObj.createLinks();

        this.#customPaginationRawData = this.#paginationObj.getPaginationData();
        this.#listenCustomPaginationClickEvent();
        this.#listenCustomPaginationChangeEvent();
        this.#content_paginationTasks(null, this.#currentOffset);
    }// content_setupPagination


    /**
     * Display sidebar content.
     * 
     * @async This method will be delayed before render. Assume that it works like AJAX.
     * @param {number} dateAdd Number of date to add.
     */
    async sidebar_displayContent(dateAdd = 0) {
        if (typeof(dateAdd) !== 'number') {
            dateAdd = 0;
        }

        if (0 === dateAdd) {
            await this.#delay(900);
        } else {
            await this.#delay(300);
        }

        const dateObj = new Date();
        dateObj.setDate(dateObj.getDate() + dateAdd);

        return new Promise((resolve) => {
            let sidebarContent = '';
            if (0 === dateAdd) {
                sidebarContent += 'Start date: ';
            }
            sidebarContent += dateObj.getDate() + ' ' + dateObj.toLocaleString('en', { month: 'long' }) + ' ' + dateObj.getFullYear();
            const sidebarHTML = document.querySelector(this.#sidebarContentSelector);
            if (sidebarHTML) {
                sidebarHTML.innerHTML = sidebarContent;
            }
            resolve(dateObj);
        });
    }// sidebar_displayContent


    /**
     * Setup sidebar content.
     * 
     * @param {object} thisTarget 
     * @param {object} event 
     * @param {object} options 
     */
    sidebar_setupContent(thisTarget, event, options) {
        event.preventDefault();
        const pageValue = parseInt(thisTarget.dataset.rdPaginationPageValue);
        sample08Obj.sidebar_displayContent(pageValue);
    }// sidebar_setupContent


    /**
     * Setup sidebar pagination.
     */
    sidebar_setupPagination() {
        const paginationObj = new RdPagination('#sidebar-pagination', {
            base_url: '#?sidebar_start=%PAGENUMBER%',
            page_number_value: 0,
            total_records: 90,
            page_number_type: 'page_num',

            number_display: false,
            first_page_text: false,
            last_page_text: false,

            previous_page_always_show: true,
            previous_page_link_attributes: {
                class: 'prev-page-link page-link',
            },
            previous_tag_close: '</span>',
            previous_tag_open: '<span class="prev-page pagination-item">',

            next_page_always_show: true,
            next_page_link_attributes: {
                class: 'next-page-link page-link',
            },
            next_tag_close: '</span>',
            next_tag_open: '<span class="next-page pagination-item">',

            overall_tag_close: '</div>',
            overall_tag_open: '<div class="inner-pagination pagination-list">',
            events: {
                onclick: this.sidebar_setupContent,
            },
        });
        paginationObj.createLinks();

        document.getElementById('sidebar-max-date').innerText = (90 / 10);// 90 is `total_records`, 10 is default items per page.
    }// sidebar_setupPagination


}// Sample08


/**
 * @type {Sample08} The class Sample08
 */
let sample08Obj;
// ====================================
document.addEventListener('DOMContentLoaded', (event) => {
    sample08Obj = new Sample08();

    sample08Obj.content_prepareData()
    .then(() => {
        return sample08Obj.content_display();
    })
    .then((response) => {
        sample08Obj.content_setupPagination();
    });

    sample08Obj.sidebar_displayContent()
    .then((response) => {
        sample08Obj.sidebar_setupPagination();
    });
});