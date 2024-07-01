
const ENDPOINT = "http://localhost:3000/monedas";
let dataBackend = [];

function getAll() {
    // Necesitaremos utilizar al elemento XMLHttpRequest
    // este objeto nos permite realizar peticiones asincronas
    // cuando tenemos la respuesta del servidor, lanza eventos
    // Nosotros le agregaremos manejadores a dichos eventos
    // https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest

    let xhr = new XMLHttpRequest();
    let myArr;

    xhr.addEventListener("readystatechange", function () {

        //agregamos el manejador de eventos
        if (xhr.readyState == 4) {
            // Petición finalizada
            if (xhr.status == 200) {
                // todo OK
                console.log("todo OK");
            } else if (xhr.status == 404) {
                // No consiguió el recurso
                console.log("No consiguió el recurso");
            } else if (xhr.status >= 300 && xhr.status < 400) {
                // todos los 300 son fallas en el servidor
                console.log("todos los 300 son fallas en el servidor");
            } else {
                // otros estados
                console.log("otros estados");
            }

            if (xhr.status >= 200 && xhr.status < 300) {
                // todo OK
                const data = JSON.parse(xhr.responseText);
                dataBackend = data;
                setTable(dataBackend);

                //myArr.push(obj);
                //console.log(myArr);
                
            } else {
                // falló algo
                console.log("ERR " + xhr.status + " :" + xhr.statusText);
                return myArr;
            }
        }
    });

    // y ahora debemos abrir la petición
    xhr.open("GET", `${ENDPOINT}`);

    // // lo ultimo que me queda es enviar la petición
    xhr.send();
}


function getOne(id) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      //agregamos el manejador de eventos
      if (xhr.readyState == 4) {
        // Petición finalizada
        if (xhr.status == 200) {
          // respuesta del servidor si actualiza con exito
          const obj = JSON.parse(xhr.responseText);
          //console.log(obj);
        } else {
          // falló algo
          console.log("ERR " + xhr.status + " :" + xhr.statusText);
        }
      }
    });
  
    xhr.open("GET", `${ENDPOINT}/${id}`);
  
    xhr.send(); // lo convierto a un json string
  }

  export {
    dataBackend, 
    getAll,
    getOne 
};
