var api = require('./src/api.js').app;
const fs = require('fs');
const piecesFilepath = './src/pieces.json';
var pieces1 = require('./src/pieces.json');

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/pieces', function (request, response) {
  response.json(getpieces());
});

api.get('/pieces/:id', function (request, response) {
  let piece = getpieceById(request.params.id);
  if (piece) response.json(piece);
  response.json('not found');
});

api.put('/pieces', function (request, response) {
  console.log(request.body)
  savepiece(request.body);
  response.json('User was saved succesfully');
});

api.post('/pieces/:id', function (request, response) {
  // in request o sa-mi vina un obiect de tip piece piecee o sa aiba un anumit id
  
  console.log(request.body,request.params.id);//un obiect de tipul piece actualizat pe client
  console.log(updatepieceById(request.body,request.params.id))
  // citim pieces din fisier pe baza id-ului primit de la client
  // cautam daca exista indexul de pe request.body
  // daca exista actualizam parametrii acestui produs/item
  // salvam in fisier produsele actualizate
  response.json('piece was saved succesfully');
});

api.delete('/pieces/:index', function (request, response) {
  // delete din fisier pe baza unui id
  console.log(request.params.index)
  pieces1.splice(request.params.index,1)
  const jsonString = JSON.stringify(pieces1,null,4)
  response.json(jsonString)
  
  fs.writeFileSync(piecesFilepath, jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file ')
    }
                                                }
	             )
  
  
//const jsonString = JSON.stringify(pieces,null,4)
  

  //response.json('piece with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getpieces() {
  let pieces = [];
  try {
    pieces = JSON.parse(fs.readFileSync(piecesFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return pieces;
}

function savepiece(piece) {
  let pieces = getpieces();// citire json din fisier
  let maxId = getMaxId(pieces);  // get maximum id form pieces array
  piece.id = maxId+1;// generare id unic
  pieces.push(piece);// adaugare masina noua in array
  try {
    fs.writeFileSync(piecesFilepath, JSON.stringify(pieces,null,4));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}


function getMaxId(pieces) {
  let max = 0;
  for (var i=0; i<pieces.length;i++) {
    if(max < pieces[i].id) {
      max = pieces[i].id;
    }
  }
  return max;
}

function getpieceById(id){
  let pieces = getpieces();// citire json din fisier
  let selectedpiece = null;
  for(var i=0; i<pieces.length; i++) {
    if(id == pieces[i].id) selectedpiece = pieces[i];
  }
  return selectedpiece;
}

function updatepieceById(data,id){
  let pieces = getpieces();// citire json din fisier
  console.log(data,id)
  for(var i=0; i<pieces.length; i++) {
    if(id == pieces[i].id)
     pieces[i]=data;
  }
  try {
    fs.writeFileSync(piecesFilepath, JSON.stringify(pieces,null,4));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
  
  
}
