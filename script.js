// script.js - 동적 효과 강화

document.addEventListener('DOMContentLoaded', function() {
    
    // 실시간 팝업 알림
    const popupMessages = [
        { location: '서울 강남구', name: '김**', service: '소액결제', amount: '50만원' },
        { location: '경기 수원시', name: '이**', service: '신용카드', amount: '100만원' },
        { location: '부산 해운대', name: '박**', service: '상품권', amount: '30만원' },
        { location: '대전 서구', name: '최**', service: '소액결제', amount: '70만원' },
        { location: '인천 남동구', name: '정**', service: '신용카드', amount: '200만원' }
    ];

    function showPopup() {
        const popup = document.getElementById('livePopup');
        const randomMsg = popupMessages[Math.floor(Math.random() * popupMessages.length)];
        
        if (popup) {
            const textElement = popup.querySelector('.live-popup-text');
            textElement.innerHTML = `${randomMsg.location} ${randomMsg.name} 님<br>${randomMsg.service} ${randomMsg.amount} 입금 완료!`;
            
            popup.style.display = 'block';
            
            setTimeout(() => {
                popup.style.display = 'none';
            }, 4000);
        }
    }

    // 3초 후 첫 팝업, 이후 10초마다
    setTimeout(showPopup, 3000);
    setInterval(showPopup, 10000);
    
    // 실시간 카운터 업데이트 (더 활발하게)
    function updateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        // 오늘 이용고객 (계속 증가)
        if (statNumbers[0]) {
            let count = 152;
            setInterval(() => {
                count += Math.floor(Math.random() * 3) + 1;
                statNumbers[0].textContent = count;
                statNumbers[0].style.transform = 'scale(1.1)';
                setTimeout(() => {
                    statNumbers[0].style.transform = 'scale(1)';
                }, 200);
            }, 4000);
        }
        
        // 현재 상담중 (변동)
        if (statNumbers[1]) {
            setInterval(() => {
                let current = parseInt(statNumbers[1].textContent);
                current = current + Math.floor(Math.random() * 7) - 3;
                current = Math.max(25, Math.min(55, current));
                statNumbers[1].textContent = current;
            }, 2500);
        }
        
        // 거래금액 (증가)
        if (statNumbers[2]) {
            let amount = 4.2;
            setInterval(() => {
                amount += (Math.random() * 0.2);
                statNumbers[2].textContent = amount.toFixed(1) + '억';
                statNumbers[2].style.color = '#00B67A';
                setTimeout(() => {
                    statNumbers[2].style.color = '';
                }, 500);
            }, 6000);
        }
    }
    
    updateCounters();
    
    // 긴급 배너 텍스트 변경
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
            urgentBanner.style.opacity = '0';
            setTimeout(() => {
                urgentBanner.textContent = urgentTexts[textIndex];
                urgentBanner.style.opacity = '1';
            }, 300);
        }, 5000);
    }
    
    // FAQ 기능
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            item.classList.toggle('active');
            
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    
    // 부드러운 스크롤
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 스크롤 시 헤더 효과
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            header.style.background = 'rgba(255,255,255,0.98)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            header.style.background = 'white';
        }
    });
    
    // 서비스 카드 순차 애니메이션
    const cards = document.querySelectorAll('.service-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // 메인 수수료 강조 애니메이션
    const rateValues = document.querySelectorAll('.rate-value');
    rateValues.forEach((rate, index) => {
        setInterval(() => {
            rate.style.transform = 'scale(1.1)';
            rate.style.textShadow = '0 0 20px rgba(30, 94, 255, 0.5)';
            setTimeout(() => {
                rate.style.transform = 'scale(1)';
                rate.style.textShadow = 'none';
            }, 500);
        }, 3000 + (index * 1000));
    });
    
});