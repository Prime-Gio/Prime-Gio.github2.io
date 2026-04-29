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

//The Silver Haven hotel review page.
let reviewers = ["WillHa85", "GoldFry26", "Mittens41", "Tompkins8"];
let reviewType = ["P", "N", "P", "P"];
let stars = [5, 2, 4, 4];
let reviewDates = ["11/18/2024", "11/17/2024", "11/15/2024", "11/10/2024"];
let reviews = [
  "The Silver Haven provided exceptional service and a cozy room. I have stayed at many hotels and this one is my new favorite.",
  "The hotel grounds are lovely, but the spa booking process was confusing. I hope the staff improves the reservation system.",
  "The room were so amazing and the Wi-Fi was great. I had a minor issue with the air conditioning, but the maintenance team was quick to resolve it.",
  "The terrace view and breakfast buffet were fantastic. Still one of the best hotel stays in the area."
];
let reviewTitles = [
  "Perfect stay at The Silver Haven",
  "Nice hotel, but spa booking confusing",
  "Great room and Wi-Fi, minor AC issue",
  "Beautiful view and great breakfast"
];

// Added lightbox statments from the handson activity
let imgFiles = ["images/Building.jpg", "images/Front_Entrance.jpg", "images/Front_Desk.jpg",
                "images/Main_Lobby.jpg", "images/Hallway.jpg", "images/Single_Room_Shot.jpg",
                "images/Room_Bathroom.jpg", "images/Pool.jpg"];
// Captions associated with each image
let imgCaptions = new Array(8);
imgCaptions[0]="The exterior of the building";
imgCaptions[1]="The front entrance of the building";
imgCaptions[2]="The front desk of the building";
imgCaptions[3]="The main lobby of the building";
imgCaptions[4]="A hallway in the building";
imgCaptions[5]="A single room in the building";
imgCaptions[6]="The bathroom in a single room";
imgCaptions[7]="The pool at the building";
let imgCount = imgFiles.length;

// Setup form on load
window.addEventListener("load", setupPage);

function setupPage() {
  // Only initialize the estimate form on pages containing the form
  if (document.getElementById("estimateForm")) {
    setupForm();
  }

  // Only initialize reviews on the review page
  if (document.getElementById("reviewSection")) {
    setupReviews();
  }
  // Initialize lightbox if on a page with it
  if (document.getElementById("lightbox")) {
    createLightbox();
  }
}

function setupForm() {
   document.getElementById("nights").value = 1;
   document.getElementById("breakfast").checked = false;
   document.getElementById("parking").checked = false;
   document.getElementById("wifi").checked = false;
   
   getEstimate();
   // Add Event Handler 
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

   // Add-on costs per night
   totalCost += addBreakfast ? BREAKFAST_COST * nights : 0;
   totalCost += addParking ? PARKING_COST * nights : 0;
   totalCost += addWifi ? WIFI_COST * nights : 0;
   
   // Display the total cost in the estimate section
   document.getElementById("estimate").innerHTML = "$" + totalCost;
}


function setupReviews() {
  const reviewSection = document.getElementById("reviewSection");
  reviewSection.innerHTML = "";

  for (let index = 0; index < reviewers.length; index++) {
    // Create a string of stars based on the rating
    const rating = "★".repeat(stars[index]) + "☆".repeat(5 - stars[index]);
    // Convert review type code to a label
    const typeLabel = reviewType[index] === "P"
      ? "Positive"
      : reviewType[index] === "N"
      ? "Negative"
      : "Neutral";

    const reviewCard = document.createElement("article");
    reviewCard.className = "review-card";

    reviewCard.innerHTML = `
      <table>
        <caption>${reviewTitles[index]}</caption>
        <tr><th>Review Type</th><td>${typeLabel}</td></tr>
        <tr><th>By</th><td>${reviewers[index]}</td></tr>
        <tr><th>Review Date</th><td>${reviewDates[index]}</td></tr>
        <tr><th>Rating</th><td>${rating}</td></tr>
        <tr><td colspan="2">${reviews[index]}</td></tr>
      </table>
    `;
    reviewSection.appendChild(reviewCard);
  }
}

function createLightbox() {
  // Lightbox Container
   let lightBox = document.getElementById("lightbox");

   // 1. Create a container for the controls (Counter + Buttons)
   let lbControls = document.createElement("div");
   lbControls.id = "lbControls";
   lightBox.appendChild(lbControls);

   let lbCounter = document.createElement("div");
   let lbPrev = document.createElement("div");
   let lbNext = document.createElement("div");
   let lbPlay = document.createElement("div");
   
   // 2. Append the buttons to the control box
   lbControls.appendChild(lbCounter);
   lbControls.appendChild(lbPrev);
   lbControls.appendChild(lbNext);
   lbControls.appendChild(lbPlay);

   // Counter Setup
   lbCounter.id = "lbCounter"; 
   let currentImg = 1;
   lbCounter.textContent = currentImg + " / " + imgCount;

   // Previous Button
   lbPrev.id = "lbPrev"; 
   lbPrev.innerHTML = "&#9664;";
   lbPrev.onclick = showPrev;

   // Next Button
   lbNext.id = "lbNext";
   lbNext.innerHTML = "&#9654;";
   lbNext.onclick = showNext;

   // Play Button
   lbPlay.id = "lbPlay"; 
   lbPlay.innerHTML = "&#9199;";
   let timeID;
   lbPlay.onclick = function() {
      if (timeID) {
         window.clearInterval(timeID);
         timeID = undefined;
      } else {
         showNext();
         timeID = window.setInterval(showNext, 1500);
      }
   }

   // 3. Create the Image container and append it AFTER the controls
   let lbImages = document.createElement("div");
   lightBox.appendChild(lbImages);
   lbImages.id = "lbImages";

   for (let i = 0; i < imgCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createOverlay;
      lbImages.appendChild(image);
   }

   // The function to show the next image in the lightbox
   function showNext() {
      lbImages.appendChild(lbImages.firstElementChild);
      (currentImg < imgCount) ? currentImg++ : currentImg = 1;
      lbCounter.textContent = currentImg + " / " + imgCount;
   }
   // The function to show the previous image in the lightbox
   function showPrev() {
      lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild);
      (currentImg > 1) ? currentImg-- : currentImg = imgCount;
      lbCounter.textContent = currentImg + " / " + imgCount;
   }
   
   function createOverlay() {
      let overlay = document.createElement("div");
      overlay.id = "lbOverlay";
      // Add the image and caption to the overlay
      let figureBox = document.createElement("figure");
      overlay.appendChild(figureBox);
      // Add the image to the figure box
      let overlayImage = this.cloneNode("true");
      figureBox.appendChild(overlayImage);
      // Add the caption to the figure box
      let overlayCaption = document.createElement("figcaption");
      overlayCaption.textContent = this.alt;
      figureBox.appendChild(overlayCaption);
      // Add a close button to the overlay
      let closeBox = document.createElement("div");
      closeBox.id = "lbOverlayClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function() {
         document.body.removeChild(overlay);
      }      
      overlay.appendChild(closeBox);
      
      document.body.appendChild(overlay);
   }   
}
