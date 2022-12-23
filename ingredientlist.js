fetch("http://localhost:3000/Fooditem")
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((json) => {
    console.log(json);
    for (let i = 0; i < json.length; i++) {
      //TO DO: create a 'tr element' and append it to the ingreidentlist, *egg and other items have different tr elements*
      // for loop goes through every element in a list, and the number in a for loop is defined here as i  // we defined i as 0, so i begins from 0. --> then, it deices if i is smaller than json.length or not --> if it is smaller than json.length, the jquery tag below starts running --> after that, it moves to the next step which is adding 1 to the variable 'i'
      // for (define start, define end, define interval i = i + 1)

      $("#ingredienttable").append(
        "<tr>" +
          "<td>" +
          json[i].name +
          "</td>" +
          "<td>" +
          json[i].quantity +
          "</td>" +
          "<td>" +
          json[i].expiredate +
          "</td>" +
          "<td>" +
          json[i].description +
          "</td>" +
          "<td>" +
          "<button type='button' onclick='editbutton(" +
          json[i].id +
          ")'>Click here!</button>" +
          "</td>" +
          "<td>" +
          "<button type='button' onclick='deletebutton(" +
          json[i].id +
          ")'>Click here!</button>" +
          "</td>" +
          "</tr>"
      );
    }
  });

function deletebutton(id) {
  console.log(id);
  fetch("http://localhost:3000/Fooditem/" + id, {
    method: "DELETE", // DELETE means to delete data
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  location.reload();
}

function showquantity() {
  $("#quantity").removeClass("donotshow");
  $("#quantitylabel").removeClass("donotshow");
  $("#quantityingrams").addClass("donotshow");
  $("#quantityingramslabel").addClass("donotshow");
}

function showquantityingrams() {
  $("#quantity").addClass("donotshow");
  $("#quantitylabel").addClass("donotshow");
  $("#quantityingrams").removeClass("donotshow");
  $("#quantityingramslabel").removeClass("donotshow");
}

let quantitydictionary = {
  egg: showquantity,
  cheese: showquantityingrams,
  beef: showquantityingrams,
  pork: showquantityingrams,
};

let foodtypedictionary = {
  egg: { quantity: "#quantity", type: "milkproduct" },
  cheese: { quantity: "#quantityingrams", type: "milkproduct" },
  beef: { quantity: "#quantityingrams", type: "meat" },
  pork: { quantity: "#quantityingrams", type: "meat" },
};

function editbutton(id) {
  console.log(id);
  fetch("http://localhost:3000/Fooditem/" + id)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((json) => {
      console.log(json);
      $("#food").append(
        "<option value=" + json.name + " selected>" + json.name + "</option>"
      );
      $("#quantity").val(json.quantity);
      $("#quantityingrams").val(json.quantity);
      $("#expiredate").val(json.expiredate);
      $("#fooddescription").text(json.description);

      quantitydictionary[json.name]();

      $("#savebutton").click(function () {
        var food = $("#food").val();
        var quantity = $(foodtypedictionary[food].quantity).val();

        var expiredate = $("#expiredate").val();
        var fooddescription = $("#fooddescription").val();

        var type = foodtypedictionary[food].type;

        fetch("http://localhost:3000/Fooditem/" + id, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: food,
            type: type,
            quantity: quantity,
            purchasedate: json.purchasedate,
            expiredate: expiredate,
            description: fooddescription,
          }),
        });
        location.reload();
      });
      $("#cancelbutton").click(function () {
        location.reload();
      });
    });
}

$("#food").change(function () {
  fooditem = document.getElementById("food").value;
  quantitydictionary[fooditem]();
});
