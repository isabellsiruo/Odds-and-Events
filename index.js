//store numbers in different categories
const state = {
    bank: [], //stores all entered numbers
    oddNumbers: [], //stores sorted odd numbers
    evenNumbers: [], //stores sorted even numbers
  };
  
  //moves first number from number bank to correct category
  function moveOne() {
    if (state.bank.length > 0) {
      let num = state.bank[0]; //get first number without removing it directly
      state.bank = state.bank.slice(1); //manually remove first number using slice
      
      if (num % 2 === 0) {
        state.evenNumbers.push(num); //add to even numbers if divisible by 2
      } else {
        state.oddNumbers.push(num); //otherwise add to odd numbers
      }
      update(); //update UI after sorting
    }
  }
  
  //moves all numbers from number bank to correct category
  function moveAll() {
    let newBank = []; //temporary array to clear number bank after sorting
    for (let i = 0; i < state.bank.length; i++) {
      let num = state.bank[i]; //get each number from bank
      if (num % 2 === 0) {
        state.evenNumbers.push(num); //add even numbers to their category
      } else {
        state.oddNumbers.push(num); //add odd numbers to their category
      }
    }
    state.bank = newBank; //empty number bank after sorting
    update(); //update UI after sorting all numbers
  }

//update section with numbers by creating + appending list elements
  function display(selector, nums) {
    const area = document.querySelector(selector); //select target section
    area.innerHTML = ""; //clear existing content before updating
    
    for (let i = 0; i < nums.length; i++) {
      let listItem = document.createElement("li"); //create a new list item
      listItem.textContent = nums[i]; //set text content to number
      area.appendChild(listItem); //append new list item to section
    }
  }
  
  //update entire UI by refreshing all displayed numbers
  function update() {
    display("#numberBank output", state.bank); //update number bank section
    display("#odds output", state.oddNumbers); //update odd numbers section
    display("#evens output", state.evenNumbers); //update even numbers section
  }
  
   //handles adding numbers from input field when form is submitted
  document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); //prevent page from reloading on form submission
    let numInput = document.getElementById("number"); //get input field value
    let num = parseInt(numInput.value); //convert input value to integer
    
    if (!isNaN(num)) { //check if input is valid number
      state.bank.push(num); //add number to bank
      update(); //refresh UI after adding number
    }
    numInput.value = ""; //clear input field after submission
  });
  
  //attach event listeners for sorting actions
  document.getElementById("sortOne").addEventListener("click", moveOne); //move one number when "Sort 1" is clicked
  document.getElementById("sortAll").addEventListener("click", moveAll); //move all numbers when "Sort All" is clicked
  
  //initial render to set up UI
  update(); //ensure UI is empty when page loads
  