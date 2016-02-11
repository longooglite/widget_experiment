/**
 * Created by klonguski on 2/10/16.
 */
var wt = document.getElementById("widget-template").innerHTML;
var divsWrapper = document.getElementById("divs");
var dummy = [
    {"name":"John Smith","type":"primary"},
    {"name":"Ann Other","type":"contributing"},
    {"name":"Morris Merrier","type":"tertiary"},
    {"name":"Lee Terrily-Hu","type":"basically uninvolved to be honest"}
];
document.getElementById("dummy").innerText = JSON.stringify(dummy);

var createNewWidget = function(data){
    data = data ? data : {};
    var _name = data.name ? data.name : "";
    var div  = document.createElement("div");
    div.innerHTML = wt.replace("|name|", _name);
    if(data.type)
    {
        var options = div.querySelectorAll("select option");
        for(var o = 0; o < options.length; o++)
        {
            if(options[o].innerText == data.type)
            {
                options[o].setAttribute("selected","true");
            }
        }
    }
    return div.firstElementChild;
};
for(var dum = 0; dum < dummy.length; dum++)
{
    divsWrapper.appendChild(createNewWidget(dummy[dum]));
}
var raiseRow = function(_this){
    var _row = _this.parentNode;
    //http://stackoverflow.com/a/23528539
    var _index = Array.prototype.indexOf.call(divsWrapper.children, _row);
    if(_index != divsWrapper.childElementCount)
    {
        //https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
        divsWrapper.insertBefore(_row, divsWrapper.children[_index + 2]);
    }
};
var lowerRow = function(_this){
    var _row = _this.parentNode;
    //http://stackoverflow.com/a/23528539
    var _index = Array.prototype.indexOf.call(divsWrapper.children, _row);
    if(_index != divsWrapper.childElementCount)
    {
        //https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
        divsWrapper.insertBefore(_row, divsWrapper.children[_index - 1]);
    }
};
var addRow = function(_this){
    var _row = _this.parentNode;
    //http://stackoverflow.com/a/23528539
    var _index = Array.prototype.indexOf.call(divsWrapper.children, _row);
    if(_index != divsWrapper.childElementCount)
    {
        //https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
        divsWrapper.insertBefore(createNewWidget(), divsWrapper.children[_index + 1]);
    }
};
var deleteRow = function(_this){
    var _row = _this.parentNode;
    _row.parentNode.removeChild(_row);
};
var handleForm = function(_this){
    var inputs = _this.parentNode.querySelectorAll(".widget input");
    var selects = _this.parentNode.querySelectorAll(".widget select");
    var pairs = [];
    for(var i = 0; i < inputs.length; i++)
    {
        var pair = {};
        pair.name = inputs[i].value;
        pair.type = selects[i].value;
        if(pair.name && pair.type) pairs.push(pair);
    }
    document.getElementById("output").innerText = JSON.stringify(pairs);
    document.getElementById("PeerReviewedAuthors").value = JSON.stringify(pairs);
};