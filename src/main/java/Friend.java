import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/Friend")
public class Friend extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public Friend() {
        super();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String mail = request.getParameter("mail");
        String session = request.getParameter("session");
        String friendMail = request.getParameter("friend");

        User u = new User();
        u.setMail(mail);
        u.setSession(session);

        String resposta = "0";
        //Codi resposta
        //0 El Servidor no respon
        //1 Amic afegit
        //2 Amic no trobat
        //3 Usuari necessita loggin

        if (u.isLogged()) {
            User friend = new User();
            friend.load(friendMail);
            if (friend.getUser() != null) {
                // Aquí se realiza la inserción en la base de datos
                if (u.setFriend(friend)) {
                    // Inserción exitosa
                    resposta = "1";
                }
            } else {
                // Amigo no encontrado
                resposta = "2";
            }
        } else {
            // El usuario necesita iniciar sesión
            resposta = "3";
        }
        response.getWriter().append(resposta);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String mail = request.getParameter("mail");
        String session = request.getParameter("session");

        User u = new User();
        u.setMail(mail);
        u.setSession(session);

        String resposta = "[]";

        if (u.isLogged()) {
            resposta = u.getFriends(); // Método para obtener la lista de amigos en formato JSON
        }
        response.setContentType("application/json");
        response.getWriter().append(resposta);
    }
}

