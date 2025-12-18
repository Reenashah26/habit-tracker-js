//Show today's date
const todayDateE1 =document.getElementById("todayDate");
const today = new Date();
const options = { weekday:"long", day:"numeric", month:"short"};
todayDateE1.textContent = today.toLocaleDateString("en-In",options);


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