function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      pieces: [],
      usersService: null,
      message: ''
    },
    created: function () {
      this.usersService = users();
      this.usersService.get().then(response => {(this.pieces = response.data),console.log(response.data)});
    },
    methods: {
      deletepiece: function(id) {
        console.log('HTTP DELETE spre backend, piece: '+id);
        this.usersService.remove(id).then(response => {console.log(response.data)
          this.usersService.get().then(response => (this.pieces = response.data));
        });
       // 
      },
      addpiece:function(){
        window.open("additem.html","_self")
      }

    }
  });

 // indexComponent.use(VueMaterial);

}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
