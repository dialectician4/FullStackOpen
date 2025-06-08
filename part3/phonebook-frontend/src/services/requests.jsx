import axios from "axios";

const api_url = "/phonebook/api/persons";

const get_entries = () => {
  return axios
    .get(api_url)
    .then((response) => response.data);
};

const create_entry = (entry) => {
  return axios
    .post(api_url, entry)
    .then((response) => response.data);
};

const delete_entry = (id) => axios.delete(api_url + "/" + id);

const update_entry = (id, updated_entry) =>
  axios.put(`${api_url}/${id}`, updated_entry).then((repsonse) =>
    repsonse.data
  );

export default { get_entries, create_entry, delete_entry, update_entry };
