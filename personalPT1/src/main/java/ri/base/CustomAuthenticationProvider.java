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
			/*DEVJS:S:TODO:차후 삭제필요 - 회원이관시 비밀번호 없는 상태코드 I인 계정 전용 처리 전용*/
			/*비번 틀리면 I스탯인 경우를 제외하고 익셉션*/
			if(!"I".equals(acntVO.getAcnt_stat_cd())) {
			/*DEVJS:E:TODO:차후 삭제필요 - 회원이관시 비밀번호 없는 상태코드 I인 계정 전용 처리 전용*/
				throw new BadCredentialsException("");
			}
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