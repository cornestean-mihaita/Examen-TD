function run() {
    new Vue({
      el: '#add-item',
      data: {
        id: 'default',
        piece: {},
        pizza_pic: '',
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");


      },
      methods: {
          add:function(){
            if(this.piece.img !=undefined){
                console.log(this.piece)
            axios.put('http://localhost:3000/pieces', this.piece).then(response => { console.log(response) })
            }  
        },

          onFileSelected(event) {
            const reader = new FileReader();
            this.selectedFile = event.target.files[0]
            reader.onloadend = () => {

            var strImage = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
            this.piece.img = strImage
            
            }
            reader.readAsDataURL(this.selectedFile);
        },

      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  