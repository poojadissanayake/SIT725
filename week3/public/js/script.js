const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!");
  }
  
  $(document).ready(function() {
    $('#clickMeButton').click(() => {
      clickMe();
    });
  
    $("#calculateButton").click(function() {
      var num1 = parseFloat($('#num1').val());
      var num2 = parseFloat($('#num2').val());
      if (!isNaN(num1) && !isNaN(num2)) {
        var sum = num1 + num2;
        $('#result').text('Result: ' + sum);
      } else {
        $('#result').text('Please enter valid numbers.');
      }
    });
  
    $("#sum").click(function() {
        var num1 = parseFloat($('#num1').val());
        var num2 = parseFloat($('#num2').val());
      var dataString = JSON.stringify({ num1: num1, num2: num2 });
  
      $.ajax({
        type: "POST",
        url: "http://localhost:3040/addNumbers",
        data: dataString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {
          alert("Total: " + response.total);
        },
        error: function(error) {
          console.log("Error:", error);
        }
      });
  
      return false;
    });
  });
  