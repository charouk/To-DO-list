//select the elements

const clear=document.querySelector('.clear');
const dateElement=document.querySelector('#date');
const list=document.getElementById('list');
const input=document.getElementById('add-item');

//Classes names
const CHECK="fa-check-circle";
const UNCHECK= "fa-circle";
const LiNe_THROUGH="lineThrough";


//variables
let LIST=[];
let id=0;
let done= false;
let trash= false;

//get item from localstorage
//store from localstorage
let data= localStorage.getItem("TODO");
//check if data is empty
if(data){
    LIST=JSON.parse(data);
    id=LIST.length;
    loadTodo(LIST);

}else{ //if data isn't empty
    LIST=[];
    id=0;
}

function loadTodo(array){
    array.forEach(function(item){
        addToDo(item.name, item.id,item.done,item.trash);

    })
}
//add item to localstorage
localStorage.setItem("TODO",JSON.stringify(LIST));

//show todays date
let options={weekday:'long',year:'numeric', month:'short', day:'numeric'};
let today= new Date();
dateElement.innerHTML=today.toLocaleDateString("en-US",options );


//add a to do task
function addToDo(toDo,id,done,trash)
{  if (trash){return; }
    const DONE =done ? CHECK:UNCHECK;
    const LINE= done ? LiNe_THROUGH: "";
       const text=` <li class="item">
               <i class="fa-solid ${DONE}" job="complete" id="${id}"></i>
               <p class="text ${LINE} ">${toDo} </p>
               <i class="fa-solid fa-trash" job="delete" id="${id}"></i>

              </li>

            `
        const position="beforeend";

        list.insertAdjacentHTML(position, text);


}
//add an item  to the list

document.addEventListener("keyup",function(event){
    if(event.keyCode ==13){
        const toDo= input.value;
        //if the input is not empty
        if(toDo){
            addToDo(toDo,id, false,false);
            LIST.push(
                {
                    name:toDo,
                    id:id,
                    done:false,
                    trash:false,
                   
                }
            );
            localStorage.setItem("TODO",JSON.stringify(LIST)); 
            id++;  
        }
        input.value="";
       
       

    }
})
 
  // to switch the icon of check button 
  function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LiNe_THROUGH);
    LIST[element.id].done= LIST[element.id].done ? false : true ;


}

   // remove a to do task 
function removeToDo(element){
element.parentNode.parentNode.removeChild(element.parentNode);
LIST[element.id].trash=true;
localStorage.setItem("TODO",JSON.stringify(LIST));

}

 //target the items created dynamically
list.addEventListener("click", function(event){
    const element= event.target; //return the clicked element inside list
    
    const elementJOB= element.attributes.job.value;
    if(elementJOB =="complete"){
        completeToDo(element);

    }else if(elementJOB== "delete"){
        removeToDo(element);
    }
    localStorage.setItem("TODO",JSON.stringify(LIST));
})


//clear localStorage

clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload()
})












  
 






