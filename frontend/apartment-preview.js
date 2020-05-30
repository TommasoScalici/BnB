function flip(){
    clearTimeout(backVar);
        $(".top").css({
        "box-shadow": "0px 1px 10px -2px rgba(0,0,0,0.43)",
        "transform": "translateY(-100%)"
    });
    flipVar = setTimeout( function(){
        $(".flip").css({
            "transform": "rotateY(180deg)"
        });
        $(".radius-front").hide();
    }, 400);
}

function back(){
    clearTimeout(flipVar);
  	$(".radius-front").show();
    backVar = setTimeout( function(){
        $(".top").css({
            "box-shadow": "0px 10px 20px 0px rgba(0,0,0,0.43)",
            "transform": "translateY(-25px)"
        });
        
    }, 400);
    $(".flip").css({
            "transform": "none"
        });
}

var flipVar, backVar;

$(function(){
    $(".thecard").hover(function(){
        flip();
    }, function(){
        back();
    });
    
});