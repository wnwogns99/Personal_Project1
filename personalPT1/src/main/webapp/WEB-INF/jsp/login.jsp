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
		<form action="/login" method="post">
			<div class="form-group">
				<label for="userId">아이디</label>
				<input type="text" id="userId" name="username" required>
			</div>
			<div class="form-group">
				<label for="password">비밀번호</label>
				<input type="password" id="password" name="password" required>
			</div>
			<button type="submit" class="btn primary w100">로그인</button>
		</form>
		<div class="auth-links">
			<a href="/find-id">아이디 찾기</a>
			<a href="/find-password">비밀번호 찾기</a>
			<a href="/signup">회원가입</a>
		</div>
	</div>
</layout:default_layout>
