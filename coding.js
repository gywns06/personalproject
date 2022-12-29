let fooddictionary = {
  egg: "🥚",
  beef: "🍖",
  pork: "🥩",
  cheese: "🧀",
  tomato: "🍅",
  potato: "🥔",
  carrot: "🥕",
  onion: "🧅",
  butter: "🧈",
  chicken: "🍗",
};
function compare(a, b) {
  // this 'compare' function is used to order the items based on their purchasedates, so if an item has an ealier purchasedate, it goes in front of others
  if (a.purchasedate < b.purchasedate) {
    return -1;
  }
  if (a.purchasedate > b.purchasedate) {
    return 1;
  }
  return 0;
}

function compare2(a, b) {
  // this function is used to order items from the most recently bought items
  if (a.purchasedate < b.purchasedate) {
    return 1;
  }
  if (a.purchasedate > b.purchasedate) {
    return -1;
  }
  return 0;
}
function checkifpossible(recipie, foodinformation) {
  var alltheingredients = recipie.ingredient;
  console.log(alltheingredients);
  var insideoffridge = true;
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
      insideoffridge = false;
    }
  }
  console.log(insideoffridge);
  return insideoffridge;
}

setInterval(function () {
  var today = new Date();
  var options = {
    weekday: "long",
    year: "numeric",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  };
  $("#time").text(
    today
      .toLocaleDateString("en-US", options)
      .replace("AM", "")
      .replace("PM", "")
  );
}, 1000);

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
  fooditems.sort(compare);
  $("#old1").text(fooditems[0].name + fooddictionary[fooditems[0].name]);
  $("#old2").text(fooditems[1].name + fooddictionary[fooditems[1].name]);
  $("#old3").text(fooditems[2].name + fooddictionary[fooditems[2].name]);
  fooditems.sort(compare2);
  $("#recent1").text(fooditems[0].name + fooddictionary[fooditems[0].name]);
  $("#recent2").text(fooditems[1].name + fooddictionary[fooditems[1].name]);
  $("#recent3").text(fooditems[2].name + fooddictionary[fooditems[2].name]);
  let possiblerecipies = recipies.filter((r) => checkifpossible(r, fooditems));
  console.log(possiblerecipies);
  let possiblerecipiesnum = possiblerecipies.length;
  let recipie1 = Math.floor(Math.random() * possiblerecipiesnum);
  let recipie2 = Math.floor(Math.random() * possiblerecipiesnum);
  console.log(recipie1);
  console.log(recipie2);
  if (possiblerecipiesnum > 1) {
    while (recipie1 == recipie2) {
      recipie2 = Math.floor(Math.random() * possiblerecipiesnum);
      console.log(recipie2);
    }
  }
  if (possiblerecipiesnum > 1) {
    $("#recipieexplanation1").text(possiblerecipies[recipie1].description);
    $("#recipename1").text(possiblerecipies[recipie1].name);
    $("#recipieexplanation2").text(possiblerecipies[recipie2].description);
    $("#recipename2").text(possiblerecipies[recipie2].name);
  } else if (possiblerecipiesnum == 1) {
    $("#recipieexplanation1").text(possiblerecipies[recipie1].description);
    $("#recipename1").text(possiblerecipies[recipie1].name);
  } else {
    $("#recipieexplanation1").text("No recipes available, buy more food");
    $("#recipename1").text("Lack of ingredients");
  }
}
recipiecheck();
