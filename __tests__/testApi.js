import catsForTesting from "../utils/catsForTesting";
import { fetchCats } from "../utils/config";

beforeEach(() => {
  fetch.resetMocks();
});

test("Test Successful API call to fetch cats with mocked data", async () => {
  fetch.mockResponseOnce(JSON.stringify(catsForTesting));
  const cats = await fetchCats();
  expect(cats).toEqual(expect.arrayContaining(catsForTesting));
});

// test("Test Successful API call to fetch cats with live API", async () => {
//   const cats = await fetchCats(50);
//   console.log(cats);
//   expect(cats).toHaveLength(50);
// });
