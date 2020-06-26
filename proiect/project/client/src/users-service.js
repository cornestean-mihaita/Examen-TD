function users() {
  get = function () {
    return axios.get('http://localhost:3000/pieces');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/pieces/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}
