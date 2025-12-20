//Show today's date
let selectedDate = new Date().toISOString().split("T")[0];    //"2025-01-06"
// new Date().toISOString() --> "2025-12-20T08:42:15.123Z" 
//let selectedDate = "2025-01-05";
const todayDateE1 =document.getElementById("todayDate");
const today = new Date(); // 2025-12-20T08:42:15.123Z
const options = { weekday:"long", day:"numeric", month:"short"};
//todayDateE1.textContent = new Date(selectedDate).toLocaleDateString("en-IN", options);

//todayDateE1.textContent = today.toLocaleDateString("en-In",options);

// other variables
const saveHabitBtn = document.getElementById("saveHabitBtn");
const habitNameInput =document.getElementById("habitNameInput");
const habitDescInput = document.getElementById("habitDescInput");
const emptyState = document.getElementById("emptyState");
const habitList = document.getElementById('habitList');
const completionSummary = document.getElementById("completionSummary");
const overlay = document.getElementById("overlay");
const bottomSheet = document.getElementById("bottomSheet");
let habits =[];

let editingHabitIndex = null; //null → adding new habit, number → editing existing habit

//Load habits on app start
const savedHabits = localStorage.getItem("habits");
if(savedHabits){
    habits=JSON.parse(savedHabits);
    emptyState.style.display="none";
    updateHeaderDate();
    renderHabits();
    renderWeekView();
}

//Persist habits with localStorage
function saveHabits()
{
    localStorage.setItem("habits",JSON.stringify(habits));
}

addHabitBtn.addEventListener("click", function(){
    overlay.style.display="block";
    bottomSheet.style.display="block";
    habitNameInput.focus();
    });

overlay.addEventListener("click", closeBottomSheet);

saveHabitBtn.addEventListener("click", function(){
    
    const name = habitNameInput.value.trim();
    const description = habitDescInput.value.trim();
    
    if(name==="") return;

    if(editingHabitIndex!==null){
        //edit Mode
        habits[editingHabitIndex].name = name;
        habits[editingHabitIndex].description = description;
        editingHabitIndex= null;
    }
    else{
        const habit ={
            name: name,
            description:description,
            //completed:false,
            completedDates: {}
        };

    habits.push(habit);
    }
    
    saveHabits();
    emptyState.style.display = "none";
    closeBottomSheet();    
    renderHabits();
});

function renderHabits()
{
    habitList.innerHTML="";

    let completedCount = 0;

    habits.forEach(function(habit,index)
    {
        //So, Old habits from localStorage don’t crash
        if(!habit.completedDates){
            habit.completedDates={};
        }
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        //checkbox.checked = habit.completed;
        checkbox.checked = habit.completedDates?.[selectedDate]||false;
        //Per-item event binding during render
        checkbox.addEventListener("change", function(){
            //habits[index].completed = checkbox.checked;
            habit.completedDates[selectedDate]=checkbox.checked;
            saveHabits();
            renderHabits();
        });

        const title = document.createElement("strong");
        title.textContent= habit.name;

        const desc = document.createElement("p");
        desc.textContent= habit.description;
        
        const deletebutton = document.createElement("button");
        deletebutton.innerText="Delete";
        deletebutton.style = 'margin-left:20px;';

        const editbutton = document.createElement("button");
        editbutton.innerText="Edit";
        editbutton.style.marginLeft="10px";

        editbutton.addEventListener("click", function(){
            if(habit.completedDates[selectedDate])return;
            editingHabitIndex = index;
            habitNameInput.value=habit.name;
            habitDescInput.value=habit.description;

            overlay.style.display="block";
            bottomSheet.style.display="block";
            habitNameInput.focus();
        });

        if(habit.completedDates[selectedDate])
        {
            li.style.opacity ="0.6";
            title.style.textDecoration="line-through";
            completedCount++;
            deletebutton.disabled=true;
            editbutton.disabled=true;
        }

        
        deletebutton.addEventListener("click", function(){
            if(habit.completedDates[selectedDate]) return;
            habits.splice(index,1);
            saveHabits();
            renderHabits();
        });

        

        li.appendChild(checkbox);
        li.appendChild(title);
        li.appendChild(desc);
        li.appendChild(deletebutton);
        li.appendChild(editbutton);

        habitList.appendChild(li);
    });

    completionSummary.textContent =`${completedCount} of ${habits.length} habits completed today`;
}

//Helper function
function closeBottomSheet()
{
  overlay.style.display="none";
  bottomSheet.style.display="none";
  habitNameInput.value = "";
  habitDescInput.value = "";
  editingHabitIndex=null;

}

//Helper function Generate current week dates (JS)
// generates ["2025-01-06", "2025-01-07", ...]
function getWeekDates(baseDate)   // 20th Dec 2025  
{
    const dates=[];
    const current = new Date(baseDate); // Sat Dec 20 2025
    const day = current.getDay(); // 6 ; 0=> Sunday

    const diff = current.getDate()-day+(day===0 ?-6: 1); //15 // Monday start
    const monday = new Date(current.setDate(diff)); // Mon Dec 15 2025

    for (let i =0; i<7 ; i++)
    {
        const d = new Date(monday);  // Mon Dec 15 2025
        d.setDate(monday.getDate()+i); // Mon Dec 15 2025, Tue Dec 16 2025...
        dates.push(d.toISOString().split("T")[0]);
    }
    return dates;
}


function renderWeekView()
{
    const weekView = document.getElementById("weekView");
    weekView.innerHTML = "";
    
    const weekDates = getWeekDates(selectedDate);
    weekDates.forEach(date=>{
        const dayBtn = document.createElement("button");
        dayBtn.innerText = new Date(date).toLocaleDateString("en-En",{
            weekday:"short",
            day :"numeric",
        });

        if(date ===selectedDate){
            dayBtn.style.fontWeight="bold";
        }

        dayBtn.addEventListener("click", function(){
            selectedDate= date; 
            renderWeekView();
            renderHabits();
            updateHeaderDate();
        });

        weekView.appendChild(dayBtn);
    });
}
//Helper function
function updateHeaderDate() {
  todayDateE1.textContent = new Date(selectedDate).toLocaleDateString(
    "en-IN",
    { weekday: "long", day: "numeric", month: "short" }
  );
}

