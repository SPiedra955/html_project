function registre() {
    var user = document.getElementById("user").value;
    var mail = document.getElementById("mail").value;
    var pass = document.getElementById("pass").value;
    var pass2 = document.getElementById("pass2").value;
    var codeCountry = document.getElementById("codeCountry").value;
  
    if (pass !== pass2) {
      // Las contraseñas no coinciden
      document.getElementById("resultado").innerHTML = 'Las contraseñas no coinciden';
      return; 
    }
  
    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:8888/amics/Register", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
    http.onreadystatechange = function () {
      if (http.readyState === XMLHttpRequest.DONE) {
        if (http.status === 200) {
          // Obtener la respuesta del backend
          var response = http.responseText;
  
          if (response === "false") {
            // El login no ha sido correcto
            document.getElementById("resultado").innerHTML = 'Email en uso';
          } else {
            window.location.href = 'Login.html';
          }
        } else {
          // Error en la petición al backend
          console.error('Error en la petición al backend:', http.status);
        }
      }
    };
  
    var params = "user=" + encodeURIComponent(user) + "&mail=" + encodeURIComponent(mail) + "&pass=" + encodeURIComponent(pass) + "&codeCountry=" + encodeURIComponent(codeCountry);
  
    http.send(params);
  }
  


  function obtenerPaises() {
    var http = new XMLHttpRequest();
    http.open("GET", "http://localhost:8888/amics/Register", true);

    http.onreadystatechange = function () {
        if (http.readyState === XMLHttpRequest.DONE) {
            if (http.status === 200) {
                var responseData = http.responseText;

               // Parse the response as JSON
                var parsedResponse;
                try {
                parsedResponse = JSON.parse(responseData);
                } catch (error) {
                console.error("Error parsing JSON response:", error);
                }

                // Get the select element by its ID
                var selectElement = document.getElementById("codeCountry");

                // Clear any existing options
                selectElement.innerHTML = '';

                // Check if the parsed response is an array
                if (Array.isArray(parsedResponse)) {
                // Iterate over the JSON data and create options
                parsedResponse.forEach(function(item) {
                    // Create an option element
                    var option = document.createElement("option");
                    
                    // Set the value and text content of the option using the email
                    option.value = item.code;
                    option.textContent = item.name;
                    
                    // Append the option to the select element
                    selectElement.appendChild(option);
                });
                } else {
                console.error("Invalid response format. Expected an array.");
                }

            } else {
                console.error('Error en la petición al backend:', http.status);
            }

        }
    }
    http.send();}