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

function createLightbox() 
{
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
// Sets a consistent key for The Silver Haven's storage
const STORAGE_KEY = 'haven_cart'; 


// Retrieves the cart from localStorage, or returns an empty array if no cart exists
function getCart() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Saves the shopping cart array to localStorage under the defined key
function saveCart(cartArray) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartArray));
}

function addToCart(name, price, idNum) {
    // 1. Get the values the user picked from the dropdowns
    const chosenColor = document.getElementById('color-' + idNum).value;
    const chosenSize = document.getElementById('size-' + idNum).value;
    const chosenQty = parseInt(document.getElementById('qty-' + idNum).value);

    // 2. Get the current cart from storage
    let cart = getCart();

    // 3. Check if the exact same item configuration is already in the cart
    let existingItem = cart.find(item => 
        item.name === name && 
        item.color === chosenColor && 
        item.size === chosenSize
    );

    if (existingItem) {
        // If it exists, just add the new quantity to the existing quantity
        existingItem.qty = parseInt(existingItem.qty) + chosenQty;
    } else {
        // If it doesn't exist, create the new item object and push it 
        const newItem = {
            name: name,
            price: price,
            color: chosenColor,
            size: chosenSize,
            qty: chosenQty
        };
        cart.push(newItem);
    }
    // 4. Save the updated cart and alert the user
    saveCart(cart);
    alert(chosenQty + " " + name + " (" + chosenColor + " " + chosenSize + ") added to cart!");
}

function renderCart() {
    const cart = getCart();
    const display = document.getElementById('cart-area');
    const totalBox = document.getElementById('total-box');
    
    display.innerHTML = "";
    let total = 0;

    // Check if cart is empty
    if (cart.length === 0) {
        // Disable the Shipping button if cart is empty
        display.innerHTML = "<h3>Your cart is empty</h3><p>Return to the shop to add items.</p>";
        if (totalBox) totalBox.textContent = "0.00";
        return; 
    }
    

    // Build the cart display dynamically
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const row = document.createElement('div');
        row.className = "cart-row"; // Apply styling via styles.css

        // Item Name & Price
        row.innerHTML = `<strong>${item.name}</strong> <span>$${parseFloat(item.price).toFixed(2)}</span>`;

        // Color Selector (Editable in Cart)
        const colorSel = document.createElement('select');
        const colors = ["White", "Gray", "Black", "Navy", "Silver", "Green"];
        colors.forEach(c => {
            const opt = document.createElement('option');
            opt.textContent = c;
            if (c === item.color) opt.selected = true;
            colorSel.appendChild(opt);
        });
        colorSel.onchange = function() { updateItem(i, 'color', colorSel.value); };
        row.appendChild(colorSel);

        // Size Selector (Editable in Cart)
        const sizeSel = document.createElement('select');
        const sizes = ["Small", "Medium", "Large", "XL", "Standard", "16oz"];
        sizes.forEach(s => {
            const opt = document.createElement('option');
            opt.textContent = s;
            if (s === item.size) opt.selected = true;
            sizeSel.appendChild(opt);
        });
        sizeSel.onchange = function() { updateItem(i, 'size', sizeSel.value); };
        row.appendChild(sizeSel);

        // Quantity Input (Editable in Cart)
        const qtyInp = document.createElement('input');
        qtyInp.type = "number";
        qtyInp.value = item.qty;
        qtyInp.min = "1";
        qtyInp.style.width = "50px";
        qtyInp.onchange = function() { updateItem(i, 'qty', parseInt(qtyInp.value)); };
        row.appendChild(qtyInp);

        // Remove Button
        const remBtn = document.createElement('button');
        remBtn.textContent = "Remove";
        remBtn.onclick = function() {
            cart.splice(i, 1);
            saveCart(cart);
            renderCart();
        };
        row.appendChild(remBtn);

        display.appendChild(row);
        total += (parseFloat(item.price) * parseInt(item.qty));
    }
    
    if (totalBox) totalBox.textContent = total.toFixed(2);
}

function updateItem(index, field, newValue) {
    let cart = getCart();
    cart[index][field] = newValue; // Updates the specific property (color, size, or quantity)
    saveCart(cart);
    renderCart(); // Refresh display to update totals
}

function initShippingPage() {
    displayShippingPage();
    const form = document.getElementById('shipping-form');
    if (form) form.addEventListener('submit', submitShippingForm);
}

// Build the order summary on the shipping page using the cart data from storage
function displayShippingPage() {
    const summaryBox = document.getElementById('shipping-summary');
    if (!summaryBox) return;

    const cart = getCart(); // Uses 'haven_cart' from previous functions
    let total = 0;

    // Build the HTML for each item in the summary
    let html = cart.map(item => {
        const itemTotal = parseFloat(item.price) * parseInt(item.qty);
        total += itemTotal;
        return `
            <div class="summary-line">
                <span>${item.name} (${item.size}, ${item.color}) x ${item.qty}</span>
                <span>$${itemTotal.toFixed(2)}</span>
            </div>`;
    }).join('');

    // Add the final total line
    html += `
        <div class="summary-line" style="border-top: 2px solid #264653; margin-top: 10px;">
            <strong>Total</strong>
            <strong>$${total.toFixed(2)}</strong>
        </div>`;
        
    summaryBox.innerHTML = html;
}

// Copyies Billing information to Shipping fields
function copyBillingAddress() {
    const isChecked = document.getElementById('sameAsBilling').checked;
    
    if (isChecked) {
        document.getElementById('fullName').value = document.getElementById('billName').value;
        document.getElementById('address').value = document.getElementById('billAddress').value;
        document.getElementById('city').value = document.getElementById('billCity').value;
        document.getElementById('state').value = document.getElementById('billState').value;
        document.getElementById('zipCode').value = document.getElementById('billZip').value;
    }
}

// SUBMISSION & VALIDATION
function submitShippingForm(event) {
    event.preventDefault();
    
    // Validates at least 3 fields
    const name = document.getElementById('billName').value;
    const zip = document.getElementById('billZip').value;
    const state = document.getElementById('billState').value;
    const messageArea = document.getElementById('shipping-message');

    // 1. Validate Name (must be at least 2 characters)
    if (name.length < 2) {
        alert("Please enter a valid full name.");
        return;
    }

    // 2. Validate Zip Code (must be exactly 5 digits)
    const zipRegex = /^[0-9]{5}$/;
    if (!zipRegex.test(zip)) {
        alert("Please enter a valid 5-digit Zip Code.");
        return;
    }

    // 3. Validate State (must be 2 letters)
    if (state.length !== 2) {
        alert("Please enter a 2-letter state abbreviation.");
        return;
    }

    // If all validations pass, show success message
    messageArea.innerHTML = `
        <div class="message-box" style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 8px;">
            <strong>Success!</strong> Thank you, ${name}. Your simulated order for The Silver Haven has been placed.
        </div>`;

    // Clear cart and reset summary
    localStorage.removeItem('haven_cart');
    event.target.reset();
    displayShippingPage();
}