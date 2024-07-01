import { Crypto } from "./crypto.js";
import { mostrarSpinner, ocultarSpinner } from "./spinner.js";
import { getDateNowFormatted } from "./dateHandler.js";
import { getAllFetch, getOneFetch, addOneFetch, editOneFetch, deleteOneFetch, deleteAllFetch } from "./fetch-handler.js";
import { getAll, getOne } from "./xhr-handler.js";

/*       LINEAS DEPRECATED, SE REEMPLAZAN POR APP.JS
const KEY_STORAGE = "monedas";
const FAKE_DELAY = 2500;
*/
let items = []; // array vacio
let arrayFiltered = []; // array vacio
let itemIndex = -1;

let rows = [
  { id: 0, title: "id", status: true },
  { id: 1, title: "nombre", status: true },
  { id: 2, title: "simbolo", status: true },
  { id: 3, title: "fechaCreacion", status: true },
  { id: 4, title: "precioActual", status: true },
  { id: 5, title: "consenso", status: true },
  { id: 6, title: "cantidadCirculacion", status: true },
  { id: 7, title: "algoritmo", status: true },
  { id: 8, title: "sitioWeb", status: true }
]

const form = document.getElementById("form-group"); // recupero el form declarado en el body
const formAverage = document.getElementById("form-average"); // recupero el form declarado en el body
const table = document.getElementById("table-items");

const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");
const btnEliminar = document.getElementById("btnEliminar");
const btnEditar = document.getElementById("btnEditar");

const average = document.getElementById("form-average");
average.addEventListener("change", onAverage);

const chbxNombre = document.getElementById("chbox-nombre");
const chbxSimbolo = document.getElementById("chbox-simbolo");
const chbxFecha = document.getElementById("chbox-fecha");
const chbxPrecio = document.getElementById("chbox-precio");
const chbxConsenso = document.getElementById("chbox-consenso");
const chbxCantidad = document.getElementById("chbox-cantidad");
const chbxAlgoritmo = document.getElementById("chbox-algoritmo");
const chbxSitioweb = document.getElementById("chbox-sitioweb");

chbxNombre.addEventListener("change", onCheck);
chbxSimbolo.addEventListener("change", onCheck);
chbxFecha.addEventListener("change", onCheck);
chbxPrecio.addEventListener("change", onCheck);
chbxConsenso.addEventListener("change", onCheck);
chbxCantidad.addEventListener("change", onCheck);
chbxAlgoritmo.addEventListener("change", onCheck);
chbxSitioweb.addEventListener("change", onCheck);

document.addEventListener("DOMContentLoaded", onInit); // importante no poner parentesis, es un callback



function onInit() {
  loadItems();

  getForm();
  tableTDListener();
  handleCancellation();
  handleDelete();
  handleEdit();
  handleDeleteAll();


}


function onCheck() {
  if (chbxNombre.checked) {
    handleStatusChange(1, true);
  } else { handleStatusChange(1, false); }

  if (chbxSimbolo.checked) {
    handleStatusChange(2, true);
  } else { handleStatusChange(2, false); }

  if (chbxFecha.checked) {
    handleStatusChange(3, true);
  } else { handleStatusChange(3, false); }

  if (chbxPrecio.checked) {
    handleStatusChange(4, true);
  } else { handleStatusChange(4, false); }

  if (chbxConsenso.checked) {
    handleStatusChange(5, true);
  } else { handleStatusChange(5, false); }

  if (chbxCantidad.checked) {
    handleStatusChange(6, true);
  } else { handleStatusChange(6, false); }

  if (chbxAlgoritmo.checked) {
    handleStatusChange(7, true);
  } else { handleStatusChange(7, false); }

  if (chbxSitioweb.checked) {
    handleStatusChange(8, true);
  } else { handleStatusChange(8, false); }

}

function handleStatusChange(id, isVisible) {
  let thead_th = table.getElementsByTagName('th')[id];
  let tbody_td = table.getElementsByTagName('td')[id];
  //console.log(table.getElementsByTagName('th')[id]);
  //console.log(tbody_td);

  if (isVisible) {
    thead_th.removeAttribute("style");
  } else {
    thead_th.setAttribute("style", "display: none;");
  }

  rows.filter(row => {
    if (row.id == tbody_td.getAttribute("id")) {
      row.status = isVisible;
    }
  });

  setTable(items);
}

async function loadItems() {

  mostrarSpinner();
  try {
    items = await getAllFetch(); // Esperamos a que getAll() resuelva la promesa
    ocultarSpinner();

    setTable(items);
  } catch (error) {
    console.error('Error al cargar los items:', error);
    ocultarSpinner();
  }
}


/**
 * Quiero que obtenga el elemento del DOM table
 * luego quiero agregarle las filas que sean necesarias
 * se agregaran dependiendo de la cantidad de items que poseo
 */
function setTable(array) {

  let tbody = table.getElementsByTagName('tbody')[0];
  tbody.innerHTML = ''; // Me aseguro que esté vacio, hago referencia al agregar otro

  //const rows = ["id", "nombre", "simbolo", "fechaCreacion", "precioActual", "consenso", "cantidad", "algoritmo", "sitioWeb"];

  array.forEach((item) => {
    let newRow = document.createElement("tr");
    let idGenerator = 0;

    rows.forEach((row) => {
      let newElement = document.createElement("td");
      newElement.setAttribute("id", idGenerator);
      if (!row.status) {
        newElement.setAttribute("style", "display: none;");
      }
      newElement.textContent = item[row.title];
      //console.log(row.status);
      newRow.appendChild(newElement);
      idGenerator++;
    });

    // Agregar la fila al tbody
    tbody.appendChild(newRow);
  });
}



function tableTDListener() {
  table.addEventListener("dblclick", (event) => {
    const target = event.target;
    if (target.matches("td")) {
      // Lógica a implementar al hacer doble clic en una celda
      const row = target.parentNode;
      const cells = row.getElementsByTagName("td");
      btnIsVisible(true);
      setForm(cells);
    }
  });
}


async function getForm() {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const object = new Crypto();
    // nombre, simbolo, precioActual, cantidad, sitioWeb
    const response = object.verify(
      form.nombre.value,
      form.simbolo.value,
      form.precio.value,
      form.cantidad.value,
      form.sitioweb.value
    );

    if (response) {

      const model = new Crypto(
        null,
        form.nombre.value,
        getDateNowFormatted(),
        form.simbolo.value,
        form.precio.value,
        form.dropdownCurrency.value,
        form.cantidad.value,
        form.dropdownType.value,
        form.sitioweb.value
      );
      //console.log(model);

      try {
        mostrarSpinner();
        await addOneFetch(model);
        items = await getAllFetch(); // Esperamos a que getAll() resuelva la promesa
        resetForm();

        setTable(items);
        ocultarSpinner();
      }
      catch (error) {
        alert(error);
      }
    }
  });
}

/**
 * Data es un array de elementos td
 */
function setForm_old(data) {
  console.log(data); // debuggeo el array para saber que indice corresponde con cual td
  //const rows = ["nombre", "simbolo", "fechaCreacion", "precioActual", "consenso", "cantidad", "algoritmo", "sitioWeb"];
  form.nombre.value = data[1].innerText;    // nombre
  form.simbolo.value = data[2].innerText;  // simbolo
  form.precio.value = data[4].innerText;  // precio
  form.dropdownCurrency.value = data[5].innerText; // consenso
  form.cantidad.value = data[6].innerText;      // cantidad
  form.dropdownType.value = data[7].innerText; // algoritmo
  form.sitioweb.value = data[8].innerText;    // sitio web
  itemIndex = getIndexOf();
  //console.log(items[itemIndex]);
}


async function setForm(data) {
  mostrarSpinner();
  try {
    const obj = await getOneFetch(data[0].innerText);
    ocultarSpinner();

    form.id.value = obj.id;
    form.fecha.value = obj.fechaCreacion;
    form.nombre.value = obj.nombre;
    form.simbolo.value = obj.simbolo;
    form.precio.value = obj.precioActual;
    form.dropdownCurrency.value = obj.consenso;
    form.cantidad.value = obj.cantidadCirculacion;
    form.dropdownType.value = obj.algoritmo;
    form.sitioweb.value = obj.sitioWeb;

  } catch (error) {
    console.error('Error al cargar:', error);
    ocultarSpinner();
  }
}

function getIndexOf() {
  let itemIndex = -1;
  itemIndex = items.findIndex(item => (
    item.nombre === form.nombre.value &&
    item.simbolo === form.simbolo.value &&
    item.precioActual === form.precio.value &&
    item.cantidad === form.cantidad.value &&
    item.consenso === form.dropdownCurrency.value &&
    item.algoritmo === form.dropdownType.value &&
    item.sitioWeb === form.sitioweb.value
  ));
  return itemIndex;
}

function btnIsVisible(isVisible) {
  if (isVisible) {
    btnGuardar.setAttribute("class", "oculto");
    btnEliminar.removeAttribute("class");
    btnCancelar.removeAttribute("class");
    btnEditar.removeAttribute("class");
  } else if (!isVisible) {
    btnGuardar.removeAttribute("class");
    btnEliminar.setAttribute("class", "oculto");
    btnCancelar.setAttribute("class", "oculto");
    btnEditar.setAttribute("class", "oculto");
  }
}

function resetForm() {
  form.reset();
  btnIsVisible(false);
}

function handleCancellation() {
  btnCancelar.addEventListener("click", () => {
    resetForm();
  });
}

async function handleEdit() {
  btnEditar.addEventListener("click", async () => {
    if (confirm('¿Desea editar el item seleccionado?')) {
      const middleware = new Crypto();
      const response = middleware.verify(
        form.nombre.value,
        form.simbolo.value,
        form.precio.value,
        form.cantidad.value,
        form.sitioweb.value
      );

      if (response) {
        //constructor(id, nombre, fecha, simbolo, precioActual, consenso, cantidad, algoritmo, sitioWeb)
        const model = new Crypto(
          form.id.value,
          form.nombre.value,
          getDateNowFormatted(),
          form.simbolo.value,
          form.precio.value,
          form.dropdownCurrency.value,
          form.cantidad.value,
          form.dropdownType.value,
          form.sitioweb.value
        );

        mostrarSpinner();
        try {
          // await save(KEY_STORAGE, str);
          await editOneFetch(model);
          items = await getAllFetch(); // Esperamos a que getAll() resuelva la promesa
          ocultarSpinner();
          resetForm();
          btnIsVisible(false);
          setTable(items);

        } catch (error) {
          alert(error);
          ocultarSpinner();
        }
      }
    }
  });
}


async function handleDelete() {
  btnEliminar.addEventListener("click", async (e) => {
    if (confirm('Desea eliminar el item seleccionado?')) {
      mostrarSpinner();
      try {
        // await save(KEY_STORAGE, str);
        await deleteOneFetch(form.id.value);
        items = await getAllFetch(); // Esperamos a que getAll() resuelva la promesa
        ocultarSpinner();
        resetForm();
        btnIsVisible(false);
        setTable(items);
      }
      catch (error) {
        alert(error);
        ocultarSpinner();
      }
    }
  });
}

async function handleDeleteAll() {
  const btn = document.getElementById("btnLimpiar");

  btn.addEventListener("click", async (e) => {

    const userAnswer = confirm('Desea eliminar todos los Items?');

    if (userAnswer) {
      mostrarSpinner();
      try {
        // await clear(KEY_STORAGE);
        await deleteAllFetch();
        items = await getAllFetch(); // Esperamos a que getAll() resuelva la promesa
        ocultarSpinner();
        resetForm();
        setTable(items);

      }
      catch (error) {
        alert(error);
        ocultarSpinner();
      }
    }
  });
}


function getAveragePrecio(arr) {
  if (arr.length > 0) {
    let numbers = arr.reduce((prev, next) => {
      return prev + next.precioActual;
    }, 0);

    let average = numbers / arr.length;
    return average;
  } else {
    return "";
  }

}

function getAverageCantidad(arr) {
  if (arr.length > 0) {
    let numbers = arr.reduce((prev, next) => {
      return prev + next.cantidad;
    }, 0);

    let average = numbers / arr.length;
    return average;
  } else {
    return "";
  }
}

function onAverage() {
  if (formAverage.dropdownAverage.value !=0) {
    formAverage.average.value = getAverageAlgoritmo(items, formAverage.dropdownAverage.value);
  } else {
    formAverage.average.value = "N/A";
  }
}

function getAverageAlgoritmo(arr, filterParam) {
  if (arr.length > 0) {
    let filteredArr = arr.filter(item => item.algoritmo === filterParam);
    
    if (filteredArr.length === 0) {
      return ""; // No items match the search condition
    }

    let numbers = filteredArr.reduce((prev, next) => {
      return prev + next.precioActual;
    }, 0);

    let average = numbers / filteredArr.length;
    return average;
  } else {
    return "";
  }
}
