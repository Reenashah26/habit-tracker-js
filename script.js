
const habitInput = document.getElementById('habitInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitList = document.getElementById('habitList');

let habits =[];
addHabitBtn.addEventListener("click", function(){
    const habitText = habitInput.value;
    
    if(habitText==="") return;

    habits.push(habitText);
    habitInput.value ="";

    renderHabits();
});

function renderHabits()
{
    habitList.innerHTML="";
    habits.forEach(function(habit)
    {
        const li = document.createElement("li");
        li.textContent=habit;
        habitList.appendChild(li);
    });
}