import java.io.IOException;
import java.util.concurrent.TimeUnit;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

@WebServlet("/Xat")
public class Xat extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public Xat() {
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String mail = request.getParameter("mail");
        String session = request.getParameter("session");

        User u = new User();
        u.setMail(mail);
        u.setSession(session);

        Missatge sms = null;
        if (u.isLogged()) {
            sms = new Missatge();
            sms.setReceptor(mail);
            do {
                try {
                    TimeUnit.SECONDS.sleep((long) 1);
                } catch (InterruptedException e) {
                    System.out.println("Error al sleep");
                }
                sms.getMissatge();
            } while (sms.getText() == null);
        }

        JSONObject json = new JSONObject(sms);
        String stringJson = json.toString();

        response.getWriter().append(stringJson);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String mail = request.getParameter("mail");
        String session = request.getParameter("session");
        String receptor = request.getParameter("receptor");
        String text = request.getParameter("sms");

        User u = new User();
        u.setMail(mail);
        u.setSession(session);

        Missatge sms = null;
        if (u.isLogged()) {
            sms = new Missatge();
            sms.setReceptor(receptor);
            sms.setText(text);
            sms.setEmisor(mail);
            sms.guardar();
        }
    }
}
