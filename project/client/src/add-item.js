function run() {
    new Vue({
      el: '#add-item',
      data: {
        id: 'default',
        piece: {},
        pizza_pic: '' ,
        message: '',
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");


      },
      methods: {
          add:function(){
            console.log(this.piece)
            if(this.piece.name !=undefined){
                console.log(this.piece)
            axios.put('http://localhost:3000/pieces', this.piece).then(response => { console.log(response);
            this.message=response.data;
            })
            }
            else
            /*{
              setTimeout(() => {  this.message="add at least the name " }, 100);
              setTimeout(() => {  this.message='' }, 2000);
            }*/
            this.message="You have to introduce a name.";  
        },

          onFileSelected(event) {
            const reader = new FileReader();
            this.selectedFile = event.target.files[0]
            reader.onloadend = () => {

            var strImage = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
            this.pizza_pic = strImage
            this.piece.img=strImage
            }
            reader.readAsDataURL(this.selectedFile);
        },

      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  