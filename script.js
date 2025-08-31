// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료 - 초기화 시작');
    
    // 가이드 아이템 토글 기능
    initGuideItems();
    
    // 이벤트 카드 클릭 기능
    initEventCards();
    
    // 플로팅 버튼 기능
    initFloatingButton();
    
    // 스크롤 애니메이션
    initScrollAnimations();
    
    // 네비게이션 스무스 스크롤
    initSmoothScroll();
    
    // 헤더 스크롤 효과
    initHeaderScroll();
    
    // 액션 버튼 기능
    initActionButtons();
    
    // 히어로 비디오 최적화
    initHeroVideo();
    
    // FAQ 토글 기능
    initFAQ();
    
    // Sticky 네비게이션 기능
    initStickyNavigationWithActive();
    
    // Process section 하이라이트 효과
    initProcessHighlight();
    
    // 모달 외부 클릭 시 닫기 기능
    initModalCloseOnOutsideClick();
    
    // 햄버거 메뉴 기능
    initHamburgerMenu();
    
    // TOP 버튼 초기화
    initTopButton();
    
    console.log('초기화 완료');
});

// TOP 버튼 초기화 및 제어
function initTopButton() {
    const topBtn = document.querySelector('.top-btn');
    if (!topBtn) {
        console.log('TOP 버튼을 찾을 수 없습니다.');
        return;
    }
    
    console.log('TOP 버튼 초기화 시작');
    
    // 초기 상태 설정
    toggleTopButton();
    
    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', toggleTopButton);
    
    // 클릭 이벤트 리스너 추가
    topBtn.addEventListener('click', scrollToTop);
    
    console.log('TOP 버튼 초기화 완료');
}

// TOP 버튼 표시/숨김 제어
function toggleTopButton() {
    const topBtn = document.querySelector('.top-btn');
    if (!topBtn) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
        topBtn.classList.add('show');
    } else {
        topBtn.classList.remove('show');
    }
}

// 가이드 아이템 토글 기능
function initGuideItems() {
    const guideItems = document.querySelectorAll('.guide-item');
    
    guideItems.forEach(item => {
        item.addEventListener('click', function() {
            const content = this.querySelector('.guide-content');
            const icon = this.querySelector('.guide-icon');
            
            // 현재 아이템이 열려있는지 확인
            const isActive = this.classList.contains('active');
            
            // 모든 아이템 닫기
            guideItems.forEach(gi => {
                gi.classList.remove('active');
                const giIcon = gi.querySelector('.guide-icon');
                giIcon.textContent = '+';
            });
            
            // 클릭한 아이템이 닫혀있었다면 열기
            if (!isActive) {
                this.classList.add('active');
                icon.textContent = '−';
                
                // 가이드 내용에 따른 추천 프로그램 표시
                showRecommendedProgram(this);
            }
        });
    });
}

// 추천 프로그램 표시
function showRecommendedProgram(guideItem) {
    const content = guideItem.querySelector('.guide-content p').textContent;
    let recommendation = '';
    
    if (content.includes('어색하고 긴장')) {
        recommendation = '티키타카 로테이션 소개팅을 추천합니다. 여러 명과 짧은 대화를 나누며 편안하게 시작할 수 있어요.';
    } else if (content.includes('결혼 전제')) {
        recommendation = '블랙회원 전용 소개팅을 추천합니다. 진지한 만남을 원하는 분들만 모여있어요.';
    } else if (content.includes('낯을 가리고')) {
        recommendation = '1:1 블라인드 소개팅을 추천합니다. 조용한 분위기에서 천천히 대화할 수 있어요.';
    } else if (content.includes('설레고 즐거운')) {
        recommendation = '주말 특별 이벤트를 추천합니다. 다양한 활동과 함께 즐거운 만남을 경험하세요.';
    } else if (content.includes('오프라인 모임')) {
        recommendation = '온라인 커뮤니티 활동을 추천합니다. 먼저 온라인으로 친해진 후 오프라인 만남을 가져보세요.';
    }
    
    if (recommendation) {
        showRecommendationModal(recommendation);
    }
}

// 추천 모달 표시
function showRecommendationModal(message) {
    const modal = document.createElement('div');
    modal.className = 'recommendation-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <h3>추천 프로그램</h3>
                <p>${message}</p>
                <button class="modal-close">확인</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 모달 닫기
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // 오버레이 클릭 시 닫기
    const overlay = modal.querySelector('.modal-overlay');
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.remove();
        }
    });
}

// 이벤트 카드 클릭 기능
function initEventCards() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.event-title').textContent;
            const price = this.querySelector('.event-price').textContent;
            const location = this.querySelector('.event-location').textContent;
            
            showEventDetailModal(title, price, location);
        });
    });
}

// 이벤트 상세 모달 표시
function showEventDetailModal(title, price, location) {
    const modal = document.createElement('div');
    modal.className = 'event-detail-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <h3>${title}</h3>
                <div class="event-detail-info">
                    <p><strong>위치:</strong> ${location}</p>
                    <p><strong>가격:</strong> ${price}</p>
                    <p><strong>일정:</strong> 매주 토요일 오후 2시</p>
                    <p><strong>정원:</strong> 20명 (남녀 각 10명)</p>
                </div>
                <div class="modal-buttons">
                    <button class="btn-primary">신청하기</button>
                    <button class="btn-secondary modal-close">닫기</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 모달 닫기
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // 오버레이 클릭 시 닫기
    const overlay = modal.querySelector('.modal-overlay');
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.remove();
        }
    });
    
    // 신청하기 버튼
    const applyBtn = modal.querySelector('.btn-primary');
    applyBtn.addEventListener('click', () => {
        showApplicationForm(title);
        modal.remove();
    });
}

// 신청 폼 표시
function showApplicationForm(eventTitle) {
    const modal = document.createElement('div');
    modal.className = 'application-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <h3>${eventTitle} 신청</h3>
                <form class="application-form">
                    <div class="form-group">
                        <label for="name">이름 *</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">이메일 *</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">연락처 *</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="university">대학교 *</label>
                        <input type="text" id="university" name="university" required>
                    </div>
                    <div class="modal-buttons">
                        <button type="submit" class="btn-primary">신청하기</button>
                        <button type="button" class="btn-secondary modal-close">취소</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 폼 제출 처리
    const form = modal.querySelector('.application-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
        if (validateApplicationForm(data)) {
            showSuccessMessage('신청이 완료되었습니다! 확인 후 연락드리겠습니다.');
            modal.remove();
        }
    });
    
    // 모달 닫기
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // 오버레이 클릭 시 닫기
    const overlay = modal.querySelector('.modal-overlay');
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.remove();
        }
    });
}

// 신청 폼 검증
function validateApplicationForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('이름을 입력해주세요 (2글자 이상)');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('올바른 이메일 주소를 입력해주세요');
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        errors.push('올바른 연락처를 입력해주세요');
    }
    
    if (!data.university || data.university.trim().length < 2) {
        errors.push('대학교명을 입력해주세요');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors.join('\n'));
        return false;
    }
    
    return true;
}

// 플로팅 버튼 기능
function initFloatingButton() {
    const floatingBtn = document.querySelector('.floating-btn');
    
    if (floatingBtn) {
        floatingBtn.addEventListener('click', function() {
            // 1:1 문의 버튼 클릭 시 바로 오픈채팅 링크로 이동
            window.open('https://open.kakao.com/me/gglimpse', '_blank');
        });
    }
}

// 페이지 새로고침 기능
function refreshPage() {
    window.location.reload();
}

// 이용약관 모달 표시
function showTermsModal() {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 스크롤 방지
    }
}

// 이용약관 모달 닫기
function closeTermsModal() {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // 스크롤 복원
    }
}

// 개인정보처리방침 모달 표시
function showPrivacyModal() {
    const modal = document.getElementById('privacyModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 스크롤 방지
    }
}

// 개인정보처리방침 모달 닫기
function closePrivacyModal() {
    const modal = document.getElementById('privacyModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // 스크롤 복원
    }
}

// 모달 외부 클릭 시 닫기 기능 초기화
function initModalCloseOnOutsideClick() {
    const modals = document.querySelectorAll('.modal-overlay');
    
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                // 모달 외부 클릭 시 닫기
                modal.style.display = 'none';
                document.body.style.overflow = ''; // 스크롤 복원
            }
        });
    });
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal-overlay[style*="flex"]');
            if (openModal) {
                openModal.style.display = 'none';
                document.body.style.overflow = ''; // 스크롤 복원
            }
        }
    });
}

// TOP 버튼 스크롤 기능
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 1:1 문의 모달 표시
function showInquiryModal() {
    const modal = document.createElement('div');
    modal.className = 'inquiry-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <h3>1:1 문의</h3>
                <div class="inquiry-options">
                    <button class="inquiry-option" data-type="kakao">
                        <img src="images/kakao-logo.png" alt="KakaoTalk" class="inquiry-icon">
                        <span>카카오톡 문의</span>
                    </button>
                    <button class="inquiry-option" data-type="phone">
                        <span>📞</span>
                        <span>전화 문의</span>
                    </button>
                    <button class="inquiry-option" data-type="email">
                        <span>📧</span>
                        <span>이메일 문의</span>
                    </button>
                </div>
                <button class="btn-secondary modal-close">닫기</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 문의 옵션 클릭 처리
    const inquiryOptions = modal.querySelectorAll('.inquiry-option');
    inquiryOptions.forEach(option => {
        option.addEventListener('click', function() {
            const type = this.dataset.type;
            handleInquiry(type);
            modal.remove();
        });
    });
    
    // 모달 닫기
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // 오버레이 클릭 시 닫기
    const overlay = modal.querySelector('.modal-overlay');
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.remove();
        }
    });
}

// 문의 처리
function handleInquiry(type) {
    switch(type) {
        case 'kakao':
            window.open('https://open.kakao.com/me/gglimpse', '_blank');
            break;
        case 'phone':
            window.location.href = 'tel:02-1234-5678';
            break;
        case 'email':
            window.location.href = 'mailto:team.gglimpse@gmail.com';
            break;
    }
}

// 액션 버튼 기능
function initActionButtons() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (href === '#reviews') {
                showReviewsModal();
            } else if (href === '#apply') {
                showApplicationModal();
            } else if (href === '#faq') {
                showFAQModal();
            } else if (href.startsWith('#')) {
                // 일반 앵커 링크 처리 (행사안내 등)
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// 후기 모달 표시
function showReviewsModal() {
    const modal = document.createElement('div');
    modal.className = 'reviews-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <h3>실제 참여 후기</h3>
                <div class="reviews-list">
                    <div class="review-item">
                        <p>"처음에는 긴장했는데, 분위기가 너무 편안해서 자연스럽게 대화할 수 있었어요. 지금은 3개월째 연애 중입니다!"</p>
                        <cite>- 김서연, 연세대학교</cite>
                    </div>
                    <div class="review-item">
                        <p>"gglimpse 덕분에 진짜 좋은 사람을 만났어요. 체계적인 시스템이 정말 인상적이었습니다."</p>
                        <cite>- 박민수, 고려대학교</cite>
                    </div>
                    <div class="review-item">
                        <p>"대학생만 모여서 더 편안했고, 성비도 잘 맞춰져서 만족스러웠어요. 친구들도 추천했어요!"</p>
                        <cite>- 이지은, 서울대학교</cite>
                    </div>
                </div>
                <button class="btn-secondary modal-close">닫기</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 모달 닫기
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // 오버레이 클릭 시 닫기
    const overlay = modal.querySelector('.modal-overlay');
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.remove();
        }
    });
}

// 신청 모달 표시
function showApplicationModal() {
    const modal = document.createElement('div');
    modal.className = 'application-list-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <h3>모임 참여 신청</h3>
                <div class="application-list">
                    <div class="application-item">
                        <h4>수도권 모임</h4>
                        <p>서울, 경기 지역 소개팅</p>
                        <button class="btn-primary" onclick="showEventDetailModal('[서울 강남] 티키타카 로테이션 소개팅', '28,000원', '강남역 근처')">신청하기</button>
                    </div>
                    <div class="application-item">
                        <h4>전국 모임</h4>
                        <p>전국 각 지역 소개팅</p>
                        <button class="btn-primary" onclick="showEventDetailModal('[부산 전포] 티키타카 로테이션 소개팅', '28,000원', '부산역 근처')">신청하기</button>
                    </div>
                </div>
                <button class="btn-secondary modal-close">닫기</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 모달 닫기
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // 오버레이 클릭 시 닫기
    const overlay = modal.querySelector('.modal-overlay');
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.remove();
        }
    });
}

// FAQ 모달 표시
function showFAQModal() {
    const modal = document.createElement('div');
    modal.className = 'faq-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <h3>자주 묻는 질문</h3>
                <div class="faq-list">
                    <div class="faq-item">
                        <h4>참가 조건은?</h4>
                        <p>수도권 대학교 재학생 또는 졸업생이며, 만 20세 이상인 분들이 참가 가능합니다.</p>
                    </div>
                    <div class="faq-item">
                        <h4>환불은 가능한가요?</h4>
                        <p>이벤트 7일 전까지는 전액 환불 가능합니다. 7일 이내에는 50% 환불, 당일 취소는 환불되지 않습니다.</p>
                    </div>
                    <div class="faq-item">
                        <h4>성비는 어떻게 맞추나요?</h4>
                        <p>신청자 수에 따라 1:1 성비를 맞추며, 초과 신청 시 대기자 명단을 운영합니다.</p>
                    </div>
                </div>
                <button class="btn-secondary modal-close">닫기</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 모달 닫기
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // 오버레이 클릭 시 닫기
    const overlay = modal.querySelector('.modal-overlay');
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.remove();
        }
    });
}

// 스크롤 애니메이션
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // 애니메이션을 적용할 요소들
    const animatedElements = document.querySelectorAll('.event-card, .guide-item, .location-link');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// 스무스 스크롤
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#top') {
                // 맨 위로 스크롤
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const stickyNav = document.querySelector('.sticky-nav');
                    const stickyNavHeight = stickyNav && stickyNav.classList.contains('active') ? stickyNav.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - stickyNavHeight - 60;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// 헤더 스크롤 효과 (sticky nav와의 일관성을 위해 헤더는 항상 표시)
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (header) {
        // 헤더를 항상 표시 상태로 유지
        header.style.transform = 'translateY(0)';
        
        // 스크롤에 따른 그림자 효과만 적용
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 10) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 0 0 rgba(0, 0, 0, 0)';
            }
        });
    }
}

// 이메일 검증
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 전화번호 검증
function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{2,3}-?[0-9]{3,4}-?[0-9]{4}$/;
    return phoneRegex.test(phone.replace(/[^0-9]/g, ''));
}

// 성공 메시지 표시
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        ">
            ✅ ${message}
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// 에러 메시지 표시
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f44336;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            white-space: pre-line;
        ">
            ❌ ${message}
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// CSS 애니메이션 스타일 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }
    
    .modal-content {
        background: white;
        padding: 30px;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .modal-content h3 {
        margin-bottom: 20px;
        color: #333;
    }
    
    .form-group {
        margin-bottom: 20px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #333;
    }
    
    .form-group input {
        width: 100%;
        padding: 12px;
        border: 2px solid #e5e5e5;
        border-radius: 8px;
        font-size: 16px;
        transition: border-color 0.3s ease;
    }
    
    .form-group input:focus {
    outline: none;
    border-color: #8B5CF6;
}
    
    .modal-buttons {
        display: flex;
        gap: 12px;
        margin-top: 20px;
    }
    
    .btn-primary {
    background: #8B5CF6;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
}

.btn-primary:hover {
    background: #7C3AED;
}
    
    .btn-secondary {
        background: #f8f8f8;
        color: #333;
        border: 1px solid #e5e5e5;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s ease;
    }
    
    .btn-secondary:hover {
        background: #f0f0f0;
    }
    
    .inquiry-options {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 20px;
    }
    
    .inquiry-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        background: #f8f8f8;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.3s ease;
        font-size: 16px;
    }
    
    .inquiry-option:hover {
        background: #f0f0f0;
    }
    
    .inquiry-icon {
        width: 20px;
        height: 20px;
        object-fit: contain;
    }
    
    .reviews-list {
        margin-bottom: 20px;
    }
    
    .review-item {
        background: #f8f8f8;
        padding: 16px;
        border-radius: 8px;
        margin-bottom: 12px;
    }
    
    .review-item p {
        margin-bottom: 8px;
        font-style: italic;
        color: #555;
    }
    
    .review-item cite {
    color: #8B5CF6;
    font-weight: 600;
}
    
    .application-list {
        margin-bottom: 20px;
    }
    
    .application-item {
        background: #f8f8f8;
        padding: 16px;
        border-radius: 8px;
        margin-bottom: 12px;
    }
    
    .application-item h4 {
        margin-bottom: 8px;
        color: #333;
    }
    
    .application-item p {
        margin-bottom: 12px;
        color: #666;
    }
    
    .faq-list {
        margin-bottom: 20px;
    }
    
    .faq-item {
        background: #f8f8f8;
        padding: 16px;
        border-radius: 8px;
        margin-bottom: 12px;
    }
    
    .faq-item h4 {
        margin-bottom: 8px;
        color: #333;
    }
    
    .faq-item p {
        color: #666;
    }
    
    .header {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// FAQ 데이터
const faqData = [
    // 참가 / 운영
    {
        id: 'participation-conditions',
        category: 'participation',
        question: '[참가] 참가 조건은 어떻게 되나요?',
        answer: '서울/경기 소재 대학(원) 재학생·휴학생(00~06년생)만 참여할 수 있습니다. 행사 전 신분증 인증이 필수예요.'
    },
    {
        id: 'confirmation-notice',
        category: 'participation',
        question: '[참가] 신청 후 확정은 어떻게 알 수 있나요?',
        answer: '신청이 접수되면 운영진이 참가 조건과 성비를 확인한 뒤, 확정 문자를 행사 3~5일 전까지 발송합니다.'
    },
    {
        id: 'waiting-list',
        category: 'participation',
        question: '[참가] 대기자 제도도 있나요?',
        answer: '네. 회차 정원이 초과되면 자동으로 대기자로 등록되며, 공석이 생길 경우 순서대로 안내드립니다.'
    },
    {
        id: 'process-method',
        category: 'participation',
        question: '[운영] 진행 방식은 어떻게 되나요?',
        answer: '참가자는 10분간 1:1 대화를 나눈 뒤, 3분간 메모를 작성합니다. 이후 남자 참가자가 자리를 옮겨 새로운 대화를 이어가요. 모든 라운드가 끝나면 최대 3명까지 호감을 선택할 수 있어요.'
    },
    {
        id: 'participant-count',
        category: 'participation',
        question: '[운영] 몇 명이 함께 참여하나요?',
        answer: '보통 한 회차에 남녀 각 6~8명 정도가 참여합니다.'
    },
    
    // 매칭 / 결과
    {
        id: 'matching-result',
        category: 'matching',
        question: '[매칭] 매칭 결과는 언제 알 수 있나요?',
        answer: '행사 종료 후 당일 밤 11시까지 문자로 안내드립니다. 서로 호감을 표시한 경우에만 매칭이 성사되며, 그때 연락처가 공유됩니다.'
    },
    {
        id: 'contact-privacy',
        category: 'matching',
        question: '[매칭] 내가 선택하지 않은 상대가 나의 연락처를 알게 될 수 있나요?',
        answer: '아니요. 쌍방 호감이 일치한 경우에만 연락처가 공유됩니다. 선택하지 않은 상대에게 연락처가 전달되는 일은 없습니다.'
    },
    
    // 결제 / 환불
    {
        id: 'participation-fee',
        category: 'payment',
        question: '[결제] 참가비는 얼마인가요?',
        answer: '남자 25,000원 / 여자 20,000원 (음료·다과 및 공간 대여 비용 포함).'
    },
    {
        id: 'refund-policy',
        category: 'payment',
        question: '[환불] 환불은 가능한가요?',
        answer: '행사 5일 전까지는 100% 환불되며, 이후에는 환불이 불가합니다.'
    },
    
    // 현장 준비
    {
        id: 'dress-code',
        category: 'on-site',
        question: '[현장] 어떤 옷차림이 적절한가요?',
        answer: '깔끔한 캐주얼이나 세미포멀 복장을 권장합니다.'
    },
    {
        id: 'preparation-items',
        category: 'on-site',
        question: '[현장] 준비물이 있나요?',
        answer: '신분증만 지참하시면 됩니다. 메모 용지와 펜은 현장에서 제공됩니다.'
    },
    {
        id: 'conversation-guide',
        category: 'on-site',
        question: '[현장] 대화 주제가 너무 어색하면 어떻게 하나요?',
        answer: '각 참가자에게 제공되는 프로필 카드를 참고해 가볍게 대화를 시작할 수 있어요. 자연스럽게 이어갈 수 있도록 간단한 대화 가이드도 준비되어 있습니다.'
    },
    {
        id: 'late-arrival',
        category: 'on-site',
        question: '[현장] 늦으면 어떻게 되나요?',
        answer: '시작 후 10분 이상 지각 시 중도 합류는 가능하지만 놓친 라운드는 보장되지 않습니다. 무단 불참(노쇼)의 경우 환불이 불가합니다.'
    },
    
    // 안전 / 신뢰성
    {
        id: 'privacy-management',
        category: 'safety',
        question: '[안전] 개인정보는 어떻게 관리되나요?',
        answer: '신청 시 제공된 개인정보는 매칭 및 운영 목적 외에는 사용되지 않으며, 행사 종료 후 안전하게 파기됩니다.'
    },
    {
        id: 'safety-operation',
        category: 'safety',
        question: '[안전] 안전하게 운영되나요?',
        answer: '참가자 전원은 학생증 인증 절차를 거치며, 운영진이 현장에 상주해 원활한 진행을 보장합니다.'
    },
    {
        id: 'photo-usage',
        category: 'safety',
        question: '[안전] 사진이나 후기는 어떻게 활용되나요?',
        answer: '촬영된 사진·영상과 작성된 후기는 익명·모자이크 처리 후 홍보용으로 사용될 수 있습니다.'
    },
    
    // 기타
    {
        id: 'friend-participation',
        category: 'other',
        question: '[기타] 친구와 함께 신청할 수 있나요?',
        answer: '네, 같은 회차 신청은 가능합니다. 다만, 대화 테이블 배치는 무작위로 이루어집니다.'
    },
    {
        id: 're-participation',
        category: 'other',
        question: '[기타] 재참여가 가능한가요?',
        answer: '가능합니다. 중복 매칭을 피하기 위해 매번 새로운 조합으로 편성됩니다.'
    },
    {
        id: 'contact-inquiry',
        category: 'other',
        question: '[기타] 문의는 어디로 하나요?',
        answer: '공식 카카오톡 채널(<a href="https://open.kakao.com/me/gglimpse" target="_blank" rel="noopener noreferrer">https://open.kakao.com/me/gglimpse</a>)로 언제든 문의하실 수 있습니다.'
    }
];

// FAQ 페이지네이션 변수
let currentPage = 1;
let itemsPerPage = 5;
let currentFilteredData = [];

// FAQ 토글 기능
function initFAQ() {
    currentFilteredData = faqData;
    renderFAQList();
    renderPagination();
    initFAQSearch();
    initCategoryFilters();
    initFAQControls();
}

// FAQ 목록 렌더링
function renderFAQList(filteredData = null) {
    const faqList = document.getElementById('faq-list');
    
    if (filteredData) {
        currentFilteredData = filteredData;
        currentPage = 1; // 필터링 시 첫 페이지로 리셋
    }
    
    // 현재 페이지에 해당하는 데이터만 추출
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataToRender = currentFilteredData.slice(startIndex, endIndex);
    
    faqList.innerHTML = dataToRender.map(item => `
        <div class="faq-item" data-category="${item.category}" data-id="${item.id}">
            <button class="faq-question" 
                    aria-expanded="false" 
                    aria-controls="faq-answer-${item.id}"
                    role="button">
                <span class="faq-text">${item.question}</span>
                <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer" 
                id="faq-answer-${item.id}" 
                aria-hidden="true">
                <p>${item.answer}</p>
            </div>
        </div>
    `).join('');
    
    // FAQ 토글 이벤트 리스너 추가
    initFAQToggle();
    
    // 페이지네이션 업데이트
    renderPagination();
}

// FAQ 토글 기능
function initFAQToggle() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const answer = this.nextElementSibling;
            
            // 현재 FAQ 토글
            this.setAttribute('aria-expanded', !isExpanded);
            answer.setAttribute('aria-hidden', isExpanded);
            
            // 아이콘 변경
            const icon = this.querySelector('.faq-icon');
            icon.textContent = isExpanded ? '+' : '×';
            
            // 이벤트 트래킹
            trackFAQEvent('faq_toggle', {
                question: this.querySelector('.faq-text').textContent,
                action: isExpanded ? 'close' : 'open'
            });
        });
    });
}

// FAQ 검색 기능
function initFAQSearch() {
    const searchInput = document.getElementById('faq-search');
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length === 0) {
            currentFilteredData = faqData;
            currentPage = 1;
            renderFAQList();
            return;
        }
        
        const filteredData = faqData.filter(item => 
            item.question.toLowerCase().includes(query) || 
            item.answer.toLowerCase().includes(query)
        );
        
        currentFilteredData = filteredData;
        currentPage = 1;
        renderFAQList();
        highlightSearchResults(query);
        
        // 이벤트 트래킹
        trackFAQEvent('faq_search', { query: query, results: filteredData.length });
    });
}

// 검색 결과 하이라이트
function highlightSearchResults(query) {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-text');
        const answer = item.querySelector('.faq-answer p');
        
        if (query.length > 0) {
            question.innerHTML = highlightText(question.textContent, query);
            answer.innerHTML = highlightText(answer.textContent, query);
        }
    });
}

// 텍스트 하이라이트
function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight-match">$1</span>');
}

// 카테고리 필터 기능
function initCategoryFilters() {
    const categoryChips = document.querySelectorAll('.category-chip');
    
    categoryChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // 활성 상태 변경
            categoryChips.forEach(c => {
                c.setAttribute('aria-pressed', 'false');
                c.classList.remove('active');
            });
            this.setAttribute('aria-pressed', 'true');
            this.classList.add('active');
            
            // FAQ 필터링
            if (category === 'all') {
                currentFilteredData = faqData;
            } else {
                currentFilteredData = faqData.filter(item => item.category === category);
            }
            
            currentPage = 1;
            renderFAQList();
            
            // 이벤트 트래킹
            trackFAQEvent('faq_category_filter', { category: category });
        });
    });
}

// FAQ 컨트롤 기능
function initFAQControls() {
    const expandAllBtn = document.getElementById('expand-all');
    const collapseAllBtn = document.getElementById('collapse-all');
    
    expandAllBtn.addEventListener('click', function() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(q => {
            q.setAttribute('aria-expanded', 'true');
            q.nextElementSibling.setAttribute('aria-hidden', 'false');
            q.querySelector('.faq-icon').textContent = '×';
        });
        
        this.setAttribute('aria-expanded', 'true');
        trackFAQEvent('faq_expand_all');
    });
    
    collapseAllBtn.addEventListener('click', function() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(q => {
            q.setAttribute('aria-expanded', 'false');
            q.nextElementSibling.setAttribute('aria-hidden', 'true');
            q.querySelector('.faq-icon').textContent = '+';
        });
        
        this.setAttribute('aria-expanded', 'false');
        trackFAQEvent('faq_collapse_all');
    });
}

// FAQ 페이지네이션 렌더링
function renderPagination() {
    const paginationContainer = document.getElementById('faq-pagination');
    const totalPages = Math.ceil(currentFilteredData.length / itemsPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // 이전 페이지 버튼
    paginationHTML += `
        <button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">
            ←
        </button>
    `;
    
    // 페이지 번호 버튼들
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
                ${i}
            </button>
        `;
    }
    
    // 다음 페이지 버튼
    paginationHTML += `
        <button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">
            →
        </button>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
    
    // 페이지 버튼 이벤트 리스너 추가
    initPaginationEvents();
}

// FAQ 페이지네이션 이벤트
function initPaginationEvents() {
    const pageButtons = document.querySelectorAll('.faq-pagination .page-btn');
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.disabled) return;
            
            const newPage = parseInt(this.getAttribute('data-page'));
            if (newPage >= 1 && newPage <= Math.ceil(currentFilteredData.length / itemsPerPage)) {
                currentPage = newPage;
                renderFAQList();
                
                // 이벤트 트래킹
                trackFAQEvent('faq_page_change', { page: newPage });
            }
        });
    });
}

// FAQ 이벤트 트래킹
function trackFAQEvent(action, data = {}) {
    // Google Analytics 또는 다른 분석 도구로 이벤트 전송
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: 'FAQ',
            ...data
        });
    }
    
    // 콘솔 로그 (개발용)
    console.log('FAQ Event:', action, data);
}

// 히어로 비디오 최적화
function initHeroVideo() {
    const video = document.querySelector('.hero-video');
    
    if (video) {
        // 비디오 로딩 최적화
        video.addEventListener('loadeddata', function() {
            console.log('히어로 비디오 로딩 완료');
        });
        
        // 에러 처리
        video.addEventListener('error', function() {
            console.log('비디오 로딩 실패, 배경 이미지로 대체');
            // 비디오 로딩 실패 시 배경 이미지로 대체
            const hero = document.querySelector('.hero');
            hero.style.background = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("images/hero-bg.jpg")';
            hero.style.backgroundSize = 'cover';
            hero.style.backgroundPosition = 'center';
        });
        
        // 모바일에서 성능 최적화
        if (window.innerWidth <= 768) {
            video.setAttribute('playsinline', '');
            video.setAttribute('muted', '');
        }
    }
}

// 페이지 로드 시 초기화
window.addEventListener('load', function() {
    // 페이지 로드 완료 후 추가 애니메이션
    document.body.classList.add('loaded');
});

// Sticky 네비게이션 초기화
function initStickyNavigationWithActive() {
    const stickyNav = document.querySelector('.sticky-nav');
    const stickyNavLinks = document.querySelectorAll('.sticky-nav-link');
    const sections = document.querySelectorAll('section[id]');
    const header = document.querySelector('.header');
    
    if (!stickyNav || !sections.length) {
        console.log('스티키 네비게이션 요소를 찾을 수 없습니다.');
        return;
    }
    
    console.log('스티키 네비게이션 초기화 시작');
    console.log('현재 화면 너비:', window.innerWidth);
    console.log('헤더 높이:', header ? header.offsetHeight : 80);
    console.log('스티키 네비게이션 높이:', stickyNav.offsetHeight);
    
    let headerHeight = header ? header.offsetHeight : 80;
    let stickyNavHeight = stickyNav.offsetHeight;
    
    // 모바일에서 스티키 기능 강제 활성화
    function forceStickyOnMobile() {
        if (window.innerWidth <= 768) {
            console.log('모바일 모드: JavaScript 기반 스티키 활성화');
            
            // 히어로 섹션 찾기
            const heroSection = document.querySelector('.hero');
            const heroHeight = heroSection ? heroSection.offsetHeight : 0;
            
            // 모바일에서는 JavaScript로 스티키 기능 구현
            // 초기에는 히어로 섹션 아래에 자연스럽게 위치
            stickyNav.style.cssText = `
                position: relative !important;
                top: auto !important;
                left: auto !important;
                right: auto !important;
                z-index: 999 !important;
                background: #ffffff !important;
                border-bottom: 1px solid #e5e5e5 !important;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
                width: 100% !important;
                max-width: 100vw !important;
                transition: all 0.3s ease !important;
                transform: translateY(0) !important;
            `;
            
            console.log('스티키 네비게이션 스타일 적용됨:', stickyNav.style.cssText);
            console.log('히어로 섹션 높이:', heroHeight);
            
            // 스크롤 이벤트로 스티키 동작 구현
            let isSticky = false; // 스티키 상태 추적
            let lastScrollTop = 0; // 마지막 스크롤 위치 추적
            
            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // 스크롤 방향 확인 (위/아래)
                const isScrollingDown = scrollTop > lastScrollTop;
                lastScrollTop = scrollTop;
                
                // 스티키 네비게이션이 실제로 화면 맨 위에 도착했을 때만 활성화
                // 히어로 섹션의 전체 높이 + 스티키 네비게이션의 높이 + 여유 공간(20px)만큼 스크롤된 후에 고정
                const stickyActivationPoint = heroHeight + stickyNavHeight + 20;
                
                // 디바운싱을 위한 지연 처리
                clearTimeout(window.stickyTimeout);
                window.stickyTimeout = setTimeout(() => {
                    if (scrollTop >= stickyActivationPoint && !isSticky) {
                        // 스티키 상태로 변경
                        stickyNav.style.cssText = `
                            position: fixed !important;
                            top: 0 !important;
                            left: 0 !important;
                            right: 0 !important;
                            z-index: 999 !important;
                            background: #ffffff !important;
                            border-bottom: 1px solid #e5e5e5 !important;
                            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
                            width: 100% !important;
                            max-width: 100vw !important;
                            transition: all 0.3s ease !important;
                            transform: translateY(0) !important;
                        `;
                        isSticky = true;
                        console.log('스티키 네비게이션 고정됨, 스크롤 위치:', scrollTop, '히어로 높이:', heroHeight, '스티키 높이:', stickyNavHeight, '활성화 지점:', stickyActivationPoint);
                    } else if (scrollTop < stickyActivationPoint && isSticky) {
                        // 일반 위치로 복귀
                        stickyNav.style.cssText = `
                            position: relative !important;
                            top: auto !important;
                            left: auto !important;
                            right: auto !important;
                            z-index: 999 !important;
                            background: #ffffff !important;
                            border-bottom: 1px solid #e5e5e5 !important;
                            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
                            width: 100% !important;
                            max-width: 100vw !important;
                            transition: all 0.3s ease !important;
                            transform: translateY(0) !important;
                        `;
                        isSticky = false;
                        console.log('스티키 네비게이션 일반 위치로 복귀, 스크롤 위치:', scrollTop, '히어로 높이:', heroHeight, '스티키 높이:', stickyNavHeight, '활성화 지점:', stickyActivationPoint);
                    }
                }, 10); // 10ms 지연으로 성능 최적화
            });
            
        } else {
            console.log('PC 모드: CSS 기반 스티키 사용');
            
            // PC에서는 CSS 스티키 사용
            stickyNav.style.cssText = '';
            
            // PC에서 스티키 클래스 추가
            stickyNav.classList.add('sticky-enabled');
            
            // 여백 제거
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.marginBottom = '';
            }
            
            // PC에서 스크롤 시 스티키 상태 관리
            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > headerHeight) {
                    stickyNav.classList.add('scrolled');
                } else {
                    stickyNav.classList.remove('scrolled');
                }
            });
        }
    }
    
    // 초기 설정
    forceStickyOnMobile();

    // 스크롤 시 현재 섹션에 따른 네비게이션 활성화
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 현재 섹션에 따른 네비게이션 활성화
        updateActiveNavLink(scrollTop, headerHeight, stickyNavHeight);
        
        // TOP 버튼 표시/숨김 제어
        toggleTopButton();
    });
    
    // 네비게이션 링크 클릭 시 스무스 스크롤
    stickyNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 모바일에서는 fixed position을 고려한 스크롤 위치 계산
                let targetPosition;
                if (window.innerWidth <= 768) {
                    targetPosition = targetElement.offsetTop - headerHeight - stickyNavHeight;
                } else {
                    targetPosition = targetElement.offsetTop - headerHeight - stickyNavHeight;
                }
                
                console.log('스크롤 대상:', targetId, '위치:', targetPosition);
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 초기 활성 링크 설정
    updateActiveNavLink(window.pageYOffset || document.documentElement.scrollTop, headerHeight, stickyNavHeight);
    
    // 리사이즈 시 스티키 설정 재적용
    window.addEventListener('resize', function() {
        console.log('화면 크기 변경됨:', window.innerWidth);
        headerHeight = header ? header.offsetHeight : 80;
        stickyNavHeight = stickyNav.offsetHeight;
        forceStickyOnMobile();
        updateActiveNavLink(window.pageYOffset || document.documentElement.scrollTop, headerHeight, stickyNavHeight);
    });
    
    // DOM 변경 감지 (동적 콘텐츠 로딩 시)
    const observer = new MutationObserver(function() {
        headerHeight = header ? header.offsetHeight : 80;
        stickyNavHeight = stickyNav.offsetHeight;
        forceStickyOnMobile();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('스티키 네비게이션 초기화 완료');
}

// 현재 섹션에 따른 네비게이션 활성화
function updateActiveNavLink(scrollTop, headerHeight, stickyNavHeight) {
    const sections = document.querySelectorAll('section[id]');
    const stickyNavLinks = document.querySelectorAll('.sticky-nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        // 항상 헤더 + sticky nav 높이 + 여유 공간으로 계산
        const offset = headerHeight + stickyNavHeight + 50;
        
        if (scrollTop >= sectionTop - offset && scrollTop < sectionTop + sectionHeight - offset) {
            current = section.getAttribute('id');
        }
    });
    
    // 모든 링크에서 active 클래스 제거
    stickyNavLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // 현재 섹션에 해당하는 링크에 active 클래스 추가
    if (current) {
        const activeLink = document.querySelector(`.sticky-nav-link[href="#${current}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// 윈도우 리사이즈 시 모바일 메뉴 초기화
window.addEventListener('resize', function() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
    
    // sticky 네비게이션 높이 재계산
    const stickyNav = document.querySelector('.sticky-nav');
    const header = document.querySelector('.header');
    if (stickyNav && header) {
        const headerHeight = header.offsetHeight;
        const stickyNavHeight = stickyNav.offsetHeight;
        updateActiveNavLink(window.pageYOffset || document.documentElement.scrollTop, headerHeight, stickyNavHeight);
    }
});

// Process section 하이라이트 효과
function initProcessHighlight() {
    const painCtaBtn = document.querySelector('.pain-cta-btn');
    if (painCtaBtn) {
        painCtaBtn.addEventListener('click', function() {
            setTimeout(() => {
                const firstProcessCard = document.querySelector('.process-card');
                if (firstProcessCard) {
                    firstProcessCard.classList.add('highlight');
                    setTimeout(() => {
                        firstProcessCard.classList.remove('highlight');
                    }, 500);
                }
            }, 1000); // 스크롤 완료 후 1초 뒤 실행
        });
    }
}

// 햄버거 메뉴 기능
function initHamburgerMenu() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    let scrollPosition = 0;
    
    // 햄버거 메뉴 클릭 시 모바일 메뉴 열기
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            // 현재 스크롤 위치 저장
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            mobileNav.classList.add('active');
            document.body.classList.add('menu-open'); // body에 클래스 추가
        });
    }
    
    // 닫기 버튼 클릭 시 모바일 메뉴 닫기
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            document.body.classList.remove('menu-open'); // body에서 클래스 제거
            // 스크롤 위치 복원
            setTimeout(() => {
                window.scrollTo(0, scrollPosition);
            }, 100);
        });
    }
    
    // 모바일 메뉴 링크 클릭 시 메뉴 닫기
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            document.body.classList.remove('menu-open'); // body에서 클래스 제거
            // 스크롤 위치 복원
            setTimeout(() => {
                window.scrollTo(0, scrollPosition);
            }, 100);
        });
    });
    
    // 모바일 메뉴 외부 클릭 시 닫기
    document.addEventListener('click', function(e) {
        if (mobileNav && mobileNav.classList.contains('active')) {
            if (!mobileNav.contains(e.target) && !hamburgerMenu.contains(e.target)) {
                mobileNav.classList.remove('active');
                document.body.classList.remove('menu-open'); // body에서 클래스 제거
                // 스크롤 위치 복원
                setTimeout(() => {
                    window.scrollTo(0, scrollPosition);
                }, 100);
            }
        }
    });
    
    // ESC 키로 모바일 메뉴 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            document.body.classList.remove('active');
            document.body.classList.remove('menu-open'); // body에서 클래스 제거
            // 스크롤 위치 복원
            setTimeout(() => {
                window.scrollTo(0, scrollPosition);
            }, 100);
        }
    });
    
    // 페이지 로드 시 메뉴 상태 초기화
    if (mobileNav) {
        mobileNav.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
} 