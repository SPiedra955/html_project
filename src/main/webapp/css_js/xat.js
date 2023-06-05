function añadirAmigos() {
  var mail = sessionStorage.getItem('mail');
  var session = sessionStorage.getItem('session');
  var friend = document.getElementById("friend").value;

  // Verificar si el campo de correo electrónico está vacío
  if (friend === "") {
    document.getElementById("resultado").innerHTML = 'Insert an e-mail address';
    return;
  }

  var http = new XMLHttpRequest();
  http.open("POST", "http://localhost:8888/amics/Friend", true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {
    if (http.readyState === XMLHttpRequest.DONE) {
      if (http.status === 200) {
        var response = http.responseText;
        if (response === '0') {
          document.getElementById("resultado").innerHTML = 'Server does not respond';
        } else if (response === '1') {
          document.getElementById("resultado").innerHTML = 'Friend successfully added';
          getFriends();
        } else if (response === '2') {
          document.getElementById("resultado").innerHTML = 'Friend not found'
        } else if (response === '3') {
          document.getElementById("resultado").innerHTML = 'The session code has expired and a new login is required.';
        }
      } else {
        console.error('Error en la petición al backend:', http.status);
      }
    }
  };

  var params = "mail=" + encodeURIComponent(mail) + "&session=" + encodeURIComponent(session) + "&friend=" + encodeURIComponent(friend);
  http.send(params);
}

function getFriends() {
  var mail = sessionStorage.getItem('mail');
  var session = sessionStorage.getItem('session');

  var http = new XMLHttpRequest();
  http.open("GET", "http://localhost:8888/amics/Friend?mail=" + encodeURIComponent(mail) + "&session=" + encodeURIComponent(session), true);

  http.onreadystatechange = function() {
    if (http.readyState === XMLHttpRequest.DONE) {
      if (http.status === 200) {
        var response = JSON.parse(http.responseText); // Convertir la respuesta JSON en un objeto JavaScript

        var select = document.getElementById("friendList");
        select.innerHTML = "";

        if (response.length > 0) {
          response.forEach(function(friend) {
            var option = document.createElement("option");
            option.text = friend;
            select.add(option);
          });
        }
      } else {
        console.error('Error en la petición al backend:', http.status);
      }
    }
  };

  http.send();
}

function logOut() {
  sessionStorage.removeItem('mail');
  sessionStorage.removeItem('session');
  window.location.href = 'Login.html';
  console.log("Bye!");
}

function enviarMensaje() {
  var mail = sessionStorage.getItem('mail');
  var session = sessionStorage.getItem('session');
  var receptor = document.getElementById("friendList").value;
  var sms = document.getElementById("message").value;

  // Verificar si el campo de mensaje está vacío
  if (sms === "") {
    return;
  }

  var http = new XMLHttpRequest();
  http.open("POST", "http://localhost:8888/amics/Xat", true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {
    if (http.readyState === XMLHttpRequest.DONE) {
      if (http.status === 200) {
        var response = http.responseText;
        if (response === '0') {
          document.getElementById("smsResult").innerHTML = 'El servidor no responde';
          console.log('El servidor no responde');
        } else if (response === '1') {
          document.getElementById("smsResult").innerHTML = 'Mensaje enviado correctamente';
          console.log('Mensaje enviado correctamente');
        } else if (response === '2') {
          document.getElementById("smsResult").innerHTML = 'Error al enviar el mensaje';
          console.log('Error al enviar el mensaje');
        } else if (response === '3') {
          document.getElementById("smsResult").innerHTML = 'El código de sesión ha expirado y se requiere iniciar sesión nuevamente';
          console.log('El código de sesión ha expirado y se requiere iniciar sesión nuevamente');
        }
      } else {
        console.error('Error en la petición al backend:', http.status);
      }
    }
  };

  var params = "mail=" + encodeURIComponent(mail) + "&session=" + encodeURIComponent(session) + "&receptor=" + encodeURIComponent(receptor) + "&sms=" + encodeURIComponent(sms);
  http.send(params);
}

function recibirMensajes() {
  var mail = sessionStorage.getItem('mail');
  var receptor = document.getElementById("friendList").value;

  var http = new XMLHttpRequest();
  http.open("GET", "http://localhost:8888/amics/TextServlet?mail=" + encodeURIComponent(mail) + "&receptor=" + encodeURIComponent(receptor), true);
  http.setRequestHeader("Content-type", "application/json");

  http.onreadystatechange = function() {
    if (http.readyState === XMLHttpRequest.DONE) {
      if (http.status === 200) {
        var response = JSON.parse(http.responseText);
        if (response.length === 0) {
          console.log('El servidor no responde');
        } else {
          var mensajesHTML = '';
          for (var i = 0; i < response.length; i++) {
            var mensaje = response[i];
            var alineacion = (mensaje.origen === mail) ? 'align-right' : 'align-left'; // Operador ternario
            mensajesHTML += '<div class="mensaje ' + alineacion + '"><strong>' + mensaje.origen + ':</strong> ' + mensaje.text + '</div>';
          }
          document.getElementById("mensajes").innerHTML = mensajesHTML;
        }
      } else {
        console.error('Error en la petición al backend:', http.status);
      }
    }
  };

  http.send();
}

function cerrarChat() {
  document.getElementById("mensajes").innerHTML = ""; // Limpiar los mensajes
  document.getElementById("chat").style.display = "none"; // Ocultar el área de chat
}
