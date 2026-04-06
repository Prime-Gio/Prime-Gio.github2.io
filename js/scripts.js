const currentPath = window.location.pathname;

document.querySelectorAll('.navbar a').forEach(link => {
  const linkPath = new URL(link.href).pathname;

  if (linkPath === currentPath) {
    link.classList.add('active');
  }
});
const SINGLE_COST = 119;  // Single bed nightly rate
const DOUBLE_COST = 169;  // Double bed nightly rate
const BREAKFAST_COST = 20; // Breakfast add-on per night
const PARKING_COST = 10;   // Parking add-on per night
const WIFI_COST = 5;       // Wi-Fi add-on per night

// Setup form on load
window.addEventListener("load", setupForm);

function setupForm() {
   document.getElementById("nights").value = 1;
   document.getElementById("breakfast").checked = false;
   document.getElementById("parking").checked = false;
   document.getElementById("wifi").checked = false;
   
   getEstimate();
   
   // Event handlers
   document.getElementById("roomType").onchange = getEstimate;
   document.getElementById("nights").onchange = getEstimate;
   document.getElementById("breakfast").onchange = getEstimate;
   document.getElementById("parking").onchange = getEstimate;
   document.getElementById("wifi").onchange = getEstimate;
}

function getEstimate() {
   let totalCost = 0;
   let roomRate = parseInt(document.getElementById("roomType").value);
   let nights = parseInt(document.getElementById("nights").value);
   let addBreakfast = document.getElementById("breakfast").checked;
   let addParking = document.getElementById("parking").checked;
   let addWifi = document.getElementById("wifi").checked;
   
   totalCost += roomRate * nights;
   
   // Add-ons per night
   totalCost += addBreakfast ? BREAKFAST_COST * nights : 0;
   totalCost += addParking ? PARKING_COST * nights : 0;
   totalCost += addWifi ? WIFI_COST * nights : 0;
   
   // Display estimate
   document.getElementById("estimate").innerHTML = "$" + totalCost;
}
