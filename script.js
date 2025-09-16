// script.js - 깔끔한 인터랙션만

// 스크롤 시 헤더 스타일 변경
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 스크롤 애니메이션 (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 애니메이션 적용할 요소들
document.querySelectorAll('.feature-card, .rate-card, .review-card, .process-step').forEach(el => {
    observer.observe(el);
});

// 현재 시간 업데이트 (환율 섹션)
function updateTime() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    const timeString = now.toLocaleDateString('ko-KR', options);
    
    const subtitle = document.querySelector('.rates .section-subtitle');
    if (subtitle) {
        subtitle.textContent = timeString + ' 기준';
    }
}

// 페이지 로드 시 시간 업데이트
document.addEventListener('DOMContentLoaded', updateTime);

// 모바일 메뉴 토글 (필요시)
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        document.querySelector('.nav-menu').classList.toggle('active');
    });
}

console.log('바른상품권 - 투명하고 신뢰할 수 있는 서비스');