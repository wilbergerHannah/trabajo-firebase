
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyC6O3jMmLoSHCSKd6xGl-cPxsErMajA0yg",
  authDomain: "trabajo-firebase-2336f.firebaseapp.com",
  databaseURL: "https://trabajo-firebase-2336f-default-rtdb.firebaseio.com",
  projectId: "trabajo-firebase-2336f",
  storageBucket: "trabajo-firebase-2336f.firebasestorage.app",
  messagingSenderId: "656511532392",
  appId: "1:656511532392:web:77dc87be9bcc6cda02eadd",
  measurementId: "G-F124B54NG7"
};


const app = initializeApp(firebaseConfig);




const db = getDatabase(app);




let inputNombre = document.querySelector("#nombre");
let inputDni = document.querySelector("#dni");
let inputEdad = document.querySelector("#edad");
let inputNivel = document.querySelector("#nivel");
let btnAgregar = document.querySelector("#agregar");




btnAgregar.onclick = function () {


  if (
    inputNombre.value === "" ||
    inputDni.value === "" ||
    inputEdad.value === "" ||
    inputNivel.value === ""
  ) {
    alert("Completá todos los campos");
    return;
  }


  let alumnosRef = ref(db, "alumnos/" + inputDni.value);


  set(alumnosRef, {
    nombre: inputNombre.value,
    dni: inputDni.value,
    edad: inputEdad.value,
    nivel: inputNivel.value,
  })
    .then(() => {
      alert("Alumno agregado correctamente");


      inputNombre.value = "";
      inputDni.value = "";
      inputEdad.value = "";
      inputNivel.value = "";
    })
    .catch((error) => {
      alert("Error al agregar alumno: " + error.message);
    });
};




let tabla = document.querySelector(".tabla");


let refalumnos = ref(db, "alumnos");


onValue(refalumnos, (datos) => {


  let alumnos = datos.val();


  tabla.innerHTML = "";


  if (alumnos) {
    for (let dni in alumnos) {


      tabla.innerHTML += `
        <tr>
          <td>${alumnos[dni].nombre}</td>
          <td>${alumnos[dni].dni}</td>
          <td>${alumnos[dni].edad}</td>
          <td>${alumnos[dni].nivel}</td>
        </tr>
      `;
    }
  }
});
