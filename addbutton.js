function ingredientadd() {
  foodjs = document.getElementById("food").value; // foodjs=variable, document = looking at the entire document, funtion.getElementById = get the first html element from the given id,  .value gives us value inside html element its one of those four ingredients in this id, alternative : $("#food").value
  purchasedatejs = document.getElementById("purchasedate").value;
  expiredatejs = document.getElementById("expiredate").value;
  fooddescriptionjs = document.getElementById("fooddescription").value;
  quantityjs = document.getElementById("quantity").value;
  quantityingramsjs = document.getElementById("quantityingrams").value;
  realquantity = 1; // we defined the value "realquantity" as 1
  typejs = ""; // we defined the value as empty
  if (foodjs == "egg") {
    typejs = "eggproduct";
    realquantity = quantityjs; // if the input data is egg, then the variable 'typejs' becomes 'eggproduct' and 'realquantity' turns into 'quantityjs'
  } else if (foodjs == "cheese") {
    typejs = "milkproduct";
    realquantity = quantityingramsjs; // we differentiated some products by deciding if it is countable or not
  } else if (foodjs == "beef" || foodjs == "pork") {
    // || means "or"
    typejs = "meat";
    realquantity = quantityingramsjs;
  }
  fetch("http://localhost:3000/Fooditem", {
    // fetch links to the dataserver
    method: "POST", // POST means to store data
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }, // headers = what kind of data we are sending . in this context, it is json
    body: JSON.stringify({
      // body part contains input data
      id: Date.now(), // we used Date.now to make an unique id
      name: foodjs,
      type: typejs,
      quantity: realquantity,
      purchasedate: purchasedatejs,
      expiredate: expiredatejs,
      description: fooddescriptionjs,
    }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res)); // take the response from the dataserver and then print it on console, *200 means it worked well, 400 or 500 means there is an error*
}

$("#ingredientform").submit(function (e) {
  // from this tag, we are getting the entire form, .submit --> you can run the functon by pressing the submit button
  e.preventDefault(); // e = an event from the submit function, prevents the web page from refreshing
  ingredientadd(); // this tag runs the function we defined above
}); // the line 43 to 47 runs the function in the first line without being refreshed and submits data to the dataserver

$("#food").change(function () {
  fooditem = document.getElementById("food").value;
  if (fooditem == "egg") {
    $("#quantity").removeClass("donotshow");
    $("#quantitylabel").removeClass("donotshow");
    $("#quantityingrams").addClass("donotshow");
    $("#quantityingramslabel").addClass("donotshow");
  } else if (fooditem == "cheese" || fooditem == "beef" || fooditem == "pork") {
    $("#quantity").addClass("donotshow");
    $("#quantitylabel").addClass("donotshow");
    $("#quantityingrams").removeClass("donotshow");
    $("#quantityingramslabel").removeClass("donotshow");
  }
}); // if the input fooditem is egg, then the two ids in the line 54 and 55 are going to be hidden and the other two are going to be shown, otherwise, the ids in the line 54 and 55 are going to be shown
