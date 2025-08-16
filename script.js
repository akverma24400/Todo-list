const InputContainer = document.getElementById("input box");
const ListContainer = document.getElementById("list-container");
function addtask(){
    if(InputContainer.value=='')
    alert("You must Have to add Some Task");
    else{
        let li = document.createElement("li");
        li.innerHTML= InputContainer.value;
        ListContainer.append(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.append(span);
    }
    InputContainer.value=" ";
    saveData();


}

ListContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", ListContainer.innerHTML);
}

function showTask(){
    ListContainer.innerHTML = localStorage.getItem("data");
}
showTask();