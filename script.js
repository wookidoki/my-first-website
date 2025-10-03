/**
 * 바른상품권 - 동적 기능 스크립트
 * - 실시간 팝업 알림
 * - FAQ 아코디언
 * - 스크롤 효과
 * - 카운터 애니메이션
 */

// ===================================================================
// DOM이 로드된 후 실행
// ===================================================================
document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================================================
    // 실시간 거래 팝업 알림
    // ===============================================================
    const popupMessages = [
        { location: '서울 강남구', name: '김**', service: '소액결제', amount: '50만원' },
        { location: '경기 수원시', name: '이**', service: '신용카드', amount: '100만원' },
        { location: '부산 해운대', name: '박**', service: '상품권', amount: '30만원' },
        { location: '대전 서구', name: '최**', service: '소액결제', amount: '70만원' },
        { location: '인천 남동구', name: '정**', service: '신용카드', amount: '200만원' },
        { location: '대구 중구', name: '강**', service: '상품권', amount: '45만원' },
        { location: '광주 서구', name: '조**', service: '소액결제', amount: '60만원' },
        { location: '울산 남구', name: '윤**', service: '신용카드', amount: '150만원' }
    ];

    /**
     * 랜덤 팝업 메시지 표시
     */
    function showPopup() {
        const popup = document.getElementById('livePopup');
        const randomMsg = popupMessages[Math.floor(Math.random() * popupMessages.length)];
        
        if (popup) {
            const textElement = popup.querySelector('.live-popup-text');
            textElement.innerHTML = `${randomMsg.location} ${randomMsg.name} 님<br>${randomMsg.service} ${randomMsg.amount} 입금 완료!`;
            
            // 팝업 표시
            popup.style.display = 'block';
            
            // 4초 후 숨김
            setTimeout(() => {
                popup.style.display = 'none';
            }, 4000);
        }
    }

    // 첫 팝업: 3초 후 표시
    setTimeout(showPopup, 3000);
    
    // 이후 팝업: 10초마다 반복
    setInterval(showPopup, 10000);
    
    // ===============================================================
    // 실시간 통계 카운터 업데이트
    // ===============================================================
    function updateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        // 오늘 이용고객 - 계속 증가
        if (statNumbers[0]) {
            let count = parseInt(statNumbers[0].textContent) || 152;
            
            setInterval(() => {
                count += Math.floor(Math.random() * 3) + 1; // 1-3씩 증가
                statNumbers[0].textContent = count;
                
                // 강조 애니메이션
                statNumbers[0].style.transform = 'scale(1.1)';
                setTimeout(() => {
                    statNumbers[0].style.transform = 'scale(1)';
                }, 200);
            }, 4000);
        }
        
        // 현재 상담중 - 변동
        if (statNumbers[1]) {
            setInterval(() => {
                let current = parseInt(statNumbers[1].textContent) || 38;
                current = current + Math.floor(Math.random() * 7) - 3; // -3 ~ +3 변동
                current = Math.max(25, Math.min(55, current)); // 25-55 범위 제한
                statNumbers[1].textContent = current;
            }, 2500);
        }
        
        // 오늘 거래금액 - 증가
        if (statNumbers[2]) {
            let amount = 4.2;
            
            setInterval(() => {
                amount += (Math.random() * 0.2); // 0-0.2억 증가
                statNumbers[2].textContent = amount.toFixed(1) + '억';
                
                // 색상 변경 효과
                statNumbers[2].style.color = '#00B67A';
                setTimeout(() => {
                    statNumbers[2].style.color = '';
                }, 500);
            }, 6000);
        }
    }
    
    updateCounters();
    
    // ===============================================================
    // 긴급 배너 텍스트 회전
    // ===============================================================
    const urgentTexts = [
        '🔥 긴급! 오늘만 특별 수수료 적용 - 선착순 마감 임박!',
        '⚡ 지금 신청시 최대 93% 수수료 보장!',
        '💰 10분 내 신청시 추가 우대 수수료!',
        '⏰ 오늘 마감! 특별 이벤트 진행중!'
    ];
    
    let textIndex = 0;
    const urgentBanner = document.querySelector('.urgent-text');
    
    if (urgentBanner) {
        setInterval(() => {
            textIndex = (textIndex + 1) % urgentTexts.length;
            
            // 페이드 아웃
            urgentBanner.style.opacity = '0';
            
            setTimeout(() => {
                urgentBanner.textContent = urgentTexts[textIndex];
                // 페이드 인
                urgentBanner.style.opacity = '1';
            }, 300);
        }, 5000);
    }
    
    // ===============================================================
    // FAQ 아코디언 기능
    // ===============================================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // 현재 아이템 토글
            const isActive = item.classList.contains('active');
            
            // 모든 FAQ 닫기
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // 클릭한 아이템만 열기 (이미 열려있었으면 닫힌 상태로 유지)
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // ===============================================================
    // 부드러운 스크롤 (앵커 링크)
    // ===============================================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // #만 있는 경우 처리하지 않음
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = 80; // 헤더 높이
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===============================================================
    // 스크롤 시 헤더 효과
    // ===============================================================
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 10) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            header.style.background = 'rgba(255,255,255,0.98)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            header.style.background = 'white';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ===============================================================
    // 서비스 카드 순차 애니메이션 (Intersection Observer)
    // ===============================================================
    const cards = document.querySelectorAll('.service-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                // 한 번만 실행
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        cardObserver.observe(card);
    });
    
    // ===============================================================
    // 메인 수수료 강조 애니메이션
    // ===============================================================
    const rateValues = document.querySelectorAll('.rate-value');
    
    rateValues.forEach((rate, index) => {
        setInterval(() => {
            rate.style.transform = 'scale(1.1)';
            rate.style.textShadow = '0 0 20px rgba(30, 94, 255, 0.5)';
            
            setTimeout(() => {
                rate.style.transform = 'scale(1)';
                rate.style.textShadow = 'none';
            }, 500);
        }, 3000 + (index * 1000)); // 각각 1초 간격으로 실행
    });
    
    // ===============================================================
    // 특징 아이콘 호버 효과 (모바일 터치 지원)
    // ===============================================================
    const featureIcons = document.querySelectorAll('.feature-icon');
    
    featureIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.style.transform = 'scale(1.15)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    });
    
    // ===============================================================
    // 리뷰 카드 등장 애니메이션
    // ===============================================================
    const reviewCards = document.querySelectorAll('.review-card');
    
    const reviewObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                
                reviewObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    reviewCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        reviewObserver.observe(card);
    });
    
    // ===============================================================
    // CTA 버튼 클릭 추적 (선택사항)
    // ===============================================================
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-kakao, .cta-box');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Google Analytics 또는 다른 분석 도구로 전송
            console.log('CTA 클릭:', this.textContent.trim());
        });
    });
    
    // ===============================================================
    // 플로팅 버튼 스크롤 표시/숨김
    // ===============================================================
    const floatingBtn = document.querySelector('.floating-call');
    
    if (floatingBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                floatingBtn.style.opacity = '1';
                floatingBtn.style.visibility = 'visible';
            } else {
                floatingBtn.style.opacity = '0';
                floatingBtn.style.visibility = 'hidden';
            }
        });
    }
    
    // ===============================================================
    // 성능 최적화: 디바운스 함수
    // ===============================================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // ===============================================================
    // 이미지 지연 로딩 (Lazy Loading)
    // ===============================================================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ===============================================================
    // 초기 로드 시 애니메이션 실행 방지 (깜빡임 제거)
    // ===============================================================
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    console.log('바른상품권 웹사이트가 로드되었습니다.');
    
});