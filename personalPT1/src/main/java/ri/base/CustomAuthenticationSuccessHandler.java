package ri.base;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import ri.vo.AcntVO;


public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
	
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res, Authentication auth) throws IOException, ServletException {
		
		UserDetails userDetails = (UserDetails) auth.getPrincipal();
		if (userDetails instanceof AcntVO) {
			AcntVO loggedInAcntVO = (AcntVO) userDetails;
			HttpSession session = req.getSession();
			session.setAttribute("loggedInAcntVO", loggedInAcntVO);
		} else {
			throw new IllegalStateException("UserDetails is not AcntVO");
		}
		res.sendRedirect("/index");
	}
	
}