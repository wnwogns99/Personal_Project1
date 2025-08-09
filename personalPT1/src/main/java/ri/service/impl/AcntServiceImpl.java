package ri.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import ri.mapper.AcntMapper;
import ri.service.AcntService;
import ri.vo.AcntVO;

@Service("acntService")
public class AcntServiceImpl implements UserDetailsService, AcntService {
	
	@Autowired private AcntMapper acntMapper;
	
	public UserDetails loadUserByUsername(String acntId) {
		
		AcntVO acntVO = acntMapper.selectAcntByAcntId(acntId);
		if (acntVO == null) throw new UsernameNotFoundException("User not found");
		return acntVO;
	}

	@Override
	public Map<String, Object> selectAcntDetail(String acnt_seq) {
		// TODO Auto-generated method stub
		return null;
	}

	
}