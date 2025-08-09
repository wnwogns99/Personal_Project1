<%@ tag language="java" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<head>
	<title>일렉트로룩스 TDS</title>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
	<meta name="robots" content="follow">
	<meta name="description" content="작가저장사이트">
	<meta name="author" content="realinvention">
	<meta name="copyright" content="realinvention">
	<meta name="keywords" content="작가저장사이트">
	<meta property="og:type" content="website">
	<meta property="og:title" content="작가저장사이트">
	<meta property="og:description" content="작가저장사이트">
	<meta property="og:image" content="/img/thumbnail.png">
	<meta property="og:url" content="">
	
	<meta id="_csrf" name="_csrf" content="${_csrf.token}"/>
	<meta id="_csrf_header" name="_csrf_header" content="${_csrf.headerName}"/>
	<jsp:doBody/>
</head>