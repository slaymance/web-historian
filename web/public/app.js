// get the input val
  // send ajax request with input val as query field
    // success
      // $('#app').append(data);

var sendRequest = function(val) {
  $.ajax({
    
  });
};

$('input').on('keypress', (event) => {
  if (event.keyCode === 13) {
    sendRequest($('input').val());
  }
});
