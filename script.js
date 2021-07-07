// Get body element
let bodyElement = document.querySelector('body');

// Get modal and store
let cartModal = document.getElementById('cart-modal');

// Get button that opens modal
let cartModalBtn = document.getElementById('cart');

// Get checkout and continue shopping button element
let continueShoppingElement = document.getElementById('continue-shopping');
let checkoutElement = document.getElementById('checkout');

//  Open modal when user clicks on cart icon
// cartModalBtn.onclick = () => {
//    bodyElement.style.backgroundColor = '#ffffff';
//    bodyElement.style.opacity = 0.5;
//    cartModal.style.display = "block";
// }



continueShoppingElement.onclick = (event) => {
   if(event.target == continueShoppingElement){
      cartModal.style.display = "none";
      bodyElement.style.backgroundColor = '#FFE9DC';
      bodyElement.style.opacity = 1;
   }
}

// checkoutElement.onclick = (event) => {
//    if(event.target == checkoutElement){
//       cartModal.style.display = "none";
//       bodyElement.style.backgroundColor = '#FFE9DC';
//       bodyElement.style.opacity = 1;
//    }
// }




function payWithPaystack() {
    let handler = PaystackPop.setup({
      key: 'pk_test_4504976357a69d02a854e672905145e89f0b250f', // Replace with your public key
      email: document.getElementById("email").value,
      amount: document.querySelector('#amount').value * 100, 
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function(){
        alert('Window closed.');
      },
      callback: function(response){
        let message = 'Payment complete! Reference: ' + response.reference;
        alert(message);
      }
    });
   console.log(document.getElementById('amount').value);

    handler.openIframe();
  }




// window.addEventListener('mouseup', (event) => {
// if (event.target != cartModalBtn && event.target.parentNode != cartModal) {
//    cartModal.style.display = 'none';
// }
// checkElement(event);


// });

// function checkElement(e) {
//    // e.preventDefault();
//    let toFind = 'cart-modal';

//    let currentElement = e.target;
//    while (toFind !== currentElement.id.toLowerCase() && currentElement.tagName.toLowerCase() !== 'html') {
//         currentElement = currentElement.parentNode;
//       if (currentElement == toFind) {
//         cartModal.style.display = 'block';
//       }
//    // console.log(currentElement);

//    }
// }
