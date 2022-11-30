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
      if (json[i].name == "egg") {
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
      } else if (
        json[i].name == "cheese" ||
        json[i].name == "pork" ||
        json[i].name == "beef"
      ) {
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

      if (json.name == "egg") {
        $("#quantity").removeClass("donotshow");
        $("#quantitylabel").removeClass("donotshow");
        $("#quantityingrams").addClass("donotshow");
        $("#quantityingramslabel").addClass("donotshow");
      } else if (
        json.name == "cheese" ||
        json.name == "beef" ||
        json.name == "pork"
      ) {
        $("#quantity").addClass("donotshow");
        $("#quantitylabel").addClass("donotshow");
        $("#quantityingrams").removeClass("donotshow");
        $("#quantityingramslabel").removeClass("donotshow");
      }

      $("#savebutton").click(function () {
        var food = $("#food").val();
        var quantity;
        if (food == "egg") {
          quantity = $("#quantity").val();
        } else if (food == "cheese" || food == "beef" || food == "pork") {
          quantity = $("#quantityingrams").val();
        }

        var expiredate = $("#expiredate").val();
        var fooddescription = $("#fooddescription").val();

        var type = json.type;
        if (food == "egg" || food == "cheese") {
          type = "milkproduct";
        } else if (food == "beef" || food == "pork") {
          type = "meat";
        }

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
});
