import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

const getURL = (id) => `https://www.doctolib.fr/search_results/${id}.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005&speciality_id=5494&search_result_format=json&force_max_limit=2`;

const getCenterIds = async () => {
  const { BASE_VACCINE_CENTERS_URL } = process.env;

  const html = await fetch(BASE_VACCINE_CENTERS_URL)
    .then(response => response.text());
  const dom = cheerio.load(html);

  const ids = [];

  dom('.js-dl-search-results-calendar').each((i, e) => {
    const props = dom(e).data('props');

    if (props.searchResultId) {
      ids.push(props.searchResultId)
    };
  });

  return ids;
}

const getCenterWithAvailability = async () => {
  const ids = await getCenterIds();

  for (const id of ids) {
    const data = await fetch(getURL(id))
      .then(res => res.json());

    if (data.total !== 0) {
      return {
        name: data.search_result.last_name,
      }
    }
  }

  return null;
};

export default getCenterWithAvailability;
