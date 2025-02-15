import './style.css'

import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { askIA } from './askIA.js'
import { displayResponses } from './askIA.js'



import { abrirSidebar } from './askIA.js'








/*document.querySelector('#app').innerHTML = `
 <div class="w-full">
  <div class="flex justify-center">
  <h1 class="text-xl text-blue-300">DEEPSEEK-V3</h1>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="https://www.elgrupoinformatico.com/static/Noticias/2025/01/deepseek-logo-1200x675.jpg" class="logo vanilla" alt="JavaScript logo" />
    </a>
</div>
    <div class="mt-8 max-w-md mx-auto bg-zinc-800 rounded-lg shadow-lg p-6">
      <label for="inputText" class="block font-medium text-sm text-gray-500">Pregunta o ingresa texto para la IA:</label>
      <textarea id="inputText" class="w-full mt-1 p-2 border rounded" placeholder="Escribe aquí..." rows="4"></textarea>
      <button id="askButton" class="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded mt-4 hover:bg-blue-600">
        Enviar pregunta
      </button>
      <h2 class="text-lg font-bold mt-4">Respuesta de DeepSeek-v3:</h2>
      <p id="responseText" class="text-gray-400 typewriter"></p>
    </div>
  </div> 
  

`*/



/*document.getElementById("askButton").addEventListener("click", async ()=>{
  const question = document.getElementById("inputText").value;

  console.log(question)

  if(question){
    const response = await askIA(question);
    console.log(response);
    document.getElementById("responseText").innerText = response;
  }else{
    document.getElementById("responseText").innerText ="Por favor ingresa una pregunta"
  }

})*/


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


















