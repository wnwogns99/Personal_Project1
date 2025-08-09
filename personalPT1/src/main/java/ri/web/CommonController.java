package ri.web;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class CommonController {
	
	@GetMapping("/")
	public String root() {
		return "redirect:/index";
	}
	
	@RequestMapping("/error")
	public String error() {
		return "error";
	}
	
	@GetMapping("/login")
	public String login() {
		return "login";
	}
	
	@GetMapping("/index")
	public String index(Authentication auth) {
		
		for (GrantedAuthority authority : auth.getAuthorities()) {
			if (authority.getAuthority().equals("ROLE_ADMIN")) return "redirect:/mng/index";
		}
		return "redirect:/frt/index";
	}
}
