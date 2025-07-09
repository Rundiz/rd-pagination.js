const RdPagination = require('../assets/js/rd-pagination.umd');
const myMock = jest.fn();


describe('Test assets/js/rd-pagination.js options.', () => {
  const defaultOptions = {
    base_url: '?page=%PAGENUMBER%',
    page_number_value: 0,
    total_records: 200,
  };
  const rdPaginationObj = new RdPagination('.rd-pagination', defaultOptions);
  const bound = myMock.bind(rdPaginationObj);
  bound();

  myMock.mockReturnValueOnce(myMock.mock.contexts[0].options.items_per_page);
  test('Test default options', () => {
    expect(myMock()).toBe(10);
  });
  rdPaginationObj.updateOptions({items_per_page: 20});
  myMock.mockReturnValueOnce(myMock.mock.contexts[0].options.items_per_page);
  test('Test updated option', () => {
    expect(myMock()).toBe(20);
  });
});


describe('Test assets/js/rd-pagination.js errors.', () => {
  const rdPaginationObj = new RdPagination('.rd-pagination', {base_url: null});
  const rdPaginationObj2 = new RdPagination('.rd-pagination', {base_url: ''});
  const rdPaginationObj3 = new RdPagination('.rd-pagination', {
    base_url: '?page=%PAGENUMBER%',
    page_number_value: 'a',
  });
  const rdPaginationObj4 = new RdPagination('.rd-pagination', {
    base_url: '?page=%PAGENUMBER%',
    page_number_value: 0,
    total_records: 'a',
  });
  test('Test throw error', () => {
    expect(() => rdPaginationObj.getPaginationData()).toThrow(/string/);
    expect(() => rdPaginationObj2.getPaginationData()).toThrow(/base_url/);
    expect(() => rdPaginationObj3.getPaginationData()).toThrow(/page_number_value/);
    expect(() => rdPaginationObj4.getPaginationData()).toThrow(/total_records/);
  });
});


describe('Test assets/js/rd-pagination.js pagination data', () => {
  const defaultOptions = {
    base_url: '?page=%PAGENUMBER%',
    page_number_value: 0,
    total_records: 200,
  };
  const rdPaginationObj = new RdPagination('.rd-pagination', defaultOptions);
  const pagingData1 = rdPaginationObj.getPaginationData();
  test('Test get pagination data', () => {
    expect(pagingData1.generated_pages.first_page.text).toBeNull();
    expect(pagingData1.generated_pages.previous_page.text).toBeNull();
    expect(pagingData1.generated_pages.next_page.text !== '').toBeTruthy();
    expect(pagingData1.generated_pages.last_page.text !== '').toBeTruthy();
    expect(Object.keys(pagingData1.generated_pages).length).toEqual(10);// current 1 + adjacent 5 + 4 (first, prev, next, last) = 10
    expect(pagingData1.total_pages).toEqual(20);
  });
});