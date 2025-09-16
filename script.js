// script.js - 바른상품권 JavaScript

// 실시간 알림 데이터
const notifications = [
    "서울 강남구 김*님이 백화점상품권 100만원 현금화 완료",
    "경기 수원시 박*님이 문화상품권 50만원 현금화 완료",
    "부산 해운대구 이*님이 해피머니 30만원 현금화 완료",
    "인천 남동구 최*님이 구글기프트 20만원 현금화 완료",
    "대전 서구 정*님이 컬쳐랜드 40만원 현금화 완료",
    "광주 북구 강*님이 백화점상품권 200만원 현금화 완료",
    "서울 송파구 윤*님이 문화상품권 70만원 현금화 완료",
    "경기 성남시 조*님이 해피머니 60만원 현금화 완료"
];

// 거래 데이터
const tradeTypes = ['백화점상품권', '문화상품권', '해피머니', '컬쳐랜드', '구글기프트'];
const cities = ['서울', '경기', '인천', '부산', '대구', '광주', '대전'];
const districts = ['강남구', '송파구', '서초구', '마포구', '성동구', '용산구'];

// 리뷰 데이터
const reviews = [
    {
        name: '김민수',
        rating: 5,
        text: '백화점 상품권 100만원 현금화했는데 정말 5분만에 입금되었습니다. 다른 업체보다 환율도 5% 더 높아서 만족스러웠어요.',
        date: '오늘',
        helpful: 234
    },
    {
        name: '이정희',
        rating: 5,
        text: '처음에는 걱정했는데 정말 안전하게 거래했어요. 문화상품권 50만원 현금화했는데 수수료도 적고 빠르게 처리해주셨습니다.',
        date: '어제',
        helpful: 156
    },
    {
        name: '박준영',
        rating: 5,
        text: '여러 업체 비교해봤는데 여기가 제일 환율이 높네요. 해피머니 30만원 현금화했는데 92% 환율 적용받았습니다.',
        date: '3일 전',
        helpful: 89
    }
];

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // 실시간 알림 시작
    startNotifications();
    
    // 카운터 업데이트 시작
    startCounterUpdates();
    
    // 실시간 거래 업데이트 시작
    startTradeUpdates();
    
    // 리뷰 렌더링
    renderReviews();
    
    // FAQ 이벤트 리스너
    setupFAQ();
    
    // 스크롤 애니메이션
    setupScrollAnimations();
    
    // 부드러운 스크롤
    setupSmoothScroll();
    
    // 상단 이동 버튼
    setupScrollToTop();
}

// 실시간 알림 표시
function startNotifications() {
    let notificationIndex = 0;
    
    function showNotification() {
        const notification = document.getElementById('liveNotification');
        const content = document.getElementById('notificationContent');
        
        if (notification && content) {
            notification.style.display = 'block';
            content.textContent = notifications[notificationIndex];
            
            notificationIndex = (notificationIndex + 1) % notifications.length;
            
            setTimeout(() => {
                notification.style.display = 'none';
            }, 5000);
        }
    }
    
    // 3초 후 첫 알림
    setTimeout(showNotification, 3000);
    
    // 10초마다 알림
    setInterval(showNotification, 10000);
}

// 카운터 업데이트
function startCounterUpdates() {
    setInterval(() => {
        updateCounters();
    }, 5000);
}

function updateCounters() {
    // 오늘 이용고객 증가
    const todayCount = document.getElementById('todayCount');
    if (todayCount) {
        const currentCount = parseInt(todayCount.textContent);
        if (Math.random() > 0.7) {
            todayCount.textContent = currentCount + 1;
        }
    }
    
    // 현재 상담중 변동
    const currentUsers = document.getElementById('currentUsers');
    if (currentUsers) {
        const current = parseInt(currentUsers.textContent);
        const change = Math.floor(Math.random() * 5) - 2;
        const newValue = Math.max(20, Math.min(60, current + change));
        currentUsers.textContent = newValue;
    }
    
    // 거래금액 증가
    const totalAmount = document.getElementById('totalAmount');
    if (totalAmount) {
        const amount = parseFloat(totalAmount.textContent);
        const increase = (Math.random() * 0.3).toFixed(1);
        totalAmount.textContent = (amount + parseFloat(increase)).toFixed(1);
    }
    
    // 잔여 슬롯 감소
    const slots = document.getElementById('remainingSlots');
    if (slots) {
        const remaining = parseInt(slots.textContent);
        if (remaining > 5 && Math.random() > 0.8) {
            slots.textContent = remaining - 1;
        }
    }
}

// 실시간 거래 업데이트
function startTradeUpdates() {
    // 초기 거래 목록 생성
    generateInitialTrades();
    
    // 8초마다 새 거래 추가
    setInterval(() => {
        addNewTrade();
    }, 8000);
}

function generateInitialTrades() {
    const tradeList = document.getElementById('tradeList');
    if (!tradeList) return;
    
    for (let i = 0; i < 3; i++) {
        const trade = generateTrade();
        const tradeItem = createTradeElement(trade, i + '분 전');
        tradeList.appendChild(tradeItem);
    }
}

function generateTrade() {
    const type = tradeTypes[Math.floor(Math.random() * tradeTypes.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const district = districts[Math.floor(Math.random() * districts.length)];
    const amount = (Math.floor(Math.random() * 20) + 1) * 50000;
    const name = String.fromCharCode(Math.floor(Math.random() * 26) + 65) + '**님';
    
    return {
        type: type,
        location: `${city} ${district} ${name}`,
        amount: amount.toLocaleString() + '원'
    };
}

function createTradeElement(trade, time) {
    const tradeItem = document.createElement('div');
    tradeItem.className = 'trade-item';
    tradeItem.innerHTML = `
        <div class="trade-info">
            <div class="trade-type">${trade.type}</div>
            <div class="trade-details">${trade.location}</div>
        </div>
        <div>
            <div class="trade-amount">${trade.amount}</div>
            <div class="trade-time">${time}</div>
        </div>
    `;
    return tradeItem;
}

function addNewTrade() {
    const tradeList = document.getElementById('tradeList');
    if (!tradeList) return;
    
    const newTrade = generateTrade();
    const tradeItem = createTradeElement(newTrade, '방금 전');
    
    // 기존 거래 시간 업데이트
    const existingTrades = tradeList.querySelectorAll('.trade-item');
    existingTrades.forEach((trade, index) => {
        const timeEl = trade.querySelector('.trade-time');
        if (timeEl) {
            if (index === 0) timeEl.textContent = '1분 전';
            else if (index === 1) timeEl.textContent = '2분 전';
            else if (index === 2) timeEl.textContent = '3분 전';
        }
    });
    
    // 새 거래 추가
    tradeList.insertBefore(tradeItem, tradeList.firstChild);
    
    // 오래된 거래 제거 (최대 5개 유지)
    if (existingTrades.length >= 5) {
        tradeList.removeChild(existingTrades[existingTrades.length - 1]);
    }
}

// 리뷰 렌더링
function renderReviews() {
    const reviewsGrid = document.getElementById('reviewsGrid');
    if (!reviewsGrid) return;
    
    reviews.forEach(review => {
        const reviewCard = createReviewCard(review);
        reviewsGrid.appendChild(reviewCard);
    });
}

function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.style = `
        background: white;
        padding: 25px;
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.08);
        position: relative;
    `;
    
    const stars = '⭐'.repeat(review.rating);
    const initial = review.name.charAt(0) + '○○';
    
    card.innerHTML = `
        <span style="position: absolute; top: 15px; right: 15px; background: #00C853; color: white; padding: 3px 10px; border-radius: 15px; font-size: 12px;">
            ✓ 인증됨
        </span>
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
            <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #0052CC, #4A90E2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                ${initial}
            </div>
            <div>
                <div style="font-weight: bold; color: #003C8F;">${review.name}님</div>
                <div style="font-size: 14px; color: #666;">
                    <span style="color: #FFD700;">${stars}</span>
                    <span style="margin-left: 10px;">${review.date}</span>
                </div>
            </div>
        </div>
        <div style="color: #333; line-height: 1.6; margin-bottom: 15px;">
            ${review.text}
        </div>
        <div style="display: flex; align-items: center; gap: 15px; padding-top: 15px; border-top: 1px solid #EEE;">
            <span style="color: #666; font-size: 14px; cursor: pointer;">👍 도움됨 (${review.helpful})</span>
        </div>
    `;
    
    return card;
}

// FAQ 설정
function setupFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
                
                // 다른 FAQ 닫기
                document.querySelectorAll('.faq-item').forEach(other => {
                    if (other !== item) {
                        other.classList.remove('active');
                    }
                });
            });
        }
    });
}

// 스크롤 애니메이션
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 섹션별 애니메이션 적용
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
}

// 부드러운 스크롤
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 상단 이동 버튼
function setupScrollToTop() {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const topButton = document.querySelector('.btn-float-top');
        
        if (topButton) {
            if (scrollTop > 500) {
                topButton.style.opacity = '1';
                topButton.style.visibility = 'visible';
            } else {
                topButton.style.opacity = '0';
                topButton.style.visibility = 'hidden';
            }
        }
    });
}

// 성능 최적화: 쓰로틀링
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 스크롤 이벤트 최적화
window.addEventListener('scroll', throttle(() => {
    // 스크롤 관련 작업
}, 100));

console.log('바른상품권 - 안전하고 빠른 상품권 현금화 서비스');