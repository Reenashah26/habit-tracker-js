//Show today's date
const todayDateE1 =document.getElementById("todayDate");
const today = new Date();
const options = { weekday:"long", day:"numeric", month:"short"};
todayDateE1.textContent = today.toLocaleDateString("en-In",options);

// other variables
//const addHabitSection = document.getElementById("addHabitSection");
const saveHabitBtn = document.getElementById("saveHabitBtn");
const habitNameInput =document.getElementById("habitNameInput");
const habitDescInput = document.getElementById("habitDescInput");
const emptyState = document.getElementById("emptyState");
const habitList = document.getElementById('habitList');

const completionSummary = document.getElementById("completionSummary");

const overlay = document.getElementById("overlay");
const bottomSheet = document.getElementById("bottomSheet");
//overlay logic

addHabitBtn.addEventListener("click", function(){
overlay.style.display="block";
bottomSheet.style.display="block";
});

overlay.addEventListener("click",function(){
overlay.style.display="none";
bottomSheet.style.display="none";
});
/*
addHabitBtn.addEventListener("click", function(){
addHabitSection.style.display="block";
});
*/

let habits =[];

saveHabitBtn.addEventListener("click", function(){
    
    const name = habitNameInput.value.trim();
    const description = habitDescInput.value.trim();
    
    if(name==="") return;

    const habbit ={
        name: name,
        description:description,
        completed:false
    };

    habits.push(habbit);
    habitNameInput.value ="";
    habitDescInput.value ="";
    //addHabitSection.style.display="none";
    emptyState.style.display="none";

    renderHabits();
});

function renderHabits()
{
    habitList.innerHTML="";

    let completedCount = 0;

    habits.forEach(function(habit,index)
    {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = habit.completed;
        //Per-item event binding during render
        checkbox.addEventListener("change", function(){
            habits[index].completed = checkbox.checked;
            renderHabits();
        });

        const title = document.createElement("strong");
        title.textContent= habit.name;

        const desc = document.createElement("p");
        desc.textContent= habit.description;
        
        const deletebutton = document.createElement("button");
        deletebutton.innerText="Delete";
        deletebutton.style = 'margin-left:20px;';

        if(habit.completed)
        {
            li.style.opacity ="0.6";
            title.style.textDecoration="line-through";
            completedCount++;
            deletebutton.disabled=true;
        }

        
        deletebutton.addEventListener("click", function(){
            if(habit.completed) return;
            habits.splice(index,1);
            renderHabits();
        });


        li.appendChild(checkbox);
        li.appendChild(title);
        li.appendChild(desc);
        li.appendChild(deletebutton);

        habitList.appendChild(li);
    });

    completionSummary.textContent =`${completedCount} of ${habits.length} habits completed today`;
}