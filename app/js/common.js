$(document).ready(function() {
	//Check
	//jquery.matchHeight.js
	//Docs: https://github.com/liabru/jquery-match-height
	$('element').matchHeight();

	//BPopUp windows
	//Docs: http://dinbror.dk/bpopup/
  $('a.modal-link').on('click', function(e) {
    e.preventDefault();
    var id = $(this).attr('href');
    $(id).bPopup({
      follow: [false, false], //x, y
      position: ['50%', '10%'], //x, y
      // speed: 450
      // transition: 'slideIn',
      // transitionClose: 'slideBack'
    });
  })
	


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

    // валидация и отправка данных с формы в CRM
    function validate(name, email, phone){
        var output = false;
         $('#name').focus();
         $('#email').focus();
         $('#phone1').focus();
         $('#phone2').focus();
         $('#phone3').focus();
         $('.subm1').focus();
        // После того, как мы нажали кнопку "Отправить", делаем проверку,
        // если кол-во полей с классов .not_error равно 5(так как у нас всего 5 полей), то есть все поля заполнены верно,
        if($('.not_error').length == 5)
        {  
           // после успешной проверки отправляем форму и ставим куки
             $.ajax({
               type: "POST",
               url: 'crm/export.php',
               async: false,
               data: {
                 name: name,
                 email: email,
                 phone: phone
               },
               success: function () {
                 setCookie('name', $('#name').val(), 365);
                 setCookie('email', $('#email').val(), 365);
                 setCookie('last1', $('#last1').val(), 365);
                 setCookie('phone1', $('#phone1').val(), 365);
                 setCookie('phone2', $('#phone2').val(), 365);
                 setCookie('phone3', $('#phone3').val(), 365);
                 output = true;
               }
             });
       }
       else
       {
         $('form').find('input.error').first().focus();
       }
     return output;
  };



	// 3 phones to 1 (last1) script
   $(".m_frm .subm1").click(function(e) {
       var is_phone = false;
       if ($(".m_frm .phone1").val() != '') {is_phone = true;}
       if ($(".m_frm .phone2").val() != '') {is_phone = true;}
       if ($(".m_frm .phone3").val() != '') {is_phone = true;}
       if (is_phone == true) {
           if ($(".m_frm .phone1").val() == '') {
               alert('Вы ввели телефон не полностью!');
               e.preventDefault();
               return false;
           }
           if ($(".m_frm .phone1").val() == '') {
               $(".m_frm .phone1").val('+38');
           }
           if ($(".m_frm .phone2").val() == '') {
               $(".m_frm .phone2").val('123');
           }

           var part1 = $(".m_frm .phone1").val();
           var part2 = $(".m_frm .phone2").val();
           var part3 = $(".m_frm .phone3").val();
           var last = part1 + part2 + part3;
           $(".last1").val(last);
       };
   });
	
	// autofocus change on phone inputs
	$(function(){

	    $('.NumGroup').groupinputs();

	    $('.NumGroup').on('input propertychange', function(e) {
	        var elem = $(e.target),
	                value = elem.val(),
	                caret = elem.caret(),
	                newValue = value.replace(/[^0-9+]/g, ''),
	                valueDiff = value.length - newValue.length;

	        if (valueDiff) {
	            elem
	                    .val(newValue)
	                    .caret(caret.start - valueDiff, caret.end - valueDiff);
	        }
	    });

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
          $("#name").val(getCookie("name"));
          $("#email").val(getCookie("email"));
          $("#phone1").val(getCookie("phone1"));
          $("#phone2").val(getCookie("phone2"));
          $("#phone3").val(getCookie("phone3"));
          $("#pop_name").val(getCookie("name"));
          $("#pop_email").val(getCookie("email"));
          $("#pop_phone").val(getCookie("last1"));
      });

});