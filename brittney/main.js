$(document).ready(function(){
    var dummy = [
        {"name":"John Smith","type":"primary"},
        {"name":"Ann Other","type":"secondary"},
        {"name":"Morris Merrier","type":"tertiary"},
        {"name":"Lee Terrily-Hu","type":"tertiary"}
    ];
    var types = $("#PeerReviewedAuthors").data("widget-enums");
    $("#widget-wrapper").repeatingInputSelector({
        'types' : types,
        'existing' : dummy
    });
});