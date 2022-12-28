function checkifpossible(recipie, foodinformation) {
  let requiredingredient = {};
  var alltheingredients = recipie.ingredient;
  console.log(alltheingredients);
  var insideoffridge = "yes";
  for (let i = 0; i < alltheingredients.length; i++) {
    var infridge = false;
    var itemname = alltheingredients[i].itemname;
    var quantity = alltheingredients[i].quantity;
    for (let j = 0; j < foodinformation.length; j++) {
      if (itemname == foodinformation[j].name) {
        requiredingredient[itemname] = [foodinformation[j].quantity, quantity];
        if (quantity <= foodinformation[j].quantity) {
          console.log(foodinformation[j]);
          infridge = true;
        }
      }
    }
    console.log(infridge);
    if (infridge == false) {
      insideoffridge = "no";
    }
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

let quantitydictionary = {
  egg: showquantity,
  cheese: showquantityingrams,
  beef: showquantityingrams,
  pork: showquantityingrams,
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
  <select name="ingredient" id="ingredient${currentnumber}">
    <option value="egg">egg</option>
    <option value="cheese">cheese</option>
    <option value="beef">beef</option>
    <option value="pork">pork</option>
  </select></div>

  <div class="chooseaningredient"><label for="quantity" id="quantitylabel${currentnumber}">quantity: </label>

  <input type="number" id="quantity${currentnumber}" name="quantity" min="1" max="100" />

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
    quantityjs = document.getElementById("quantity" + i).value;
    quantityingramsjs = document.getElementById("quantityingrams" + i).value;
    ingredientjs = document.getElementById("ingredient" + i).value;
    realquantity = 1;
    if (ingredientjs == "egg") {
      realquantity = quantityjs;
    } else if (ingredientjs == "cheese") {
      realquantity = quantityingramsjs;
    } else if (ingredientjs == "beef" || ingredientjs == "pork") {
      realquantity = quantityingramsjs;
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
    .then((res) => console.log(res));
}

$("#recipieform").submit(function (e) {
  e.preventDefault();
  recipieadd();
});
