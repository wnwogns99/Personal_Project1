package ri.vo;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
public class AcntVO implements UserDetails, Serializable{

	private static final long serialVersionUID = 8198780305442126203L;
	
	private String acnt_seq;
	private String acnt_type;
	private String acnt_id;
	private String acnt_pw;
	private String acnt_name;
	private String tel_no;
	private LocalDateTime reg_dt;
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		
		if("A".equals(acnt_type)) {
			authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN")); //관리자:A
		}else {
			authorities.add(new SimpleGrantedAuthority("ROLE_USER")); //일반회원:N
		}
		return null;
	}

	@Override
	public String getPassword() {
		return acnt_pw;
	}

	@Override
	public String getUsername() {
		return acnt_id;
	}

}
