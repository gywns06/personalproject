function deletebutton(id) {
  console.log(id);
  fetch("https://dashing-chemical-meteoroid.glitch.me/recipies/" + id, {
    method: "DELETE", // DELETE means to delete data
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(() => location.reload());
}

function checkifpossible(recipie, foodinformation) {
  let requiredingredient = {};
  var alltheingredients = recipie.ingredient;
  console.log(alltheingredients);
  var insideoffridge = "yes";
  for (let i = 0; i < alltheingredients.length; i++) {
    var currentquantity = 0;
    var infridge = false;
    var itemname = alltheingredients[i].itemname;
    var quantity = alltheingredients[i].quantity;
    for (let j = 0; j < foodinformation.length; j++) {
      if (itemname == foodinformation[j].name) {
        currentquantity =
          currentquantity + parseInt(foodinformation[j].quantity);
      }
    }
    console.log(infridge);
    if (quantity > currentquantity) {
      insideoffridge = "no";
    }
    requiredingredient[itemname] = [currentquantity, quantity];
  }
  let requiredingredientstring = "<p>";
  for (const [key, value] of Object.entries(requiredingredient)) {
    requiredingredientstring =
      requiredingredientstring + `${key}[${value[0]}/${value[1]}] `;
  }
  requiredingredientstring = requiredingredientstring + "</p>";
  console.log(insideoffridge);
  if (insideoffridge == "no") {
    return [
      requiredingredientstring,
      '<i class="fa-regular fa-circle-xmark"></i>',
    ];
  } else {
    return [
      requiredingredientstring,
      '<i class="fa-regular fa-circle-check"></i>',
    ];
  }
  return insideoffridge;
}

async function recipiecheck() {
  const recipies = await fetch(
    "https://dashing-chemical-meteoroid.glitch.me/recipies"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
  const fooditems = await fetch(
    "https://dashing-chemical-meteoroid.glitch.me/Fooditem"
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
  console.log(recipies);
  console.log(fooditems);

  for (let i = 0; i < recipies.length; i++) {
    const [requiredingredientlist, possibleicon] = checkifpossible(
      recipies[i],
      fooditems
    );
    $("#recipietable").append(
      "<tr>" +
        "<td>" +
        recipies[i].name +
        "</td>" +
        "<td>" +
        recipies[i].description +
        "</td>" +
        "<td>" +
        possibleicon +
        "</td>" +
        "<td>" +
        requiredingredientlist +
        "</td>" +
        "<td>" +
        "<button class='deletebutton' type='button' onclick='deletebutton(" +
        recipies[i].id +
        ")'>Delete</button>" +
        "</td>" +
        "</tr>"
    );
  }
}
recipiecheck();

function showquantity(inumber) {
  $("#quantity" + inumber).removeClass("donotshow");
  $("#quantitylabel" + inumber).removeClass("donotshow");
  $("#quantityingrams" + inumber).addClass("donotshow");
  $("#quantityingramslabel" + inumber).addClass("donotshow");
}

function showquantityingrams(inumber) {
  $("#quantity" + inumber).addClass("donotshow");
  $("#quantitylabel" + inumber).addClass("donotshow");
  $("#quantityingrams" + inumber).removeClass("donotshow");
  $("#quantityingramslabel" + inumber).removeClass("donotshow");
}

let foodtypedictionary = {
  egg: { quantity: "quantity", type: "eggproduct" },
  cheese: { quantity: "quantityingrams", type: "milkproduct" },
  beef: { quantity: "quantityingrams", type: "meat" },
  pork: { quantity: "quantityingrams", type: "meat" },
  tomato: { quantity: "quantity", type: "vegetable" },
  potato: { quantity: "quantity", type: "vegetable" },
  carrot: { quantity: "quantity", type: "vegetable" },
  onion: { quantity: "quantity", type: "vegetable" },
  butter: { quantity: "quantityingrams", type: "milkproduct" },
  chicken: { quantity: "quantityingrams", type: "meat" },
};

let quantitydictionary = {
  egg: showquantity,
  cheese: showquantityingrams,
  beef: showquantityingrams,
  pork: showquantityingrams,
  tomato: showquantity,
  potato: showquantity,
  carrot: showquantity,
  onion: showquantity,
  butter: showquantityingrams,
  chicken: showquantityingrams,
};

function ingredientchanger(inputnumber) {
  $("#ingredient" + inputnumber).change(function () {
    fooditem = document.getElementById("ingredient" + inputnumber).value;
    console.log(fooditem);
    quantitydictionary[fooditem](inputnumber);
  });
}

let currentnumber = 2;

$("#ingredientbutton").click(function () {
  const ingredientdiv = $("#ingredientdiv");
  console.log(ingredientdiv);
  ingredientdiv.append(`<div class="ingredientrow"><div class="chooseaningredient"><label for="recipieingredient">Choose an ingredient:</label>
  <select name="ingredient" class="ingredientclass" id="ingredient${currentnumber}">
    <option value="egg">egg</option>
    <option value="cheese">cheese</option>
    <option value="beef">beef</option>
    <option value="pork">pork</option>
    <option value="tomato">tomato</option>
            <option value="potato">potato</option>
            <option value="carrot">carrot</option>
            <option value="onion">onion</option>
            <option value="butter">butter</option>
            <option value="chicken">chicken</option>
  </select></div>

  <div class="chooseaningredient"><label for="quantity" id="quantitylabel${currentnumber}">quantity: </label>

  <input type="number" class="quantityclass" id="quantity${currentnumber}" name="quantity" min="1" max="100" />

  <label for="quantityingrams" class="donotshow" id="quantityingramslabel${currentnumber}"
    >quantity in grams:
  </label>

  <input
    type="number"
    id="quantityingrams${currentnumber}"
    name="quantityingrams"
    min="1"
    max="5000"
    class="donotshow"
  /></div></div>`);
  ingredientchanger("" + currentnumber);
  currentnumber = currentnumber + 1;
});

ingredientchanger("1");

function recipieadd() {
  foodjs = document.getElementById("recipiename").value;
  recipiedescriptionjs = document.getElementById("recipiedescription").value;
  ingredientlist = [];
  for (let i = 1; i < currentnumber; i++) {
    ingredientjs = document.getElementById("ingredient" + i).value;

    realquantity = document.getElementById(
      foodtypedictionary[ingredientjs].quantity + i
    ).value;
    if (!realquantity) {
      realquantity = 0;
    }
    ingredientlist.push({ itemname: ingredientjs, quantity: realquantity });
  }
  console.log(foodjs);
  console.log(recipiedescriptionjs);
  console.log(ingredientlist);

  fetch("https://dashing-chemical-meteoroid.glitch.me/recipies", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: Date.now(),
      name: foodjs,
      description: recipiedescriptionjs,
      ingredient: ingredientlist,
    }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .then(() => location.reload());
}

$("#recipieform").submit(function (e) {
  e.preventDefault();
  recipieadd();
});
