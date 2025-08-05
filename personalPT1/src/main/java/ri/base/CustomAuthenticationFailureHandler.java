package ri.base;

import java.io.IOException;

import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {
	
	public void onAuthenticationFailure(HttpServletRequest req, HttpServletResponse res, AuthenticationException e) throws IOException, ServletException {
		
		String errorMessage = null;
		if (e instanceof LockedException) {
			errorMessage = "계정이 승인되지 않았습니다.";
		} else if (e instanceof CredentialsExpiredException) {
			errorMessage = "비밀번호가 만료되었습니다.";
		} else if (e instanceof AccountExpiredException) {
			errorMessage = "계정이 만료되었습니다.";
		} else if (e instanceof DisabledException) {
			errorMessage = "계정이 비활성화되었습니다.";
		} else {
			errorMessage = "로그인에 실패했습니다.";
		}
		req.getSession().setAttribute("errorMessage", errorMessage);
		res.sendRedirect("/login");
	}
}