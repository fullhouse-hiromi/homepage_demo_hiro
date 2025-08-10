// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    
    // ページトップボタンの制御
    const pageTopButton = document.getElementById('page-top');
    
    // スクロール時の処理
    window.addEventListener('scroll', function() {
        // ページトップボタンの表示/非表示
        if (window.scrollY > 300) {
            pageTopButton.classList.add('show');
        } else {
            pageTopButton.classList.remove('show');
        }
        
        // フェードインアニメーション
        handleScrollAnimation();
    });
    
    // ページトップボタンのクリック処理
    pageTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ハンバーガーメニューの制御
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        
        // ハンバーガーアイコンのアニメーション
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // ナビゲーションリンクのスムーススクロール
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // モバイルメニューを閉じる
                if (nav.classList.contains('active')) {
                    hamburger.click();
                }
            }
        });
    });
    
    // フェードインアニメーション
    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.strength-item, .company-table, .contact-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                element.classList.add('fade-in', 'show');
            }
        });
    }
    
    // 初期アニメーション設定
    const animationElements = document.querySelectorAll('.strength-item, .company-table, .contact-item');
    animationElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // 電話番号リンクの処理（モバイル向け）
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // アナリティクス用のトラッキングなどをここに追加可能
            console.log('電話番号がクリックされました:', this.href);
        });
    });
    
    // サービスアイテムのホバーエフェクト強化
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // 強みアイテムのホバーエフェクト強化
    const strengthItems = document.querySelectorAll('.strength-item');
    strengthItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'none';
        });
    });
    
    // レスポンシブ対応：ウィンドウサイズ変更時の処理
    window.addEventListener('resize', function() {
        // モバイルからデスクトップに変更時にメニューを閉じる
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            hamburger.click();
        }
    });
    
    // 初期ロード時のアニメーション
    setTimeout(function() {
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateX(-30px)';
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(function() {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateX(0)';
            }, 200);
        }
        
        if (heroImage) {
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'translateX(30px)';
            heroImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(function() {
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateX(0)';
            }, 400);
        }
    }, 100);
});

// CSS追加（モバイルナビゲーション用）
const mobileNavCSS = `
    @media (max-width: 768px) {
        .nav {
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            background-color: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
        }
        
        .nav.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-list {
            flex-direction: column;
            padding: 20px;
            gap: 0;
        }
        
        .nav-list li {
            border-bottom: 1px solid #E8E8E8;
        }
        
        .nav-list li:last-child {
            border-bottom: none;
        }
        
        .nav-list a {
            display: block;
            padding: 15px 0;
            font-size: 16px;
        }
    }
`;

// CSS を動的に追加
const style = document.createElement('style');
style.textContent = mobileNavCSS;
document.head.appendChild(style);
