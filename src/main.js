import './style.css'
import { askIA } from './askIA.js'
import { displayResponses } from './askIA.js'
import { abrirSidebar } from './askIA.js'




document.getElementById("askButton").addEventListener("click", async () => {
  const inputElement = document.getElementById("inputText");
  const responseElement = document.getElementById("responseText");

  const question = inputElement.value.trim();

  if (!question) {
    responseElement.innerText = "Por favor ingresa una pregunta";
    return;
  }

try{
const response = await askIA(question);
displayResponses()
}catch{
  console.error("Error al obtener respuesta:", error);
}

})


document.addEventListener("DOMContentLoaded", displayResponses);
const openSidebar = document.getElementById("openSidebar");
openSidebar.addEventListener("click", abrirSidebar)


















