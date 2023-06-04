  function send() {
      let http = new XMLHttpRequest();
      let mail = document.getElementById("mail").value;
      let pass = document.getElementById("pass").value;

      http.open("GET", "http://localhost:8888/amics/Login?mail=" + encodeURIComponent(mail) + "&pass=" + encodeURIComponent(pass), true);

      http.onreadystatechange = function () {
        if (http.readyState === XMLHttpRequest.DONE) {
          if (http.status === 200) {
            // Obtener la respuesta del backend
            var response = http.responseText;
            console.log(response);

            if (response === "false") {
              // El login no ha sido correcto
              document.getElementById("resultado").innerHTML = 'Login incorrecto';
            } else {
              // El login ha sido exitoso, obtener el código de sesión
              var sessionCode = response;

              // Almacenar el código de sesión en sessionStorage
              sessionStorage.setItem('session', sessionCode);
              sessionStorage.setItem('mail', mail);
              console.log(sessionStorage);
              console.log("Inicio de sesión exitoso!");

              // Avanzar a la página "Xat"
              window.location.href = 'xat.html';
            }
          } else {
            // Error en la petición al backend
            console.error('Error en la petición al backend:', http.status);
          }
        }
      };

      http.send();
    }