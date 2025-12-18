//Show today's date
const todayDateE1 =document.getElementById("todayDate");
const today = new Date();
const options = { weekday:"long", day:"numeric", month:"short"};
todayDateE1.textContent = today.toLocaleDateString("en-In",options);

const addHabitSection = document.getElementById("addHabitSection");
const saveHabitBtn = document.getElementById("saveHabitBtn");
const habitNameInput =document.getElementById("habitNameInput");
const habitDescInput = document.getElementById("habitDescInput");
const emptyState = document.getElementById("emptyState");
const habitList = document.getElementById('habitList');

addHabitBtn.addEventListener("click", function(){
addHabitSection.style.display="block";
});


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
    addHabitSection.style.display="none";
    emptyState.style.display="none";

    renderHabits();
});

function renderHabits()
{
    habitList.innerHTML="";
    habits.forEach(function(habit)
    {
        const li = document.createElement("li");
        const title = document.createElement("strong");
        title.textContent= habit.name;

        const desc = document.createElement("p");
        desc.textContent= habit.description;

        li.appendChild(title);
        li.appendChild(desc);

        habitList.appendChild(li);
    });
}