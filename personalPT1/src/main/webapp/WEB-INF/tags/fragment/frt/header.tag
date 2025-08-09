<%@ tag language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<header>
	<div class="wrap">
		<h1 class="logo" onclick="location.href='/'" style="cursor:pointer;">작가 암기 저장소</h1>
		<nav>
			<ul>
				<li><a href="/frt/index">메인</a></li>
				<li><a href="/writer/add">작가 추가</a></li>
				<li><a href="/mypage">마이페이지</a></li>
				<li>
					<sec:authorize access="isAuthenticated()">
						<form:form action="/logout" method="post">
							<button type="submit" class="max_w100">로그아웃</button>
						</form:form>
					</sec:authorize>
				</li>
			</ul>
		</nav>
	</div>
</header>

<style>
	header {
		background-color: #333;
		color: #fff;
		padding: 15px 20px;
	}
	header .wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	header h1.logo {
		font-size: 20px;
		margin: 0;
	}
	header nav ul {
		display: flex;
		gap: 20px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	header nav a {
		color: #fff;
		font-weight: bold;
		text-decoration: none;
	}
	header nav a:hover {
		text-decoration: underline;
	}
</style>
