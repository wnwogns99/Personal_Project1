package ri.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class FrtController {
	@GetMapping("/frt/index")
	public String index (ModelMap model,HttpServletRequest request) {
		return "frt/index";
	}
}
