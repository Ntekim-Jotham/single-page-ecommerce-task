// Get add to cart button element
let addToCartButton = document.getElementsByClassName("product-button");

let products = [
{
   index: 1,
   id: 'p1',
   name: 'Samsung TV',
   price: 500000
},
{
   index: 2,
   id: 'p2',
   name: 'Pixel 4a',
   price: 250000
},
{
   index: 3,
   id: 'p3',
   name: 'PS 5',
   price: 300000
},
{
   index: 4,
   id: 'p4',
   name: 'MacBook Air',
   price: 800000
},
{
   index: 5,
   id: 'p5',
   name: 'Apple Watch',
   price: 95000
},
{
   index: 6,
   id: 'p6',
   name: 'Air Pods',
   price: 75000
},
];




let tableBody = document.querySelector('tbody');

let cartItems = [];

function addToCart(item_id){
   let addToCartButtonClick = document.getElementById(item_id); 
   let tempItem = products.find((item) => item.id == item_id);
   let checkItemExist = cartItems.includes(tempItem);

   let checkContent = 'ADD TO CART';

      bodyElement.addEventListener('click', event => {

         let itemFind = cartItems.find((item) => item.id == item_id);
         // let itemFind = cartItems.includes(tempItem);
         let itemIndex = cartItems.findIndex((item) => item.id == tempItem.id);
         if(event.target == addToCartButtonClick) {
            if(addToCartButtonClick.innerText == checkContent) {
               if (!checkItemExist) {
                  addToCartButtonClick.style.backgroundColor = '#FFCD9E';
                  addToCartButtonClick.innerText = 'Remove from Cart'; 
                  addToCartButtonClick.style.color = 'black'; 
                  cartItems.push(tempItem);
                  createTableElements(); 
                  itemsIndexing();
                  displayNumberOfItemsAddedToCart();
                  displayCartItems();
               }  
            }else if(addToCartButtonClick.innerText == 'Remove from Cart') {
               addToCartButtonClick.style.backgroundColor = '#FF9A3D';
               addToCartButtonClick.innerText = 'ADD TO CART'; 
               addToCartButtonClick.style.color = 'whitesmoke';
               if(itemFind){
                  cartItems.splice(itemIndex, 1);
                  tableBody.rows[itemIndex].remove();
                  calculateCartItemsAmount();
                  itemsIndexing();
                  displayNumberOfItemsAddedToCart();
                  displayCartItems();

               } 
            }     
         }
         
      });
   }
   



function displayNumberOfItemsAddedToCart() {
   let cartSpanElement = document.querySelector('#cart-button').lastElementChild;
   let itemCount = tableBody.rows.length;
   cartSpanElement.innerText = itemCount;
   // console.log(itemCount == cartItems.length);
}

// Create row and column element for cart table each time the addToCart button is clicked
function createTableElements() {
   let row = document.createElement('tr');

   let cell1 = document.createElement('td');
   cell1.classList.add('t1');
   
   let cell2 = document.createElement('td');
   cell2.id = "item-name";
   cell2.classList.add('t2');


   let cell3 = document.createElement('td');
   cell3.className = "price";
   cell3.classList.add('t3');

   let cell4 = document.createElement('td');
   let incrementButton = document.createElement('button');
   let decrementButton = document.createElement('button');
   let qtyTotalPara = document.createElement('p');

   cell4.className = "item-qty-cell";
   cell4.classList.add('t4');

   decrementButton.id = "decrement";
   decrementButton.innerHTML = "-";
   decrementButton.classList.add('decrement-button');
   

   qtyTotalPara.className = "item-qty-para";
   qtyTotalPara.innerHTML = 1;
   qtyTotalPara.classList.add('qty-total-para');
   


   incrementButton.innerHTML = "+";
   incrementButton.classList.add('increment-button');

   cell4.appendChild(decrementButton);
   cell4.appendChild(qtyTotalPara);
   cell4.appendChild(incrementButton);


   let cell5 = document.createElement('td');
   cell5.className = "delete-button";
   cell5.style.display = "flex";
   cell5.style.flexWrap = "wrap";
   cell5.style.flexDirection = "row";

   let removeButton = document.createElement('button');
   removeButton.innerHTML = "Remove";
   removeButton.classList.add('remove-button');
  
   cell5.appendChild(removeButton);

   row.appendChild(cell1);

   row.appendChild(cell2);
   row.appendChild(cell3);
   row.appendChild(cell4);
   row.appendChild(cell5);


   tableBody.appendChild(row);

}


// Display items on cart table
function displayCartItems() {

   let indexCell = '';
   let itemNameCell = '';
   let priceCell = '';
   let qtyCell = '';
   let index = '';
   // let i = '';
   for (let i = 0; i < tableBody.rows.length;  i++) {
       
      index = i;
      indexCell = tableBody.rows[i].cells[0];
      itemNameCell = tableBody.rows[i].cells[1];
      priceCell = tableBody.rows[i].cells[2];
      qtyCell = tableBody.rows[i].cells[3].childNodes[1];

   }
   cartItems.forEach(item => {
      item.qty = 1;
      incrementQuantity(item);

      decrementQuantity(item);
      // indexCell.innerHTML = index;
      itemNameCell.innerHTML = item.name;
      priceCell.innerHTML = item.price; 
      qtyCell.innerHTML = item.qty;
   });
   removeItemFromCart();
   calculateCartItemsAmount(); 
}


// Calculate total price of items in cart base on qty function call
function calculateCartItemsAmount() {
   let amount = [];

   for (let i = 0; i < tableBody.rows.length; i++) {
     let qty = tableBody.rows[i].cells[3].childNodes[1].textContent;
     let price = tableBody.rows[i].cells[2].textContent;
      amount.push(price * qty);
   }

   let totalAmount = amount.reduce(function (a, b) { 
      return a + b;
   }, 0);
   
   // Get element that displays total amount on cart
   let totalAmountElement = document.querySelector('#amount'); 
   totalAmountElement.innerHTML = '#' + totalAmount;
   return totalAmountElement;

}

// Numbering of items based on the number of items on cart
function itemsIndexing() {
   let i = 0; 
   while (i < tableBody.rows.length) {
      // if (tableBody.rows.length == cartItems.length) {
         let indexColumn = tableBody.rows[i].cells[0];
         i += 1;
         indexColumn.innerHTML = i;
      // }
   }
}

// Function to decrement quantity for each item
function decrementQuantity(item) {
   let decrementButton = '';
   let qtyCell = '';
   for (let i = 0; i < tableBody.rows.length; i++) {
      decrementButton = tableBody.rows[i].cells[3].childNodes[0];
      qtyCell = tableBody.rows[i].cells[3].childNodes[1];
   }
  
   decrementButton.onclick = () => {
      if(qtyCell.innerHTML == 1){
        alert("Quantity of items can't be lower than 1");
      }else{
         item.qty--;
         qtyCell.innerHTML = item.qty;
         calculateCartItemsAmount();
      }
   }
}

// Function to increment quantity for each item
function incrementQuantity(item) {
   let incrementButton = '';
   let qtyCell = '';
   for (let i = 0; i < tableBody.rows.length; i++) {
      incrementButton = tableBody.rows[i].cells[3].childNodes[2];
      qtyCell = tableBody.rows[i].cells[3].childNodes[1];
    }
   incrementButton.onclick = () => {
      item.qty++;
      qtyCell.innerHTML = item.qty;
      calculateCartItemsAmount();
   }
}

// Remove item from cart table when the remove button is clicked
function removeItemFromCart() {
   let addToCartButton = document.querySelectorAll('.product-button');
            
   let rowLastcell = tableBody.querySelectorAll('.delete-button');
   
   rowLastcell.forEach(cell => {
      
      cell.onclick = () => {
         // let rowIndexCell = cell.parentNode.childNodes[0];
         let rowNameCell = cell.parentNode.childNodes[1].innerHTML;
         let itemIndex = cartItems.findIndex((item) => item.name == rowNameCell);
         let checkCartItems = cartItems.find((item) => item.name == rowNameCell);
         addToCartButton.forEach(button => {
            if (checkCartItems.id == button.id) {
               button.style.backgroundColor = '#FF9A3D';
               button.innerText = 'ADD TO CART'; 
               button.style.color = 'whitesmoke';  
            }
         });    
         cartItems.splice(itemIndex, 1);
         cell.parentNode.remove();
         calculateCartItemsAmount();
         itemsIndexing();
         displayNumberOfItemsAddedToCart();
      }
   });  
}