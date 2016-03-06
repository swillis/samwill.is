import $ from 'jquery';

var d = new Date();
var time = d.getHours();

var setGreeting = function() {
  if (time < 12) {
    $('.greeting').text('Good morning!');
  }
  else if (time >= 12 && time < 18) {
    $('.greeting').text('Good afternoon!');
  }
  else if (time >= 18) {
    $('.greeting').text('Good evening!');
  }
}

var revealContent = function() {
  $(document).ready(function() {
    $('.content').addClass('reveal');
  })
}

revealContent();
setGreeting();
