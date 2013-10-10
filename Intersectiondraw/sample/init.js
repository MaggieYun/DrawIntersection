$.fn.iImage = function(url,params){
    
    this.url = url;
    $(this).attr("src",url+"?params="+ JSON.stringify(params));

    this.refresh = function(parameters){
        $(this).attr("src",this.url+"?params="+ JSON.stringify(parameters));
    };

    return this;
};


$(function(){
    var get_params = function(){
        var road = {};
        var north = $("#north").val();
        var east = $("#east").val();
        var south = $("#south").val();
        var west = $("#west").val();

        if(north){
            road["0"]  = north.split(",");
        }
        if(east){
            road["1"]  = east.split(",");
        }
        if(south){
            road["2"]  = south.split(",");
        }
        if(west){
            road["3"]  = west.split(",");
        }    
        var params = {            
            "inter_id":1,
            "intersection":road,
            "image_size":[800,800],
            "lane_width":40   //大于8

        };
        return params;
    };
    

    var image = null;
    $("#show_img").click(function(){   
        params = get_params();
        image = $('#basemap').iImage('../intersectionDraw',params);
    });


    $("#refresh").click(function(){  
        params = get_params();
        image.refresh(params);
    });

});







