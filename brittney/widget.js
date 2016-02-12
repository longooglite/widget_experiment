$(function() {
    $.widget( "wfWidgets.repeatingInputSelector", {
        _create : function(){
            if(!this.options.types || !$.isArray(this.options.types))
            {
                console.error("Types not provided");
                return false;
            }
            var $this = this;
            var existing = $this.options.existing ? $this.options.existing : false;
            var types = $this.options.types;
            var $element = $this.element;
            $element.addClass("repeating-input-selection");
            var $form = $element.parent();
            if(existing)
            {
                for(var ei = 0; ei < existing.length; ei++)
                {
                    $form.append($this.newRow(existing[ei], types));
                }
            }
            else
            {
                $form.append($this.newRow({}, types));
            }
            $this._on($this.document, {
                'click.repeating-input-selector-plus': function(event) {
                    $(event.target).parent().after($this.newRow({}, types));
                }
            });
            $this._on($this.document, {
                'click.repeating-input-selector-minus': function(event) {
                    $(event.target).parent().remove();
                }
            });
            $this._on($this.document, {
                'click.repeating-input-selector-up': function(event) {
                    $(event.target).parent().prev(".repeating-input-selector-row").before($(event.target).parent());
                }
            });
            $this._on($this.document, {
                'click.repeating-input-selector-down': function(event) {
                    $(event.target).parent().next(".repeating-input-selector-row").after($(event.target).parent());
                }
            });
        },
        newRow : function(data, types){
            var row = $("<div />", {
                'class' : 'repeating-input-selector-row'
            });
            var text = $("<input />",{
                'class' : 'repeating-input-selector-text',
                'type' : 'text',
                'value' : data.name ? data.name : ''
            });
            var select = $("<select />",{
                'class' : 'repeating-input-selector-select'
            });
            for(var ti = 0; ti < types.length; ti++)
            {
                var o = $("<option>"+types[ti].type+"</option>", {
                    'class' : 'repeating-input-selector-option'
                });
                if(data.type && data.type == types[ti].type)
                {
                    o.attr("selected","true");
                }
                select.append(o);
            }
            var moveButtons = [
                $("<div class = 'repeating-input-selector-up'> up </div>", {}),
                $("<div class = 'repeating-input-selector-down'> down </div>", {})
            ];
            var existButtons = [
                $("<div  class = 'repeating-input-selector-minus'> minus </div>", {}),
                $("<div class = 'repeating-input-selector-plus'> plus </div>", {})
            ];
            row
                .append(moveButtons)
                .append(text)
                .append(select)
                .append(existButtons);
            return row;
        }
    });
});