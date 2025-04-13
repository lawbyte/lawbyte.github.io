document.addEventListener('DOMContentLoaded', function() {
    // Panel navigation
    let currentPanel = 1;
    const totalPanels = 5;
    const panels = document.querySelectorAll('.panel');
    const dots = document.querySelectorAll('.panel-dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Initialize first panel as active
    panels[0].classList.add('active');
    
    // Show panel function with animation
    function showPanel(panelNumber, direction = 'next') {
        if (panelNumber === currentPanel) return;
        
        // Get current and next panel
        const currentPanelElement = document.getElementById(`panel${currentPanel}`);
        const nextPanelElement = document.getElementById(`panel${panelNumber}`);
        
        // Set initial positions for animation
        gsap.set(nextPanelElement, { 
            x: direction === 'next' ? '100%' : '-100%',
            opacity: 0,
            display: 'flex'
        });
        
        // Animate out current panel
        gsap.to(currentPanelElement, {
            x: direction === 'next' ? '-100%' : '100%',
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut'
        });
        
        // Animate in next panel
        gsap.to(nextPanelElement, {
            x: '0%',
            opacity: 1,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
                // Update classes
                panels.forEach(p => {
                    p.classList.remove('active');
                    gsap.set(p, { display: 'none' });
                });
                nextPanelElement.classList.add('active');
                gsap.set(nextPanelElement, { display: 'flex' });
            }
        });
        
        // Update dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        dots[panelNumber - 1].classList.add('active');
        
        // Update current panel
        currentPanel = panelNumber;
        
        // Enable/disable navigation buttons
        prevBtn.style.opacity = currentPanel === 1 ? '0.5' : '1';
        prevBtn.style.pointerEvents = currentPanel === 1 ? 'none' : 'auto';
        
        nextBtn.style.opacity = currentPanel === totalPanels ? '0.5' : '1';
        nextBtn.style.pointerEvents = currentPanel === totalPanels ? 'none' : 'auto';
    }
    
    // Add panel navigation event listeners
    prevBtn.addEventListener('click', () => {
        if (currentPanel > 1) {
            showPanel(currentPanel - 1, 'prev');
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPanel < totalPanels) {
            showPanel(currentPanel + 1, 'next');
        }
    });
    
    // Add dot navigation event listeners
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const panelNumber = parseInt(dot.getAttribute('data-panel'));
            const direction = panelNumber > currentPanel ? 'next' : 'prev';
            showPanel(panelNumber, direction);
        });
    });
    
    // Enable swipe navigation for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next panel
            if (currentPanel < totalPanels) {
                showPanel(currentPanel + 1, 'next');
            }
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous panel
            if (currentPanel > 1) {
                showPanel(currentPanel - 1, 'prev');
            }
        }
    }
    
    // Initialize panel display
    panels.forEach((panel, index) => {
        if (index !== 0) {
            gsap.set(panel, { display: 'none' });
        }
    });
    
    // Animate messages one after another (for the first panel)
    const messages = document.querySelectorAll('#panel1 .message');
    let delay = 1000;
    
    messages.forEach((message, index) => {
        if (index === 0) return; // Skip the first message as it's already visible
        
        setTimeout(() => {
            message.classList.remove('hidden');
            gsap.from(message, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out"
            });
        }, delay);
        
        delay += 2000; // Show next message after 2 seconds
    });
    
    // Add hover effects to promises
    const promises = document.querySelectorAll('.promise');
    promises.forEach(promise => {
        promise.addEventListener('mouseenter', () => {
            gsap.to(promise, {
                scale: 1.05,
                duration: 0.3,
                backgroundColor: '#ff69b4',
                color: 'white'
            });
        });
        
        promise.addEventListener('mouseleave', () => {
            gsap.to(promise, {
                scale: 1,
                duration: 0.3,
                backgroundColor: '#ffd1dc',
                color: '#333'
            });
        });
        
        promise.addEventListener('click', () => {
            gsap.to(promise, {
                scale: [1, 1.2, 1],
                rotation: [0, 5, -5, 0],
                duration: 0.5
            });
        });
    });
    
    // Interactive reasons and memories
    const interactiveElements = document.querySelectorAll('.reason, .memory');
    interactiveElements.forEach(element => {
        element.addEventListener('click', () => {
            gsap.to(element, {
                scale: [1, 1.2, 1],
                rotation: [0, 5, -5, 0],
                duration: 0.5,
                backgroundColor: '#ff1493',
                color: 'white'
            });
            
            setTimeout(() => {
                gsap.to(element, {
                    backgroundColor: '#ffc0cb',
                    color: '#333',
                    duration: 0.5
                });
            }, 1000);
        });
    });
    
    // Generate hearts button
    const generateHeartsBtn = document.getElementById('generate-hearts');
    generateHeartsBtn.addEventListener('click', function() {
        createFallingHearts(100); // Create 100 falling hearts
    });
    
    // Function to create falling hearts with gravity effect
    function createFallingHearts(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                createFallingHeart();
            }, i * 50); // Stagger the creation
        }
    }
    
    function createFallingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        
        // Random position, size and rotation
        const size = Math.random() * 30 + 10; // 10-40px size
        const left = Math.random() * window.innerWidth;
        const rotation = Math.random() * 360;
        const duration = Math.random() * 4 + 3; // 3-7 seconds to fall
        const delay = Math.random() * 0.5;
        
        // Set the heart properties
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${left}px`;
        heart.style.top = `-${size * 2}px`; // Start above the viewport
        heart.style.transform = `rotate(${rotation}deg)`;
        
        // Create the heart shape using pseudo-elements
        const style = document.createElement('style');
        style.innerHTML = `
            .falling-heart:before, .falling-heart:after {
                width: ${size}px;
                height: ${size}px;
            }
            .falling-heart:before {
                top: -${size/2}px;
                left: 0;
            }
            .falling-heart:after {
                left: ${size/2}px;
                top: 0;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(heart);
        
        // Apply gravity animation with GSAP
        gsap.to(heart, {
            y: window.innerHeight + size * 2, // Move beyond viewport
            x: `+=${(Math.random() - 0.5) * 200}`, // Random horizontal movement
            rotation: `+=${Math.random() * 360 - 180}`, // Random rotation
            duration: duration,
            delay: delay,
            ease: "power1.in", // Ease-in for gravity effect
            onComplete: () => {
                heart.remove();
                style.remove();
            }
        });
    }
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        
        // Random position, size and delay
        const size = Math.random() * 20 + 10;
        const left = Math.random() * window.innerWidth;
        const animDuration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${left}px`;
        heart.style.top = `${window.innerHeight}px`;
        heart.style.animationDuration = `${animDuration}s`;
        heart.style.animationDelay = `${delay}s`;
        
        document.body.appendChild(heart);
        
        // Remove the heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, (animDuration + delay) * 1000);
        
        // Create the pseudo-elements with the same size
        const style = document.createElement('style');
        style.innerHTML = `
            .floating-heart:before, .floating-heart:after {
                width: ${size}px;
                height: ${size}px;
            }
            .floating-heart:before {
                top: -${size/2}px;
            }
            .floating-heart:after {
                left: ${size/2}px;
            }
        `;
        document.head.appendChild(style);
        
        // Animate the heart floating up
        gsap.to(heart, {
            y: -window.innerHeight - 100,
            duration: animDuration,
            delay: delay,
            ease: "power1.out"
        });
    }
    
    // Moving "No" button
    const noBtn = document.getElementById('no-btn');
    noBtn.addEventListener('mouseover', () => {
        // Move the button to a random position
        const x = Math.random() * (window.innerWidth - 200);
        const y = Math.random() * (window.innerHeight - 100);
        
        gsap.to(noBtn, {
            left: `${x}px`,
            top: `${y}px`,
            position: 'fixed',
            duration: 0.3
        });
    });
    
    // For mobile touch on the no button
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        // Move the button to a random position
        const x = Math.random() * (window.innerWidth - 200);
        const y = Math.random() * (window.innerHeight - 100);
        
        gsap.to(noBtn, {
            left: `${x}px`,
            top: `${y}px`,
            position: 'fixed',
            duration: 0.3
        });
    });
    
    // Yes button action
    const yesBtn = document.getElementById('yes-btn');
    const thankYouDiv = document.getElementById('thank-you');
    
    yesBtn.addEventListener('click', () => {
        // Hide buttons and show thank you message
        gsap.to('.buttons', {
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => {
                document.querySelector('.buttons').style.display = 'none';
                thankYouDiv.classList.remove('hidden');
                gsap.from(thankYouDiv, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5
                });
                
                // Create celebration with falling hearts
                createCelebration();
                createFallingHearts(200); // Create 200 falling hearts
            }
        });
    });
    
    function createCelebration() {
        // Create many hearts as celebration
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createHeart();
            }, i * 100);
        }
        
        // Add confetti animation
        const celebrationDiv = document.querySelector('.celebration');
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = getRandomColor();
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.left = `${Math.random() * celebrationDiv.offsetWidth}px`;
            confetti.style.top = '0';
            
            celebrationDiv.appendChild(confetti);
            
            gsap.to(confetti, {
                y: celebrationDiv.offsetHeight,
                x: `+=${(Math.random() - 0.5) * 200}`,
                rotation: Math.random() * 360,
                duration: Math.random() * 2 + 1,
                ease: "power1.out",
                onComplete: () => {
                    confetti.remove();
                }
            });
        }
    }
    
    function getRandomColor() {
        const colors = ['#ff69b4', '#ffb6c1', '#ffc0cb', '#ff1493', '#db7093'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Create initial floating hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 300);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
            if (currentPanel < totalPanels) {
                showPanel(currentPanel + 1, 'next');
            }
        } else if (e.key === 'ArrowLeft') {
            if (currentPanel > 1) {
                showPanel(currentPanel - 1, 'prev');
            }
        }
    });
}); 
