import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

@WebServlet("/TextServlet")
public class TextServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String mail = request.getParameter("mail");
        String receptor = request.getParameter("receptor");

        // Configurar los detalles de la conexión a la base de datos
        String dbUrl = "jdbc:mysql://localhost:3301/xat";
        String username = "root";
        String password = "1234";

        try {
            // Establecer la conexión con la base de datos
            Connection connection = DriverManager.getConnection(dbUrl, username, password);

            // Crear una declaración para ejecutar la consulta SQL
            Statement statement = connection.createStatement();

            // Ejecutar la consulta SQL para obtener los mensajes de texto
            String selectQuery = "SELECT text, origen FROM message WHERE (origen='" + mail + "' AND desti='" + receptor + "') OR (origen='" + receptor + "' AND desti='" + mail + "') ORDER BY id";
            ResultSet resultSet = statement.executeQuery(selectQuery);

            // Crear una lista de mapas para almacenar los mensajes de texto con su origen
            List<Map<String, String>> textMessages = new ArrayList<>();

            // Obtener los mensajes de texto y su origen
            while (resultSet.next()) {
                String textMessage = resultSet.getString("text");
                String origen = resultSet.getString("origen");
                Map<String, String> message = new HashMap<>();
                message.put("text", textMessage);
                message.put("origen", origen);
                textMessages.add(message);
            }

            // Convertir la lista de mensajes de texto a formato JSON
            String json = new Gson().toJson(textMessages);

            // Configurar la respuesta HTTP
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            // Enviar la respuesta JSON al cliente
            PrintWriter out = response.getWriter();
            out.print(json);
            out.flush();

            // Cerrar los recursos
            resultSet.close();
            statement.close();
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
            // Manejar el error apropiadamente
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().println("Error en el servidor");
        }
    }
}
