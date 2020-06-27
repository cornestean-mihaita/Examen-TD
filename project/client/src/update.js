function run() {
    new Vue({
      el: '#update',
      data: {
        id: '',
        message: '',
        piece: {}
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");

        axios.get('http://localhost:3000/pieces/'+this.id).then(
            (response) => {
                this.piece = response.data;
            }
        );
      },
      methods: {
        update: function(id){

            console.log(this.piece,id);

            return axios.post('http://localhost:3000/pieces/'+id, this.piece).then(
                (response) => {
                    this.message = response.data; // saved
                }
            );


        }
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  