import axios from "axios";

const { CONTENTFUL_SPACE_ID, CONTENTFUL_API_TOKEN } = process.env;
const client = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}`,
  headers: {
    Authorization: `Bearer ${CONTENTFUL_API_TOKEN}`,
  },
});

export default {
  async getEntries(contentType) {
    try {
      const res = await client.get(`/entries?content_type=${contentType}`);
      return res.data.items;
    } catch (e) {
      console.error(e);
    }
  },

  async getEntry(contentType, slug) {
    try {
      const res = await client.get(
        `/entries?fields.slug=${slug}&content_type=${contentType}`
      );
      return res.data.items[0].fields;
    } catch (e) {
      console.error(e);
    }
  },
};
