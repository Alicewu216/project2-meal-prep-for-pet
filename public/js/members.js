$(document).ready(function () {
  //Getting a reference to the input field where user adds a new item to cart
  var $itemContainer = $("#user-cart");
  //arrary of items
  var itemName = [
    "Australia Beef Steak",
    "Organic Lamb",
    "Organic Venison",
    "Grass Fed Duck",
    "GrassFed Chicken",
    "Quail",
    "Tuna",
    "Salmon",
    "Shrimp",
    "Organic Egg",
    "Fish Oil",
    "Super Vitamin for pets",
  ];
  //array of items id
  var itemBtnID = [
    "#complete-1",
    "#complete-2",
    "#complete-3",
    "#complete-4",
    "#complete-5",
    "#complete-6",
    "#complete-7",
    "#complete-8",
    "#complete-9",
    "#complete-10",
    "#complete-11",
    "#complete-12",
  ];
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
  //call isertToBD function when buttons are clicked
  for (var i = 0; i < itemBtnID.length; i++) {
    $(document).on("click", itemBtnID[i], callback(itemName[i]));
  }
 function callback(name) {
   return function(e){
     e.preventDefault();
     var feed = {
      text: name,
      complete: false,
    };
    console.log(feed);
    $.post("/api/feeds", feed, getFeeds);
   }
 }
  
  //inital array for cart list
  var feeds = [];
  //getting items from database
  // getFeeds();
  //function that resets cart list with new items from databse
  function initializeCart() {
    $itemContainer.empty();
    var cartToAdd = [];
    for (var i = 0; i < feeds.length; i++) {
      cartToAdd.push(creatNewCartRow(feeds[i]));
    }
    $itemContainer.prepend(cartToAdd);
  }
  //grabs items from dababase and update the veiw
  function getFeeds() {
    $.get("/api/feeds", function (data) {
      console.log(data);
      feeds = data;
      console.log(feeds);
      initializeCart();
    });
  }
  //function that constructs a new item row
  function creatNewCartRow(feed) {
    var $newItemRow = $(
      [
        "<li class='list-group-item feed-item'>",
        "<span>",
        feed.text,
        "</span>",
        "<button class='delete btn btn-danger'>x</button>",
        "</li>",
      ].join("")
    );
    $newItemRow.find("button.delete").data("id", feed.id);
    return $newItemRow;
  }

});
