// Wait for the document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Get the elements
    const menuButton = document.querySelector('.menu-button'); // The menu button
    const overlay = document.querySelector('.overlay'); // The overlay menu
    const closeButton = document.querySelector('.overlay .close'); // The close button
    const overlayLinks = document.querySelectorAll('.overlay__content a'); // All links in the overlay
  
    // Toggle the overlay when the menu button is clicked
    menuButton.addEventListener('click', function() {
      overlay.classList.add('overlay--active'); // Show the overlay by adding the active class
      document.body.style.overflow = 'hidden'; // Prevent scrolling when overlay is open
    });
  
    // Close the overlay when the close button is clicked
    closeButton.addEventListener('click', function() {
      overlay.classList.remove('overlay--active'); // Hide the overlay by removing the active class
      document.body.style.overflow = ''; // Re-enable scrolling
    });
  
    // Close the overlay when any navigation link is clicked
    overlayLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        overlay.classList.remove('overlay--active');
        document.body.style.overflow = '';
      });
    });
  
    // Close the overlay if someone clicks outside the menu (on the overlay background)
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) { // Only close if the background overlay (not the content) is clicked
        overlay.classList.remove('overlay--active');
        document.body.style.overflow = '';
      }
    });
  
    // Add scroll animation for smoother experience
    const scrollElements = document.querySelectorAll('.feature-card');
    
    const elementInView = (el, percentageScroll = 100) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop <= 
        ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
      );
    };
    
    const displayScrollElement = (element) => {
      element.classList.add('scrolled');
      element.style.opacity = 1;
      element.style.transform = 'translateY(0)';
    };
    
    const hideScrollElement = (element) => {
      element.style.opacity = 0;
      element.style.transform = 'translateY(20px)';
    };
    
    scrollElements.forEach((el) => {
      hideScrollElement(el);
    });
    
    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el, 80)) {
          displayScrollElement(el);
        }
      });
    };
    
    // Initialize on page load
    setTimeout(handleScrollAnimation, 100);
    
    // Listen for scroll events
    window.addEventListener('scroll', () => {
      handleScrollAnimation();
    });
  });

  function submitEarlyAccess(e) {
    e.preventDefault();
    const email = document.getElementById('earlyEmail').value;
    if (email) {
      alert("Thank you! You've been added to the early access list.");
      document.getElementById('earlyEmail').value = '';
    }
    return false;
  }

  // === Tab Switching (App Features Showcase) ===
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
  
    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        // Remove active classes
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
  
        // Add active to clicked tab and corresponding content
        this.classList.add('active');
        const target = this.getAttribute('data-tab');
        document.getElementById(`${target}-content`).classList.add('active');
      });
    });
  
    // === FAQ Accordion ===
    const faqItems = document.querySelectorAll('.faq-item');
  
    faqItems.forEach(item => {
      item.addEventListener('click', function () {
        this.classList.toggle('active');
      });
    });
  
    // === Testimonials Navigation ===
    const slider = document.querySelector('.testimonials-slider');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
  
    let currentIndex = 0;
    const cards = document.querySelectorAll('.testimonial-card');
  
    function showSlide(index) {
      const scrollAmount = cards[0].offsetWidth + 20; // card width + gap
      slider.scrollTo({ left: index * scrollAmount, behavior: 'smooth' });
  
      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
      currentIndex = index;
    }
  
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        let nextIndex = (currentIndex + 1) % cards.length;
        showSlide(nextIndex);
      });
    }
  
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        let prevIndex = (currentIndex - 1 + cards.length) % cards.length;
        showSlide(prevIndex);
      });
    }
  
    if (dots.length > 0) {
      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          showSlide(i);
        });
      });
    }
  
    // Initialize first slide
    showSlide(0);
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    // Get all FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Add click event to each FAQ item (including the entire question area)
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      // Use the entire question container as the click target
      question.addEventListener('click', function(event) {
        // Toggle the active class on the FAQ item
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            
            // Reset height on answer for closing animation
            const otherAnswer = otherItem.querySelector('.faq-answer');
            otherAnswer.style.height = '0';
          }
        });
        
        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          const answer = item.querySelector('.faq-answer');
          answer.style.height = '0';
        } else {
          item.classList.add('active');
          const answer = item.querySelector('.faq-answer');
          
          // Get actual height for smooth animation
          answer.style.height = 'auto';
          const height = answer.scrollHeight;
          answer.style.height = '0';
          
          // Trigger reflow
          void answer.offsetWidth;
          
          // Set the actual height for smooth animation
          answer.style.height = height + 'px';
          
          // Once animation completes, set to auto for responsive behavior
          setTimeout(() => {
            answer.style.height = 'auto';
          }, 300);
        }
      });
    });
  });