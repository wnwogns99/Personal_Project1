window.onload = function() {
	if(!$(".myTable").length) {
		$("#loading_bar").hide();
	}
};
function alert(messageHtml, onCloseAnonyFunc) {
	$("#alert_msg").html(messageHtml);
	$("#alert_pop_close_btn").click(function() {
		if (typeof onCloseAnonyFunc === 'function') onCloseAnonyFunc();
	});
	$("#alert_pop").css('display', 'grid');
}
function confirm(messageHtml, onYAnonyFunc, onNAnonyFuc) {
	$("#confirm_msg").html(messageHtml);

	// 이전 클릭 이벤트 제거 후 새로운 이벤트 핸들러 추가
	$("#confirm_pop_y_btn").off("click").on("click", function() {
		if (typeof onYAnonyFunc === 'function') onYAnonyFunc();
	});
	$("#confirm_pop_n_btn").off("click").on("click", function() {
		if (typeof onNAnonyFuc === 'function') onNAnonyFuc();
	});

	// 팝업 표시
	$("#confirm_pop").css('display', 'grid');
}

//DEVJS:S:데이터테이블즈 로딩바 처리
$(document).on('preXhr.dt', function(e, settings, data) {
	$("#loading_bar").show();
});
$(document).on('xhr.dt', function(e, settings, json, xhr) {
	$("#loading_bar").hide();
});
//DEVJS:E:데이터테이블즈 로딩바 처리

$(document).ready(function() {
	// 체크박스 공통 로직
	function applyTableCheckboxLogic() {
		let isChecked = this.checked;
		let tableContainer = $(this).closest('table');

		if ($(this).hasClass("all_chk")) {
			// 전체 선택 체크박스 클릭 시 현재 페이지의 체크박스만 제어
			let visibleCheckboxes = tableContainer.find("tbody tr:visible .chk");
			visibleCheckboxes.prop("checked", isChecked);
		} else {
			// 개별 체크박스 클릭 시
			updateAllCheckStatus(tableContainer);
		}
	}

	// initializeCheckboxes 함수를 전역 스코프로 이동
	function initializeCheckboxes() {
		$('table').each(function() {
			let $table = $(this);
			if ($table.find('.all_chk').length > 0) {
				if ($.fn.DataTable.isDataTable($table)) {
					updateDataTableAllCheckStatus($table);
				} else {
					updateAllCheckStatus($table);
				}
			}
		});
	}

	// updateDataTableAllCheckStatus와 updateAllCheckStatus도 전역 스코프로 이동
	function updateDataTableAllCheckStatus($table) {
		const visibleRows = $table.DataTable().rows({ 'search': 'applied' }).nodes();
		const totalCheckboxes = $(visibleRows).find('.chk').length;
		const checkedCheckboxes = $(visibleRows).find('.chk:checked').length;

		$table.find('.all_chk').prop('checked',
			totalCheckboxes > 0 && totalCheckboxes === checkedCheckboxes
		);
	}

	function updateAllCheckStatus($table) {
		const visibleCheckboxes = $table.find('tbody tr:visible .chk').length;
		const checkedVisibleCheckboxes = $table.find('tbody tr:visible .chk:checked').length;

		$table.find('.all_chk').prop('checked',
			visibleCheckboxes > 0 && visibleCheckboxes === checkedVisibleCheckboxes
		);
	}

	// 그룹권한 체크박스 처리
	$('table.authTable thead input[type="checkbox"]').each(function() {
		$(this).click(function() {
			let columnIndex = $(this).closest('th').index();
			let isChecked = $(this).prop('checked');
			let tbody = $(this).closest('table').find('tbody');

			tbody.find('tr').each(function() {
				$(this).find('td').eq(columnIndex).find('input[type="checkbox"]').prop('checked', isChecked);
			});
		});
	});

	// 그룹권한 개별 체크박스 처리
	$('table.authTable tbody input[type="checkbox"]').click(function() {
		let columnIndex = $(this).closest('td').index();
		let table = $(this).closest('table');
		let totalBoxes = table.find('tbody tr').find('td:nth-child(' + (columnIndex + 1) + ') input[type="checkbox"]').length;
		let checkedBoxes = table.find('tbody tr').find('td:nth-child(' + (columnIndex + 1) + ') input[type="checkbox"]:checked').length;

		table.find('thead tr th').eq(columnIndex).find('input[type="checkbox"]').prop('checked', totalBoxes === checkedBoxes);
	});

	// 팝업 체크박스 전부체크
	$(".popup_all_chk").click(function() {
		let popAllCheck = $(this).is(":checked");

		if (popAllCheck == true) {
			$(".popup_chk").prop("checked", true);
		} else {
			$(".popup_chk").prop("checked", false);
		}
	});
	// 팝업 체크박스 개별체크
	$(".popup_chk").click(function() {
		let popCheckLength = $(".popup_chk").length;
		let popCheckedLength = $(".popup_chk:checked").length;

		if (popCheckLength == popCheckedLength) {
			$(".popup_all_chk").prop("checked", true);
		} else {
			$(".popup_all_chk").prop("checked", false);
		}
	});

	/* --- add 20250205 yunhwan -----*/
	// 팝업 공통 함수
	function initPopup() {
		// 팝업 닫기 공통 처리
		$('.popup_close').click(function() {
			$(this).closest('.popup_area').hide();
			$('html').removeClass('not_scroll');
		});

		// 팝업 열기 공통 처리
		$(document).on('click', '[data-popup]', function() {
			const targetPopup = $(this).data('popup');
			$(`.${targetPopup}`).css('display', 'grid');
			$('html').addClass('not_scroll');

			const mode = $(this).data('mode');
			const $popup = $('.' + targetPopup);
			$popup.find('#duplChkYN').val('');
			$popup.find('#duplResult').text("");

			// 팝업 제목과 버튼 텍스트 설정
			if (mode === 'add') {
				/*모델관리*/
				$popup.find('#post_ctgr_seq').val('');
				$popup.find('#post_ctgr_nm').val('');
				$popup.find('#res_post_ctgr_nm').val('');
				$popup.find('#p_post_ctgr_seq').val('');


				/*고장부위*/

				$popup.find('#duplChkYN').val("");

				$popup.find('.popup_title').text('추가하기');
				$popup.find('.confirm_btn').text('확인');
			} else {
				/*모델관리*/
				let seq = $(this).data('seq');
				let Pseq = $(this).data('pseq');
				let pdtNm = $(this).data('pdtnm');
				let exchNm = $(this).data('exchnm');

				$popup.find('#post_ctgr_seq').val(seq);
				$popup.find('#post_ctgr_nm').val(pdtNm);
				$popup.find('#ctgrNm').val(pdtNm);
				$popup.find('#res_post_ctgr_nm').val(exchNm);
				$popup.find('#p_post_ctgr_seq').val(Pseq);

				/*고장부위*/
				let infoseq = $(this).data('infoseq');
				let infonm = $(this).data('infonm');
				$popup.find('#info_seq').val(infoseq);
				$popup.find('#info_nm').val(infonm);
				$popup.find('#infoNm').val(infonm);

				$popup.find('#duplChk').hide();
				$popup.find('#duplChkYN').val("N");

				$popup.find('.popup_title').text('수정하기');
				$popup.find('.confirm_btn').text('수정');
			}
		});
	}

	// 팝업 초기화
	initPopup();

	/* 회원관리 > 회원관리(상세) */
	// 회원분류 라디오 버튼에 따른 그룹선택2 제어
	$('input[name="user-type"]').change(function() {
		let $secondSelect = $('.select_box select').eq(1); // 그룹선택2 select 박스

		if ($(this).val() === 'center-admin') { // 센터관리자 선택 시
			$secondSelect.prop('disabled', true);
		} else { // 일반회원 선택 시
			$secondSelect.prop('disabled', false);
		}
	});

	// 페이지 로드 시 초기 상태 설정
	if ($('input[name="user-type"]:checked').val() === 'center-admin') {
		$('.select_box select').eq(1).prop('disabled', true);
	}

	/* 회원관리 > 그룹관리(상세) */
	// 대그룹 선택/추가 라디오 버튼 제어
	$('input[name="group_type"]').change(function() {
		let isGroupSelect = $(this).val() === 'select';
		$('.group_select').prop('disabled', !isGroupSelect);
		$('.group_input').prop('disabled', isGroupSelect);

		// 라디오 변경시 센터 입력 비활성화
		$('.center_input').prop('disabled', true);

		// 값 초기화
		if (isGroupSelect) {
			$('.group_input').val('');
		} else {
			$('.group_select').val('');
		}
	});

	// 대그룹 선택 select 변경 감지
	$('.group_select').change(function() {
		let hasValue = $(this).val() !== '';
		$('.center_input').prop('disabled', !hasValue);
		$('.center_input').closest('.input_text').find('button').prop('disabled', !hasValue);
	});

	// 대그룹 추가 input 입력 감지
	$('.group_input').on('input', function() {
		let hasValue = $(this).val().trim() !== '';
		$('.center_input').prop('disabled', !hasValue);
		$('.center_input').closest('.input_text').find('button').prop('disabled', !hasValue);
	});

	// 페이지 로드시 초기 상태 설정
	let isGroupSelect = $('input[name="group_type"]:checked').val() === 'select';
	$('.group_select').prop('disabled', !isGroupSelect);
	$('.group_input').prop('disabled', isGroupSelect);
	$('.center_input').prop('disabled', true);
	$('.center_input').closest('.input_text').find('button').prop('disabled', true);

	/* 그룹권환 */
	// 각 열별 전체 선택/해제 기능
	function setupColumnCheckboxes(allCheckClass, itemCheckClass) {
		// 전체 선택/해제
		$(`.${allCheckClass}`).click(function() {
			let isChecked = $(this).is(':checked');
			$(`.${itemCheckClass}`).prop('checked', isChecked);
		});

		// 개별 체크박스 클릭 시 전체 선택 상태 업데이트
		$(`.${itemCheckClass}`).click(function() {
			let total = $(`.${itemCheckClass}`).length;
			let checked = $(`.${itemCheckClass}:checked`).length;
			$(`.${allCheckClass}`).prop('checked', total === checked);
		});
	}

	// 각 섹션별 체크박스 설정
	setupColumnCheckboxes('auth_cert_all', 'auth_cert');           // 인증자료
	setupColumnCheckboxes('auth_knowledge_all', 'auth_knowledge'); // 지식관리
	setupColumnCheckboxes('auth_material_all', 'auth_material');   // 자재업무
	setupColumnCheckboxes('auth_community_all', 'auth_community'); // 커뮤니티
	setupColumnCheckboxes('auth_customer_all', 'auth_customer');   // 고객센터
	setupColumnCheckboxes('auth_product_all', 'auth_product');     // 제품교환

	/* 제품교환 > 제품교환리스트 */
	// 상세 검색 버튼 클릭 이벤트
	$(".detail_search_btn").click(function() {
		let $detailSearch = $(".search_detail");
		let $icon = $(this).find("i");

		if ($detailSearch.is(":visible")) {
			$detailSearch.slideUp(100);
			$icon.removeClass("i_arrow_up").addClass("i_arrow_down");
			$(this).html('<div>상세 검색 <span class="icon i_position_left"><i class="i_arrow_down"></i></span></div>');
		} else {
			$detailSearch.slideDown(100);
			$icon.removeClass("i_arrow_down").addClass("i_arrow_up");
			$(this).html('<div>상세 검색 접기 <span class="icon i_position_left"><i class="i_arrow_up"></i></span></div>');
		}
	});

	// 날짜 유효성 검사 추가
	function validateDates() {
		var startDate = $('#start_date').val();
		var endDate = $('#end_date').val();

		if (startDate && endDate && startDate > endDate) {
			alert('시작일은 종료일보다 늦을 수 없습니다.');
			$('#start_date').val('');
			$('#end_date').val('');
			return false;
		}
		return true;
	}

	$('#start_date, #end_date').change(function() {
		validateDates();
	});

	/* 제품교환 > 제품교환리스트 > 상태 카테고리 팝업(고장, 교환) */
	// 고장부위, 증상, 교환사유 체크박스 선택 이벤트
	$('.state_category_popup .chk').on('change', function() {
		const $popup = $(this).closest('.state_category_popup');
		const $selectedBox = $popup.find('.state_category_selected_box');
		const labelText = $(this).closest('.chk_label').text().trim();
		const value = $(this).val();

		if (this.checked) {
			// 이미 선택된 항목인지 확인
			if ($selectedBox.find('.selected_item').filter(function() {
				return $(this).text() === labelText;
			}).length === 0) {
				// 체크된 경우 선택된 항목에 추가
				const $selectedItem = $('<span>', {
					class: 'selected_item',
					text: labelText,
					'data-value': value
				}).append(
					$('<button>', {
						class: 'remove-item',
						html: '<i class="icon i_circle_xmark_red"></i>'
					})
				);

				$selectedBox.append($selectedItem);
			}
		} else {
			// 체크 해제된 경우 선택된 항목에서 제거
			$selectedBox.find('.selected_item').filter(function() {
				return $(this).text() === labelText;
			}).remove();
		}
	});

	// 선택된 항목 제거 버튼 클릭 이벤트
	$(document).on('click', '.state_category_selected_box .remove-item', function() {
		const $item = $(this).parent();
		const itemText = $item.text();
		const $popup = $(this).closest('.state_category_popup');

		// 해당하는 체크박스 찾아서 체크 해제
		$popup.find('.chk_label').each(function() {
			if ($(this).text().trim() === itemText) {
				$(this).find('.chk').prop('checked', false);
			}
		});

		// 선택된 항목에서 제거
		$item.remove();
	});

	// state_category 한글 및 알파벳 버튼 생성
	// 초성 추출 함수
	const getChosung = (str) => {
		if (!str || typeof str !== 'string') return '';

		const firstChar = str.charAt(0);
		const code = firstChar.charCodeAt(0);

		if (code >= 44032 && code <= 55203) {
			// 한글 초성 추출
			const chosungList = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
			return chosungList[Math.floor((code - 44032) / 588)];
		}

		// 영어 문자일 경우 대문자로 변환 후 반환
		return firstChar.toUpperCase();
	};

	// state_category 한글 및 알파벳 버튼 생성
	$('.state_category').each(function() {
		const $category = $(this);
		if ($category.children('.cbutton').length > 1) {
			return;
		}

		// 한글 자음 배열
		const hangulList = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
		// 한글 버튼 생성
		hangulList.forEach(function(hangul) {
			const button = $('<input>', {
				type: 'button',
				value: hangul,
				class: 'cbutton'
			});
			$category.append(button);
		});

		// 알파벳 버튼 생성 (ASCII: A=65 ~ Z=90)
		for (let i = 65; i <= 90; i++) {
			const alphabet = String.fromCharCode(i);
			const button = $('<input>', {
				type: 'button',
				value: alphabet,
				class: 'cbutton'
			});
			$category.append(button);
		}
	});

	// 버튼 클릭 이벤트 처리
	$('.state_category').on('click', '.cbutton', function() {
		const value = $(this).val().toUpperCase();
		const $popup = $(this).closest('.state_category_popup');
		const $items = $popup.find('.state_category_items .item');
		const $p_items = $popup.find('.state_category_items');

		// 모든 버튼의 활성화 상태 제거
		$(this).siblings('.cbutton').removeClass('on');
		$(this).addClass('on');

		// 전체 버튼 클릭
		if (value === '전체') {
			$items.show();
			return;
		}

		// 초성,알파벳 버튼 클릭 필터링
		$items.each(function() {
			const $item = $(this);
			const labelText = $item.find('.chk_label').text().trim();
			const firstCharNormalized = getChosung(labelText);

			if (firstCharNormalized === value) {
				$item.show();
			} else {
				$item.hide();
			}
		});
		
		$p_items.each(function(){
			const $p_item = $(this);
			
			const hasVisibleItem = $p_item.find(".item").filter(function() {
				return $(this).css("display") !== "none";
			}).length > 0;

			if (hasVisibleItem) {
				$p_item.show();
			} else {
				$p_item.hide();
			}
		});
	});




	/* input date 클릭 시 달력 UI 표시 */
	$(document).on('click', '.input_date label input[type="date"]', function(e) {
		e.preventDefault();
		this.showPicker();
	});

	/* --- end 20250205 yunhwan -----*/

	// 테이블 내 모든 체크박스에 이벤트 바인딩
	$(document).on('click', 'table .all_chk, table .chk', applyTableCheckboxLogic);
});
/*날짜포맷(yyyy-mm-dd): wnwogns99*/
function formatDate(timestamp) {
	let date = new Date(timestamp);
	return date.getFullYear() + '-' +
		('0' + (date.getMonth() + 1)).slice(-2) + '-' +
		('0' + date.getDate()).slice(-2);
}
/*날짜포맷(yyyy-mm-dd HH:MM:SS): wnwogns99*/
function formatDateTime(timestamp) {
	let date = new Date(timestamp);
	return date.getFullYear() + '-' +
		('0' + (date.getMonth() + 1)).slice(-2) + '-' +
		('0' + date.getDate()).slice(-2) + ' ' +
		('0' + date.getHours()).slice(-2) + ':' +
		('0' + date.getMinutes()).slice(-2) + ':' +
		('0' + date.getSeconds()).slice(-2);
}


/*전화번호 포맷: wnwogns99*/
function formatPhoneNumber(number) {
	// 숫자만 남기기
	let digits = number.replace(/\D/g, "");

	// 11자리 숫자인 경우에만 포맷 적용
	return digits.length === 11 ? digits.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3") : number;
}