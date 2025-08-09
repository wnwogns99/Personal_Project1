<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="layout" tagdir="/WEB-INF/tags/layout/frt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<layout:default_layout>
	<div class="auth-card">
		<h1>작가 암기 저장소</h1>
		<form:form action="/loginProc" method="post">
			<div class="form-group">
				<label for="userId">아이디</label>
				<input type="text" id="acnt_id" name="acnt_id" required>
			</div>
			<div class="form-group">
				<label for="password">비밀번호</label>
				<input type="password" id="acnt_pw" name="acnt_pw" required>
			</div>
			<div class="btn-box">
				<button type="submit" class="btn primary w100">로그인</button>
			</div>
		</form:form>
		<div class="auth-links">
			<a href="/findId">아이디 찾기</a>
			<a href="/findPw">비밀번호 찾기</a>
			<a href="/signUp">회원가입</a>
		</div>
	</div>
<script nonce="${cspNonce}">
	$(document).ready(function() {
		const errorMessage = "${sessionScope.errorMessage}";
		console.log(errorMessage);
		if (errorMessage != '') {
			alert(errorMessage);
			<c:remove var="errorMessage" scope="session" />
		}
	});
</script>
</layout:default_layout>
