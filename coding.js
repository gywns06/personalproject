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

fetch("http://localhost:3000/Fooditem") //fetch connects to the data server
  .then((response) => {
    // by adding this tag, the web page can get respones from the data server, meaning that it can bring data from it
    console.log(response); // console.log prints things what are happening inside the browser. So, this tag prints responses from the fetch
    return response.json(); // gets data out of response and puts it into json object -> then I can use it in codes later /*return tag returns into line 7*/
  })
  .then((json) => {
    // by using the tag 'then', you can hand in the data to the next task + split the code, to make it easy to understand .. it prevents javascript from rushing ahead
    json.sort(compare); // used .sort() to use the 'compare' function
    console.log(json); //json has all stored data
    $("#old1").text(json[0].name); //$ picks a html element, in this case it picked an element "#old1" - # means 'id' // .text puts texts inside the html element that you picked
    //json is a list of items, json[0].name --> 0 is the first element, to just get the first element we write json[0], .name brings only the name part of the element
    $("#old2").text(json[1].name);
    $("#old3").text(json[2].name);
    return json;
  })
  .then((json) => {
    json.sort(compare2);
    console.log(json);
    $("#recent1").text(json[0].name);
    $("#recent2").text(json[1].name);
    $("#recent3").text(json[2].name);
  });
