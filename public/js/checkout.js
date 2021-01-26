$(document).ready(function() {
    var $ordercomf = $("#order-confirm");
    $("#complete-order").on("click",insertaddress);

    function insertaddress(event) {
        event.preventDefault();
        var useraddress = {
        username: $("#receipiant-name").val().trim(),
        address_1: $("#address-1").val().trim(),
        address_2: $("#address-2").val().trim(),
        city_name: $("#city-name").val().trim(),
        zipcode: $("#zip-code").val().trim(),
        phone_number:$("#phone-num").val().trim()
        };
        console.log("order submitted");
        $.post("/api/addresses", useraddress, insertConf)
    }
    function getAddress() {
        $.get("/api/addresses", function(data) {
            addressinfo = data;
            console.log(addressinfo);
            getRate();      
         });
    }
    function getRate() {
        var shippo = require('shippo')('<API_TOKEN>');

var addressFrom  = {
    "name": "Shawn Ippotle",
    "street1": "215 Clayton St.",
    "city": "San Francisco",
    "state": "CA",
    "zip": "94117",
    "country": "US"
};

var addressTo = {
    "name": "Mr Hippo",
    "street1": "Broadway 1",
    "city": "New York",
    "state": "NY",
    "zip": "10007",
    "country": "US"
};

var parcel = {
    "length": "5",
    "width": "5",
    "height": "5",
    "distance_unit": "in",
    "weight": "2",
    "mass_unit": "lb"
};

shippo.shipment.create({
    "address_from": addressFrom,
    "address_to": addressTo,
    "parcels": [parcel],
    "async": false
}, function(err, shipment){
    // asynchronously called
});
    }
    function insertConf(){
        $ordercomf.append("<h1>Your order has been shipped to the address you provided</h1>");
        $ordercomf.append("Estimated shipment rate with USPS is 30.56 US Dollar"); 
        $ordercomf.append("<br>");
        $ordercomf.append("Estimated shipment rate with Fedex is 29.78 US Dollar");
        $ordercomf.append("<br>");
        $ordercomf.append("We have picked the cheapest option for you");
    }
});
