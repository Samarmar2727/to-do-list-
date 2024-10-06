document.getElementById("special").addEventListener("click", function(){
    document.getElementById("task").style.display = "table"
    this.style.display ="none"

})


let tasks = [
    {
        "title":  "studying angular course",
        "date": "1/11/2020",
        "isDone": false 
    },
    {
        "title": "studying java course",
        "date": "1/10/2020",
        "isDone": true 
    },
    {
        "title":  "studying html course",
        "date": "1/5/2020",
        "isDone": true
    }
]

function getTasksFromStorage(){
// save the new task in page when i did refresh 
let retrievedTasks = JSON.parse(localStorage.getItem("usersTasks"));
if(retrievedTasks == null){
    tasks = []

}else {
    tasks = retrievedTasks

}
}

getTasksFromStorage()


// add function to imort it when the user add a new task infinte
function fillTaskOnThePage(){

document.getElementById("tableBody").innerHTML = ""
  
//declare a var to send it as apramater to delete function
let index = 0

    for ( task of tasks ){
    let tableBody = document.getElementById("tableBody");

    let creatElement = document.createElement("tr");

    let creatCell = document.createElement("td");
    

    if(task.isDone == true){
        creatCell.classList.add("done");

    }
    


    // add data to td as a html 
    creatCell.innerHTML +=  `
    
                    <div id="data-info"> 
                            <h2> ${task.title} </h2>
                            <i class="fa-solid fa-calendar"></i>
                             <span> ${task.date} </span>
                     </div>
                        <div id="data-icons">
                            <i onclick="editTask(${index})" class="fa-solid fa-pen"></i>
                            ${task.isDone ? `
                                <i onclick="toggleTaskCompletion(${index})"  class="fa-solid fa-xmark" style= "background-color:#cc000087;"></i>
                                ` :
                                `<i onclick="toggleTaskCompletion(${index})" class="fa-solid fa-check"></i>`
                            }
                            <i onclick="deleteTask(${index})" class="fa-solid fa-trash"></i>
                        </div>
                        
  

    `
 creatElement.appendChild(creatCell);

tableBody.appendChild(creatElement);
// to change the index of arrays when i added it and deleted it 
index++

}

}
 fillTaskOnThePage()


 
// !!! start added section// 
 // import the icon to add action when i press on it using the prompt function 
document.getElementById("add").addEventListener("click", function(){
// store the prompt function in variable 
    let taskName = prompt("please enter the assingment title")
    if(taskName !== null) {
        // add the date of day and format it 
      let now = new Date();
      let date = now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getFullYear() + "|" + now.getHours() + ":" + now.getMinutes()
  

    // decleare a new task using object 
    // must using the same structure in object of array 

    let taskObj = {
       "title": taskName,
        "date": date,
        "isDone": false 
    }

  
    // add new task to array 
     tasks.push(taskObj)

     storeTasks()
     fillTaskOnThePage()


    }
      

})
// end added section >>//

//  start delete section//
function deleteTask(index){

    // select task depends on index
    let task = tasks[index]
 let isConfirmed = confirm("Do you want delete this : " + task.title)
 if(isConfirmed == true ){
// delete task from array depends on a parameter index which i declare it before 
tasks.splice(index, 1);
storeTasks()
fillTaskOnThePage()

 }


}
// end delete section >>//


// start  edit section//
function editTask(index) {
    // select task i want depend on index to add actions to it 
    let task = tasks[index]
    // add a task.title as a pramter as first value to prompt and user decided use it or not 
    let newTask = prompt("please enter the new assingment title", task.title)
    if(newTask !== null) {
    // select task i want depend on index to add actions to it 
    
// i said the task i selected == new task i will add 
    task.title = newTask
    storeTasks()
    fillTaskOnThePage()


}

}
// end edit section >>//


// start  complete section//
function toggleTaskCompletion(index){
    //select the task i will edit it by index 
    let task = tasks[index]

    if(task.isDone){
        task.isDone = false
    }else {
        task.isDone = true
    }
    storeTasks()
    fillTaskOnThePage()

}
// end complete section >>//

//*************storage function************/

function storeTasks(){
 // return the array to string 
 let jsonTask = JSON.stringify(tasks);
 // save the new task in local storage when i did refresh 
 localStorage.setItem("usersTasks", jsonTask);
}
