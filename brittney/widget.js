$(function() {
    $.widget( "wfWidgets.repeatingInputSelector", {
        _create : function(){
            var $this = this;
            var $element = $this.element;
            var $form = $element.parent();
            var $hiddenInput = $form.find("#PeerReviewedAuthors");
        }
    });
});