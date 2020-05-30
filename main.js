// Getting DOM elements
let trips = document.querySelector('#trips');
let delFees = document.querySelector('#delFees');
let tips = document.querySelector('#tips');
let total = document.querySelector('#total');
let add_btn = document.querySelector('.add-btn');
let btnCancel = document.querySelector('#btn-cancel');
let panel = document.querySelector('#panel');

//Show data entry panel
add_btn.addEventListener('click', showPanel);

//Cancel data entry
btnCancel.addEventListener('click', ()=>{
  panel.style.visibility = 'hidden'
})

// Variables initialisation
let total_delfees = 0;
let total_tips = 0;
let total_cashup = 0;
let myTrips = [];

// Check if Storage is not empty
if (getTrips() !== null) myTrips = getTrips();

// Load entries
showList();

// Resetting Storage
window.localStorage.setItem('trips', JSON.stringify(myTrips));

// Add data on submit
let btn_submit = document.querySelector('#btn_submit');

btn_submit.addEventListener('click', addTrip);

// get List of Trips from storage
function getTrips() {
  return JSON.parse(window.localStorage.getItem('trips'));
}

// Show list of trips on load
function showList() {
  let storage = getTrips();
  if (storage !== null) {
    storage.forEach(trip => {
      div = document.createElement('div');
      div.classList.add('card')
      div.innerHTML = `
         Total trip: ${trip.delfees + trip.tips}
         <p>
          <span>Del fees: ${trip.delfees}</span>
          <span style='float: right'>Tips: ${trip.tips}</span>
         </p>
      `;
      trips.appendChild(div);

      total_tips += trip.tips;
      total_delfees += trip.delfees;

      total_cashup = total_tips + total_delfees;

      total.innerText = total_cashup;
    });
  }
}

function addTrip() {
  
  if(delFees.value=='' || +delFees.value == 0) return;
  
  var div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
               Total trip: ${+delFees.value + +tips.value}
               <p>
                <span>Del fees: ${+delFees.value}</span>
                <span style='float: right'>Tips: ${+tips.value}</span>
               </p>
            `;
  trips.appendChild(div);
  total_delfees += +delFees.value;
  total_tips += +tips.value;
  total_cashup = total_tips + total_delfees;

  let trip = {
    'delfees': +delFees.value,
    'tips': +tips.value
  }

  delFees.value = "";
  tips.value = '';
  total.innerText = total_cashup;


  myTrips.push(trip);

  window.localStorage.setItem('trips', JSON.stringify(myTrips));
  // close panel
  panel.style.visibility = 'hidden'
}

//Show data entry panel
function showPanel(){
  
  panel.style.visibility = 'visible';
  panel.style.transition = '0.5s'
  
}

let clear = document.querySelector('.btn-clear');
clear.addEventListener('click', ()=>{
  window.localStorage.clear();
});
