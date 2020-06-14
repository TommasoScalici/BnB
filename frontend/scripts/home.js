var searchBarFormData;

function responsiveSearchBar() {
    if($("#searchbar-navitem").is(":empty") && window.innerWidth < 1200) {             
            searchBarFormData = $("#searchbar-form").serialize();
            $("#searchbar-home").empty();
            $("#searchbar-navitem").load("searchbar.ejs", function() {
                $("#searchbar-form").deserialize(searchBarFormData);
                updateSearchBarGuests();
            });
    }
    else if($("#searchbar-home").is(":empty") && window.innerWidth > 1200) {
            searchBarFormData = $("#searchbar-form").serialize();
            $("#searchbar-navitem").empty();
            $("#searchbar-home").load("searchbar-home.ejs", function() {
                $("#searchbar-form").deserialize(searchBarFormData);
                updateSearchBarGuests();
            });
    }
} 

$(window).ready(function() {
    responsiveSearchBar();
})

$(window).resize(function() {
    responsiveSearchBar();
})