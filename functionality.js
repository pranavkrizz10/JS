let task = document.getElementById("Add-Task");
let addedTasks=document.getElementById("ul");
let btn = document.getElementById("Add-Button");
let del= document.getElementsByClassName('delete');

let tasklist=JSON.parse(localStorage.getItem("tasks")) || [];

function reload(){
    tasklist.forEach(display);
}
reload();

btn.addEventListener("click",()=>{
    let t=task.value.trim();
    task.value=""; 
    if(t) pushh(t);
})

function pushh(task){
    tasklist.push(task);
    display(task);
}

function display(task){
        let txt=document.createElement('li');
        txt.innerText=task;
        let btn=document.createElement('button');
        btn.innerText="Delete";
        btn.classList.add("delete");
        addedTasks.appendChild(txt);
        addedTasks.append(btn);
        btn.addEventListener("click", () => {
            removeTask(task, txt, btn);
        });
        
        let tool=document.createElement('span');
        txt.classList.add("tooltip");
        tool.classList.add('tooltip-text');
        tool.innerText="Click to mark as completed/incomplete.";
        txt.appendChild(tool);

        txt.addEventListener("click",() => {
            txt.classList.toggle('completed')
        })
        saveTasks();
}

function removeTask(task, liElement, btnElement) {
    tasklist = tasklist.filter(t => t !== task);
    saveTasks();
    liElement.remove();
    btnElement.remove();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasklist));
}

