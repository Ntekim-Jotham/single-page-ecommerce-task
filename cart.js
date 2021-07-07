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

   if(addToCartButtonClick.innerText == checkContent) {
      if (!checkItemExist) {
         addToCartButtonClick.style.backgroundColor = '#FFCD9E';
         addToCartButtonClick.innerText = 'Remove from Cart'; 
         addToCartButtonClick.style.color = 'black'; 
         cartItems.push(tempItem);
         createTableElements(); 
      }  
   }else{
      addToCartButtonClick.style.backgroundColor = '#FF9A3D';
      addToCartButtonClick.innerText = 'ADD TO CART'; 
      addToCartButtonClick.style.color = 'whitesmoke'; 
      bodyElement.addEventListener('click', event => {

         let tempItem = products.find((item) => item.id == item_id);
         let itemFind = cartItems.includes(tempItem);
         let itemIndex = cartItems.findIndex((item) => item.id == tempItem.id);
   
          if (event.target == addToCartButtonClick) {
               if( itemFind){
                  cartItems.splice(itemIndex, 1);
                  tableBody.rows[itemIndex].remove();
                  calculateCartItemsAmount();
               } 
         }
         
      });
      // removeItemFromCart(item_id);
   }
   displayCartItems();

}

// Create row and column element for cart table each time the addToCart button is clicked
function createTableElements() {
   let row = document.createElement('tr');
   row.style.height = "35px";

   let cell1 = document.createElement('td');
   cell1.style.display = "flex";
   cell1.style.flexWrap = "wrap";
   cell1.style.flexDirection = row;
   cell1.style.flexBasis = 60 + "px";
   cell1.style.fontSize = 16 + "px";
   
   let cell2 = document.createElement('td');
   cell2.id = "item-name";
   cell2.style.display = "flex";
   cell2.style.flexWrap = "wrap";
   cell2.style.flexDirection = row;
   cell2.style.flexBasis = 140 + "px";
   cell2.style.fontSize = 16 + "px";

   let cell3 = document.createElement('td');
   cell3.className = "price";
   cell3.style.display = "flex";
   cell3.style.flexWrap = "wrap";
   cell3.style.flexDirection = row;
   cell3.style.flexBasis = 140 + "px";
   cell3.style.fontSize = 16 + "px";

   let cell4 = document.createElement('td');
   let incrementButton = document.createElement('button');
   let decrementButton = document.createElement('button');
   let qtyTotalPara = document.createElement('p');

   cell4.className = "item-qty-cell"
   cell4.style.display = "flex";
   cell4.style.flexWrap = "wrap";
   cell4.style.flexDirection = row;
   cell4.style.flexBasis = 140 + "px";
   cell4.style.fontSize = 16 + "px";

   decrementButton.id = "decrement";
   decrementButton.innerHTML = "-";
   decrementButton.style.backgroundColor = "#FF9A3D";
   decrementButton.style.height = 25 + "px";
   decrementButton.style.width = 30 + "px";
   decrementButton.style.border = 1 + "px solid #FF9A3D";
   decrementButton.style.borderRadius = 5 + "px";
   decrementButton.style.textAlign = "center";
   decrementButton.style.fontSize = 18 + "px";

   qtyTotalPara.className = "item-qty-para";
   qtyTotalPara.innerHTML = 1;
   qtyTotalPara.style.position = "relative";
   qtyTotalPara.style.textAlign = "center";
   qtyTotalPara.style.top = "-" + 10 + "px";
   qtyTotalPara.style.fontWeight = 500;
   qtyTotalPara.style.marginLeft = 5 +"px";
   qtyTotalPara.style.marginRight = 5 +"px";


   incrementButton.innerHTML = "+";
   incrementButton.style.backgroundColor = "#FF9A3D";
   incrementButton.style.height = 25 + "px";
   incrementButton.style.width = 30 + "px";
   incrementButton.style.border = 1 + "px solid #FF9A3D";
   incrementButton.style.borderRadius = 5 + "px";
   incrementButton.style.textAlign = "center";
   incrementButton.style.fontSize = 18 + "px";
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
   removeButton.style.backgroundColor = "#FFCD9E";
   removeButton.style.border = "1px solid #FFCD9E";
   removeButton.style.borderRadius = "10px";
   removeButton.style.height = "25px";
   removeButton.style.fontSize = "16px";
   removeButton.style.fontWeight = 600;
   cell5.appendChild(removeButton);

   row.appendChild(cell1);

   row.appendChild(cell2);
   row.appendChild(cell3);
   row.appendChild(cell4);
   row.appendChild(cell5);


   tableBody.appendChild(row);

   // Push the product into cartItems array after creating table elements
   // cartItems.push(item);

}


// Display items on cart table
function displayCartItems() {

   let indexCell = '';
   let itemNameCell = '';
   let priceCell = '';
   let qtyCell = '';

   // let i = '';
   for (let i = 0; i < cartItems.length;  i++) {
       

      indexCell = tableBody.rows[i].cells[0];
      itemNameCell = tableBody.rows[i].cells[1];
      priceCell = tableBody.rows[i].cells[2];
      qtyCell = tableBody.rows[i].cells[3].childNodes[1];

   }
   cartItems.forEach(item => {
      item.qty = 1;
      incrementQuantity(item);

      decrementQuantity(item);
      // indexCell.innerHTML = i;
      itemsIndexing(indexCell);
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
   let totalAmountElement = document.querySelector('.text').lastElementChild; 
   totalAmountElement.value = '#' + totalAmount;
   console.log(totalAmountElement.value);
   return totalAmountElement;

}

// Numbering of items based on the number of items on cart
function itemsIndexing(indexColumn) {
   let i = 0; 
   while (i < cartItems.length) {
      i += 1;
      indexColumn.innerHTML = i; 
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
function removeItemFromCart(itemId) {
   let addToCartButtonClick = document.getElementById(itemId);
   let addToCartButton = document.querySelectorAll('.product-button');
      
   
            
   let rowLastcell = tableBody.querySelectorAll('.delete-button');
   

   
   rowLastcell.forEach(cell => {
      
      cell.onclick = () => {
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
      }
   });  
}