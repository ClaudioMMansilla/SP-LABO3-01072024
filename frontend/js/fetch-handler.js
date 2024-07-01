
const ENDPOINT = "http://localhost:3000/monedas";


// Uso del Fetch
// es una funcion que nos devuelve una Promesa

async function getAllFetch() {
    const options = {
      method: "GET",
      headers: { "content-type": "application/json" },
    };
  
    let res = await fetch(`${ENDPOINT}`, options);
    res = await res.json();
  
    console.log(res);
    return res;
  }

  async function getOneFetch(id) {
    const options = {
      method: "GET",
      headers: { "content-type": "application/json" },
    };
  
    let res = await fetch(`${ENDPOINT}/${id}`, options);
    res = await res.json();
  
    console.log(res);
    return res;
  }
  
  async function addOneFetch(model) {
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(model),
    };
  
    let res = await fetch(`${ENDPOINT}`, options);
    res = await res.json();
  
    console.log(res);
    console.log("Agregado con Exito");
  }
  
  async function editOneFetch(model) {
    const options = {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(model),
    };
  
    let res = await fetch(`${ENDPOINT}/${model.id}`, options);
  
    console.log(res);
    console.log("Actualizado con Exito");
  }
  
  async function deleteOneFetch(id) {
    const options = {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    };
  
    let res = await fetch(`${ENDPOINT}/${id}`, options);
    console.log(res);
    console.log("Eliminado con Exito");
  }
  
  async function deleteAllFetch() {
    const options = {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    };
  
    let res = await fetch(`${ENDPOINT}`, options);
    console.log(res);
    console.log("Información Eliminada con Exito");
  }

export { 
    getAllFetch, 
    getOneFetch, 
    addOneFetch,
    editOneFetch,
    deleteOneFetch,
    deleteAllFetch 
};
