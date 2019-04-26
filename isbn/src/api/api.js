const HOST = 'http://isbn.szmesoft.com';
const API = {
  detail: {
  bookInfo: `${HOST}/isbn/query?isbn=`,
  thumb: `${HOST}/ISBN/GetBookPhoto?ID=`
  }
}

export default API;