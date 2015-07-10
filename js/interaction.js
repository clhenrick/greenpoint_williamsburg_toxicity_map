var app = app || {};

app.interaction = (function($, _) {
    /*
$('button.next').click(function() {
    var $target = $($(this).attr('href')),
        $other = $target.siblings('.active');
    
    if (!$target.hasClass('active')) {
        $other.each(function(index, self) {
            var $this = $(this);
            $this.removeClass('active').animate({
                left: $this.width()
            }, 500);
        });

        $target.addClass('active').show().css({
            left: -($target.width())
        }).animate({
            left: 0
        }, 500);
    }
});
*/



    var mouseX = e.pageX; 
    var mouseY = e.pageY;
$("#sublayer1").hover(function() {
    var ids = $(this).attr('id');
    var name = '.'+ids+'_info';
    $(name).css({'top':mouseY,'left':mouseX}).toggle();
    console.log(name);
    });

    /*
    <!--pop dense -->
    <div class="cartodb-popup v2">
      <a href="#close" class="cartodb-popup-close-button close">x</a>
      <div class="cartodb-popup-content-wrapper">
        <div class="cartodb-popup-content">
          <h4>roundedcpop</h4>
          <p>{{roundedcpop}}</p>
        </div>
      </div>
      <div class="cartodb-popup-tip-container"></div>
    </div>
    <div class="cartodb-tooltip-content-wrapper">
      <div class="cartodb-tooltip-content">
        <h4>drovealone</h4>
        <p>{{drovealone}}</p>
      </div>
    </div>
    <!--popdense hover-->
    <div class="btn-group-vertical btn-group-xs zoombtn" role="group" aria-label="...">
      <button type="button" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
       <button type="button" class="btn btn-default btn-xs"> <span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button>
    </div>
    */
})(jQuery, _);