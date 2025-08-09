package ri.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import ri.vo.AcntVO;

@Mapper
public interface AcntMapper {
	
	AcntVO selectAcntByAcntId(String acntId);
}