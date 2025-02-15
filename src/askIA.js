import { HfInference } from "@huggingface/inference";
import './style.css'



/*funciones para el sidebar*/

 


export function abrirSidebar() {
 const sidenav = document.querySelector(".sidebar");
 sidenav.classList.toggle("-translate-x-full")
}



/*llamar a apiface*/

let apiKey= import.meta.env.VITE_SOME_KEY;
 console.log(apiKey)
const client = new HfInference(`${apiKey}`);
console.log(client)
export async function askIA(question) {
   try {
      const chatCompletion = await client.chatCompletion({
         model: "deepseek-ai/DeepSeek-V3",  // Reemplaza con el modelo que quieras usar
         messages: [{ role: "user", content: question }],
         provider: "together",  // Este es el proveedor de Hugging Face
         max_tokens: 200
      });

      console.log("Respuesta de la API:", chatCompletion);

      const chatEntry = {
         id: chatCompletion.id, // ID único
         timestamp: new Date().toISOString(), // Fecha y hora en ISO
         question,
         response: chatCompletion.choices[0].message.content
      };


      let responseIA = JSON.parse(localStorage.getItem('ia') || "[]");
      responseIA.push(chatEntry);
      localStorage.setItem('ia', JSON.stringify(responseIA));

      const responseMessage = chatCompletion.choices[0].message.content;
      return responseMessage;
   } catch (error) {
      console.error("Error:", error);
      return "Hubo un error al procesar tu solicitud.";
   }
}

/*mostrar los chats*/

export function displayResponses() {
   const historyContainer = document.getElementById("historyContainer");

   if (!historyContainer) {
      console.error("Elemento historyContainer no encontrado en el DOM");
      return;
   }

   historyContainer.innerHTML = ""; // Limpia antes de renderizar

   const responseIA = JSON.parse(localStorage.getItem("ia") || "[]");

   responseIA.forEach((entry, index) => {


      const pregunta = `<div class="mb-4 mt-4 flex flex-row md:w-xl  gap-2.5 mb-1 w-xs ">
   <img class="w-8 h-8 rounded-full" src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="Jese image">
   <div class="flex flex-col w-full leading-1.5 p-2 bg-lime-100 rounded-e-xl  ">
      <div class="flex items-center space-x-1 rtl:space-x-reverse">
         <span class="text-sm font-bold text-gray-900 text-gray-500">You</span>
         <span class="text-sm font-normal text-gray-500 dark:text-gray-400">${new Date(entry.timestamp).toLocaleString()}</span>
      </div>
      <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-black">${entry.question}</p>
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
   </div>
   
</div>

<div class="md:ml-5 flex flex-row md:w-xl gap-2.5 mb-1 w-xs ">
   <img class="w-8 h-8 rounded-full" src="public/thunder4.png" alt="Jese image">
   <div class="flex flex-col w-full w-xs md:w-xl lg:w-lg leading-1.5 p-1 border-gray-200 bg-slate-50 rounded-e-xl rounded-es-xl dark:bg-gray-300">
      <div class="flex items-center space-x-2 rtl:space-x-reverse ">
         <span class="text-sm font-bold text-gray-900 text-gray-500 ">Thunder response</span>
         <span class="text-sm font-normal dark:text-gray-400">${new Date(entry.timestamp).toLocaleString()}</span>
      </div>
      <p class="text-sm font-normal py-1.5 text-gray-800 animation-text">${entry.response}</p>
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
   </div>
  
   </div>
</div>


`;


      historyContainer.innerHTML += pregunta;


   });
}

/*mostrar los chats filtrados por dia*/

export function filterDateResponse() {

   const historyDateContainer = document.getElementById("container-date");

   if (!historyDateContainer) {
      console.error("Elemento historyContainer no encontrado en el DOM");
      return;
   }

   historyDateContainer.innerHTML = "";

   const responseIA = JSON.parse(localStorage.getItem("ia") || "[]");

   var groups ={};

   responseIA.forEach((val, key) => {

      let date = val.timestamp.split('T')[0];
   
      if (date in groups) {
         console.log(key)
         groups[date].push({ id: val.id, question: val.question });
         

      } else {
         groups[date] = new Array({ id: val.id, question: val.question });
         
      }

   })


   Object.entries(groups).forEach(([key, value]) => {
     // console.log(`${key} : ${value}`)
     //console.log(groups)

      let liConsultas = `
            <div class="flex w-full flex-col bg-slate-50 p-1 mt-2 rounded-xs ">
            
              <li class="text-md font-thin rounded-sm text-black text-right">${key} <br></li>
                </div>
              
                <div class="w-full flex justify-between flex-col containerBtnsDelete">
                ${value.map(item => `
            
                <div class="flex justify-end" data-id="${item.id}">
                  <li>${item.question}</li>
                   <button onclick="btnDelete('${item.id}')" class="btnTrash ml-10 w-8 h-8 p-2 bg-lime-200"><i class="fa-solid fa-trash-can"></i></button> 

                  </div>
                  
                  `)}

              </div>
           
               
             
            
          
       
             `;

      historyDateContainer.innerHTML += liConsultas;

   })

}


   

filterDateResponse()


function btnDelete(id){
   const containerbtn = document.querySelectorAll(".containerBtnsDelete");

   let elementToRemove = document.querySelector(`[data-id="${id}"]`);

   console.log(elementToRemove)

   if(elementToRemove){
      elementToRemove.remove();
   }

   let responseIA = JSON.parse(localStorage.getItem("ia"));

   console.log(responseIA)

   if(responseIA){
      responseIA = responseIA.filter((itemId=> itemId.id !==  id));
      localStorage.setItem('ia', JSON.stringify(responseIA));
   }

   console.log(responseIA);
     

}

window.btnDelete = btnDelete;








