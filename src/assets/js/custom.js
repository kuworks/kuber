setInterval(function(){
    $("#ion-loader").fadeOut();
    $("#home-footer button").click(function(){
        $("#home-footer .yellocoin").removeClass("ani-clink");
        var index = $(this).attr("tab-number");
        $("#home-footer .yellobar").css("left", index*33+"%");
        if(index==1){
            setTimeout(function(){
                $("#home-footer .yellocoin").addClass("ani-clink");
            },100)
        }
    })
},3000)

