function checkifpossible(recipie, foodinformation) {
  var alltheingredients = recipie.ingredient;
  console.log(alltheingredients);
  var insideoffridge = "yes";
  for (let i = 0; i < alltheingredients.length; i++) {
    var infridge = false;
    var itemname = alltheingredients[i].itemname;
    var quantity = alltheingredients[i].quantity;
    for (let j = 0; j < foodinformation.length; j++) {
      if (
        itemname == foodinformation[j].name &&
        quantity <= foodinformation[j].quantity
      ) {
        console.log(foodinformation[j]);
        infridge = true;
      }
    }
    console.log(infridge);
    if (infridge == false) {
      insideoffridge = "no";
    }
  }
  console.log(insideoffridge);
  return insideoffridge;
}

async function recipiecheck() {
  const recipies = await fetch("http://localhost:3000/recipies")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
  const fooditems = await fetch("http://localhost:3000/Fooditem")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
  console.log(recipies);
  console.log(fooditems);
  for (let i = 0; i < recipies.length; i++) {
    $("#recipietable").append(
      "<tr>" +
        "<td>" +
        recipies[i].name +
        "</td>" +
        "<td>" +
        recipies[i].description +
        "</td>" +
        "<td>" +
        checkifpossible(recipies[i], fooditems) +
        "<td>" +
        "</tr>"
    );
  }
}
recipiecheck();
