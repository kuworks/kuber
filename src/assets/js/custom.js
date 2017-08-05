setTimeout(function(){

    setTimeout(function(){
        $("#kuber-loader").fadeOut();
    }, 1000);

    var button = $("#home-navbar .toggle-button");
    var button_color = button.css("background");
    var toast = $("#home-navbar .toast");
    var toast_color = toast.css("background")
    $("#home-navbar .toggle-box").click(function(){
        if(button.css("left")=="0px"){
            button.css("left", 46).css("background", "#B7B8B7");
            toast.fadeIn().css("background", "#B7B8B7").html("OFF");
            setTimeout(function(){
                toast.fadeOut();
            }, 1000);
        }else if(button.css("left")=="46px"){
            button.css("left", 0).css("background", button_color);
            toast.fadeIn().css("background", toast_color).html("ON");
            setTimeout(function(){
                toast.fadeOut();
            }, 1000);
        }
    });

    $("#market-ion-content .order-box .list").click(function(){
        var check = $(this).find(".check")
        check.css("opacity", 1);
        setTimeout(function(){
            check.css("opacity", 0);
        }, 1000);
    });

}, 2000)
