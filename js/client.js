$(document).ready(function() {

  var slider_socket = io();

  $(function () {
    var socket = io();
    $('form').submit(function(e){
      e.preventDefault(); // prevents page reloading
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
  });

  $(function() {
    $("#slider").slider({
      min: 0,
      max: 100,
      slide: function( event, ui ) {
        $( "#amount" ).val(ui.value );
      }
    });
    $("#amount").val($("#slider").slider("value"));
  });

  $(function() {
    $("#slider2").slider({
      min: 0,
      max: 100
    });
  });

  /*
  $(function() {
    var sock_slider = io();
    var sliderval = $("#slider").slider("value");
  });
  */

  $("#slider").on("slide", function(event, ui) {
    $(function () {
      slider_socket.emit('slider_message', $('#slider').slider("value"));
    });
  });
});
