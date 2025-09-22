window.addEventListener('load', function() {
  // For demo purposes, add a slight delay (remove in production for immediate load)
  setTimeout(function() {
    hidePreloader();
  }, 0);
});

function hidePreloader() {
  const preloader = document.getElementById('preloader');
  const content = document.getElementById('content');
  
  // Fade out preloader
  preloader.style.opacity = '0';
  
  // After fade transition, hide preloader and show content
  setTimeout(function() {
    preloader.style.display = 'none';
    content.style.display = 'block';
  }, 500);
}
// Wait for the document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
  // MENU BUTTON TOGGLE
  const menuButton = document.querySelector('.menu-button');
  const overlay = document.querySelector('.overlay');
  const closeButton = document.querySelector('.overlay .close');
  const overlayLinks = document.querySelectorAll('.overlay__content a');

  menuButton.addEventListener('click', function() {
    overlay.classList.add('overlay--active');
    document.body.style.overflow = 'hidden';
  });

  closeButton.addEventListener('click', function() {
    overlay.classList.remove('overlay--active');
    document.body.style.overflow = '';
  });

  overlayLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      overlay.classList.remove('overlay--active');
      document.body.style.overflow = '';
    });
  });

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      overlay.classList.remove('overlay--active');
      document.body.style.overflow = '';
    }
  });

  // SCROLL ANIMATION
  const scrollElements = document.querySelectorAll('.feature-card');
  const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100))
    );
  };
  const displayScrollElement = (el) => {
    el.classList.add('scrolled');
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
  };
  const hideScrollElement = (el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
  };
  scrollElements.forEach(hideScrollElement);
  const handleScrollAnimation = () => {
    scrollElements.forEach(el => {
      if (elementInView(el, 80)) {
        displayScrollElement(el);
      }
    });
  };
  setTimeout(handleScrollAnimation, 100);
  window.addEventListener('scroll', handleScrollAnimation);

  // EARLY ACCESS FORM
  window.submitEarlyAccess = function(e) {
    e.preventDefault();
    const email = document.getElementById('earlyEmail').value;
    if (email) {
      alert("Thank you! You've been added to the early access list.");
      document.getElementById('earlyEmail').value = '';
    }
    return false;
  }

  // TAB SWITCHING
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      const target = this.getAttribute('data-tab');
      document.getElementById(`${target}-content`).classList.add('active');
    });
  });

  // FAQ ACCORDION FIXED
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', function (event) {
      if (event.target.closest('.faq-question')) {
        const isActive = this.classList.contains('active');
        faqItems.forEach(other => {
          if (other !== this) {
            other.classList.remove('active');
            const otherAnswer = other.querySelector('.faq-answer');
            if (otherAnswer) {
              otherAnswer.style.height = '0';
            }
          }
        });
        const answer = this.querySelector('.faq-answer');
        if (isActive) {
          this.classList.remove('active');
          answer.style.height = '0';
        } else {
          this.classList.add('active');
          answer.style.height = 'auto';
          const height = answer.scrollHeight;
          answer.style.height = '0';
          void answer.offsetWidth;
          answer.style.height = height + 'px';
          setTimeout(() => {
            answer.style.height = 'auto';
          }, 300);
        }
      }
    });
  });

  // TESTIMONIALS NAV
  const slider = document.querySelector('.testimonials-slider');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const cards = document.querySelectorAll('.testimonial-card');
  let currentIndex = 0;

  function showSlide(index) {
    const scrollAmount = cards[0].offsetWidth + 20;
    slider.scrollTo({ left: index * scrollAmount, behavior: 'smooth' });
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
    currentIndex = index;
  }

  if (nextBtn) nextBtn.addEventListener('click', () => showSlide((currentIndex + 1) % cards.length));
  if (prevBtn) prevBtn.addEventListener('click', () => showSlide((currentIndex - 1 + cards.length) % cards.length));
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
  showSlide(0);
});

document.addEventListener('DOMContentLoaded', function() {
  const heroElements = document.querySelectorAll('.hero > *');
  heroElements.forEach((el, index) => {
    el.style.setProperty('--child-index', index);
  });
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbzHnXAcHiWY8IRS9wr6bHWAQOm8GWHqW0Mjyu03qQQ5yjfjTshsiB8VZ0BTH2ZDqMwiAQ/exec'

// Contact form handler
const contactForm = document.forms['contact-form']
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault()
        const submitBtn = document.getElementById('submit')

        // Show loading state
        const originalText = submitBtn.textContent
        submitBtn.textContent = 'Sending...'
        submitBtn.disabled = true

        // Build form data and add formType
        const formData = new FormData(contactForm)
        formData.append('formType', 'contact')

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    alert("Thank you! Your message has been sent successfully!")
                    contactForm.reset()
                } else {
                    throw new Error('Form submission failed')
                }
            })
            .catch(error => {
                console.error('Error:', error)
                alert("Sorry, there was an error submitting the form. Please try again.")
            })
            .finally(() => {
                submitBtn.textContent = originalText
                submitBtn.disabled = false
            })
    })
}

// Newsletter form handler
const newsletterForm = document.forms['newsletter-form']
if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
        e.preventDefault()
        const submitBtn = newsletterForm.querySelector('button[type="submit"]')

        // Show loading state
        const originalText = submitBtn.textContent
        submitBtn.textContent = 'Joining...'
        submitBtn.disabled = true

        // Build form data and add formType
        const formData = new FormData(newsletterForm)
        formData.append('formType', 'newsletter')

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    alert("Welcome! You've successfully joined our early access list!")
                    newsletterForm.reset()
                } else {
                    throw new Error('Form submission failed')
                }
            })
            .catch(error => {
                console.error('Error:', error)
                alert("Sorry, there was an error signing you up. Please try again.")
            })
            .finally(() => {
                submitBtn.textContent = originalText
                submitBtn.disabled = false
            })
    })
}



