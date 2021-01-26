$(document).ready(function () {
    //Getting a reference to the input field where user adds a new item to cart
    var $itemContainer = $("#cart-summary");
    $(document).on("click", "button.delete", deleteItem);
    $("#check-out-to-estimate").on("click",tocheckout);
    //inital array for cart list
    var feeds = [];
    //getting items from database
     getFeeds();
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
    function deleteItem(event) {
        event.stopPropagation();
        var id = $(this).data("id");
        $.ajax({
          method:"DELETE",
          url:"/api/feeds/" + id
        }).then(getFeeds);
      }
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
    function tocheckout() {
      console.log("going to checkout");
      window.location.replace("/checkout");
    }
  });
  