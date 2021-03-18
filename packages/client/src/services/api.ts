const api = {
  queryProducts: (query: string) => {
    const url = "https://api.mercadolibre.com/sites/MLA/search?q=";

    return fetch(`${url}${query}`).then((res) => {
      return res.json();
    });
  },
};

export default api;
