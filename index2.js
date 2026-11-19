
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {getDatabase,ref,onValue} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";




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
const basedatos = getDatabase(app);




let buscarAlumno = document.getElementById("buscar");
let tabla = document.getElementById("tabla");




let alumnosRef = ref(basedatos, "alumnos");




let alumnosGuardados = {};


onValue(alumnosRef, (datos) => {


  alumnosGuardados = datos.val() || {};


  mostrarAlumnos();
});


function mostrarAlumnos() {


  tabla.innerHTML = "";


  let busqueda = buscarAlumno.value;


  for (let dni in alumnosGuardados) {


    if (dni.includes(busqueda)) {


      tabla.innerHTML += `
        <tr>
          <td>${alumnosGuardados[dni].nombre}</td>
          <td>${dni}</td>
          <td>${alumnosGuardados[dni].edad}</td>
          <td>${alumnosGuardados[dni].nivel}</td>
        </tr>
      `;
    }
  }
}


buscarAlumno.oninput = function(){
  mostrarAlumnos()
}
