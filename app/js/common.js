$(document).ready(function() {
	//Check

 // инициализируем wow.js
  if ($(window).width() > 1000) {
    wow = new WOW(
      {
        animateClass: 'animated',
        offset:       100
      }
    );
    wow.init();
  }
  
});


// cookie script
	 function getCookie(cname) {
          var name = cname + "=";
          var ca = document.cookie.split(';');
          for(var i=0; i<ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0)==' ') c = c.substring(1);
              if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
          }
          return "";
      }

      function setCookie(cname, cvalue, exdays) {
          var d = new Date();
          d.setTime(d.getTime() + (exdays*24*60*60*1000));
          var expires = "expires="+d.toUTCString();
          document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
      }


      function clearF1Cookie() {
          setCookie("name","",-1);
          setCookie("email","",-1);
          setCookie("last1","",-1);
      }
      $(window).load(function() {
          $("input.name").val(getCookie("name"));
          $("input.email").val(getCookie("email"));
          $("input.phone1").val(getCookie("phone1"));
          $("input.phone2").val(getCookie("phone2"));
          $("input.phone3").val(getCookie("phone3"));
      });

var modal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    cssClass: ['custom-class-1', 'custom-class-2']
   
});

  $('a.modal-btn').on('click', function(event){
   event.preventDefault();
   var modalId = $(this).attr('href');
   modal.setContent($(modalId).html());
   modal.open();
  });
