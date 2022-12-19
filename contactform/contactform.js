/*jQuery(document).ready(function($) {
  "use strict";

  //Contact
  $('form.contactForm').submit(function() {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else var str = $(this).serialize();
    var action = $(this).attr('action');
    if( ! action ) {
      action = 'contactform/contactform.php';
    }
    $.ajax({
      type: "POST",
      url: action,
      data: str,
      success: function(msg) {
        // alert(msg);
        if (msg == 'OK') {
          $("#sendmessage").addClass("show");
          $("#errormessage").removeClass("show");
          $('.contactForm').find("input, textarea").val("");
        } else {
          $("#sendmessage").removeClass("show");
          $("#errormessage").addClass("show");
          $('#errormessage').html(msg);
        }

      }
    });
    return false;
  });

});*/


const nameError = document.getElementById("name-error")
const mailError = document.getElementById("mail-error")
const subError = document.getElementById("sub-error")
const msgError = document.getElementById("msg-error")
const submitError = document.getElementById("submit-error")
const form = document.getElementById("form")



function validateName() {
  var name = document.getElementById("name").value

  if (name.length == '' || name.length <= 4){
      nameError.innerText = "Please enter at least 4 chars!"
      //document.getElementById("name").style.border = "1.5px solid red"
      return false
  }

  var letters = /^[A-Za-z]+$/

  if(!name.match(letters)){
    nameError.innerText = "name is invalid!"
    //document.getElementById("name").style.border = "1.5px solid red"

    return false
  }

  nameError.innerText = ""
  return true
}

function ValidateEmail(){
  var email = document.getElementById("email").value
  var mailformat = (/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)

if(!email.match(mailformat)){
  mailError.innerText = "invalid email!"
  return false
}

mailError.innerText = ""
return true
}

function validateSub(){
  var subject = document.getElementById("subject").value

  if(subject.length <= 8){
    subError.innerText = 'Please enter at least 8 chars of subject!'
    return false
  }

  subError.innerText = ''
  return true
}

function validatemsg(){
  var message = document.getElementById("message").value
  var required = 30;
  var left = required - message.length


  if(left > 0){
    msgError.innerText = left + 'More character required'

    return false
  }
  
  msgError.innerText = ''
  return true
}

function validateForm(){
  if(!validateName() || !ValidateEmail || !validateSub || !validatemsg ){
    submitError.innerText = 'Please fix error to submit!'
    return false
  }
  
}


window.addEventListener("load", function() {
  const form = document.getElementById('form');
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: 'POST',
      body: data,
    })
    .then(() => {
      alert("Success!");
    })
  });
});

