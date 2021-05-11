import fetch from 'node-fetch';

const getURL = (id) => `https://www.doctolib.fr/search_results/${id}.json?ref_visit_motive_ids%5B%5D=6970&ref_visit_motive_ids%5B%5D=7005&speciality_id=5494&search_result_format=json&force_max_limit=2`;

const getCenterInfo = async (id) => {
  const data = await fetch(getURL(id))
    .then(res => res.json());

  console.log(data);
  // break;

  return {
    hasAvailability: data.total !== 1,
    name: data.search_result.last_name,
  };
};

export default getCenterInfo;
