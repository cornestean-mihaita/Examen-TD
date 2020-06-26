function run() {
    new Vue({
      el: '#details',
      data: {
        id: 'default',
        piece: {}
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");

        axios.get('http://localhost:3000/pieces/'+this.id).then(
            (response) => {
                this.piece = response.data;
                console.log(response.data)
            }
        );
      },
      methods: {

      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  