<%@ tag language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="fragment" tagdir="/WEB-INF/tags/fragment/frt" %>
<body>
	<div class="wrap">
		<sec:authorize access="isAuthenticated"> <!-- 로그인 후에 헤더 노출 -->
			<fragment:header/>		   <!-- 헤더 -->
		</sec:authorize>
		<main id="main">
			<div class="main_wrap">
				<jsp:doBody /> <!-- 내용 -->
			</div>
		</main>
	</div>
</body>