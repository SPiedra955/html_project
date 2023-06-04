import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Register
 */
@WebServlet("/Register")
public class Register extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public Register() {
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
    
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String user = request.getParameter("user");
		String mail = request.getParameter("mail");
		String pass = request.getParameter("pass");
		String codeCountry = request.getParameter("codeCountry");
		
		User persona = new User(user,mail,pass,codeCountry);
		boolean resultat = persona.register();
		response.getWriter().append(String.valueOf(resultat));
		System.out.println("Registre: "+resultat);
		
	}
	
	//Retorna la llista de paisos necessari pel registre
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String json = Country.getList();
		System.out.println(json);
		response.getWriter().append(json);
	}

}
