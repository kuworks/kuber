$("#kuber-loader").fadeIn();

function infi(){
    var obj = $(".bid-box .list").first();
    obj.slideUp();
    $(".sub-title span").html(parseInt($(".sub-title span").html())+1+"건")
    setTimeout(function(){
        $(".bid-box").append(obj);
        obj.fadeIn(); 
		infi();
    }, 750+Math.random()*2000);
}


setTimeout(function(){
    infi();
    $("#modal").fadeOut();
    $("#map-box").fadeOut();
    setTimeout(function(){
        $("#kuber-loader").fadeOut();
    }, 1000);

    var market = $("#market-ion-content .scroll-content");
    var button = $("#home-navbar .toggle-button");
    var button_color = button.css("background");
    var toast = $("#home-navbar .toast");
    var toast_color = toast.css("background")
    var bid_box = $("#market-ion-content .bid-box");
    var order_box = $("#market-ion-content .order-box");
    var end_point = $("#end-point");
    var modal = $("#modal");
    var navbar = $("#home-navbar");
    var search = $("#search");

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

    order_box.find(".list").click(function(){
        if($(this).attr("list-num")=="1"){
            $("#map-box").fadeIn();
            modal.fadeIn();
            market.css("filter", "blur(3px)");
            navbar.fadeOut();
            setTimeout(function(){
                search.fadeIn();
            }, 500);
        }else{
            end_point.fadeIn();
            bid_box.find(".blur").fadeOut(250);
            order_box.fadeOut(250);
            setTimeout(function(){
                bid_box.addClass("active");
            }, 250);
        }
        $(this).find(".check").css("opacity", 1);
    });

    modal.find(".button").click(function(){
        var button = $(this)
        button.css("background-color","white");
        setTimeout(function(){
            button.css("background-color","rgba(0,0,0,0)");
        }, 250);
    });
    $("#price-box h1").click(function(){
        var button = $(this)
        button.css("background-color","white");
        setTimeout(function(){
            button.css("background-color","rgba(0,0,0,0)");
        }, 250);  
        end_point.fadeOut();
        bid_box.removeClass("active");
        order_box.fadeIn();
        bid_box.find(".blur").fadeIn();
        order_box.find(".check").css("opacity", 0);
        $("#price-box").fadeOut();        
    });

    modal.click(function(){
        $(".bid-box .list").css("background-color", "#F2F4F2");
        search.fadeOut();
        $("#map-box").fadeOut();
        modal.fadeOut();
        market.css("filter", "blur(0px)");
        navbar.fadeIn();
        order_box.find(".check").css("opacity", 0);
    });

    bid_box.find(".list").click(function(){
        $(this).css("background-color", "#FE626C");
        modal.fadeIn();
        $("#price-box").fadeIn();  
        market.css("filter", "blur(3px)");
        end_point.fadeOut();
    });

    end_point.click(function(){
        end_point.fadeOut();
        bid_box.removeClass("active");
        order_box.fadeIn();
        bid_box.find(".blur").fadeIn();
        order_box.find(".check").css("opacity", 0);
    });

}, 2000)