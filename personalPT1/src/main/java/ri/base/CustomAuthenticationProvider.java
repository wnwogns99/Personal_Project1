package ri.base;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import ri.vo.AcntVO;

@Service("customAuthenticationProvider")
public class CustomAuthenticationProvider implements AuthenticationProvider {
	
	@Autowired
	private UserDetailsService acntService;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String acnt_id = (String) authentication.getPrincipal();
		String acnt_pw = (String) authentication.getCredentials();
		AcntVO acntVO = (AcntVO) acntService.loadUserByUsername(acnt_id);
		if(!passwordEncoder.matches(acnt_pw, acntVO.getAcnt_pw())) {
			throw new BadCredentialsException("");
		}
		if(!acntVO.isAccountNonLocked()) {
			throw new LockedException("");
		}
		if(!acntVO.isEnabled()) {
			throw new DisabledException("");
		}
		return new UsernamePasswordAuthenticationToken(acntVO, acnt_pw, acntVO.getAuthorities());
	}
	
	@Override
	public boolean supports(Class<?> authentication) {
		return true;
	}
	
}