/**
 * ==========================================================================
 * UFood Marketing Analysis - Main JavaScript
 * Interactive features and enhancements
 * ==========================================================================
 */

(function() {
  'use strict';

  // ==========================================================================
  // DOM Ready Handler
  // ==========================================================================
  
  document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initReadingProgress();
    initBackToTop();
    initScrollAnimations();
    initTableOfContents();
    initCodeCopyButtons();
    initNumberCounters();
    initSmoothScroll();
    injectUIElements();
    enhanceJupyterCells();
    initKeyboardShortcuts();
    
    // Add loaded class for page transition
    document.body.classList.add('loaded');
  });

  // ==========================================================================
  // Theme Toggle (Dark/Light Mode)
  // ==========================================================================
  
  function initThemeToggle() {
    const savedTheme = localStorage.getItem('ufood-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update toggle button if it exists
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      updateThemeIcon(themeToggle, savedTheme);
      
      themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('ufood-theme', newTheme);
        updateThemeIcon(this, newTheme);
        
        // Add transition class
        document.body.classList.add('theme-transitioning');
        setTimeout(() => {
          document.body.classList.remove('theme-transitioning');
        }, 300);
      });
    }
  }
  
  function updateThemeIcon(button, theme) {
    button.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    button.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }

  // ==========================================================================
  // Reading Progress Indicator
  // ==========================================================================
  
  function initReadingProgress() {
    const progressBar = document.querySelector('.reading-progress');
    if (!progressBar) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    });
    
    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = Math.min(progress, 100) + '%';
    }
  }

  // ==========================================================================
  // Back to Top Button
  // ==========================================================================
  
  function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // Scroll-Triggered Animations
  // ==========================================================================
  
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate, .jp-Cell');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Optional: unobserve after animation
            // observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      animatedElements.forEach(function(el) {
        observer.observe(el);
      });
    } else {
      // Fallback for older browsers
      animatedElements.forEach(function(el) {
        el.classList.add('in-view');
      });
    }
  }

  // ==========================================================================
  // Table of Contents Generator
  // ==========================================================================
  
  function initTableOfContents() {
    const tocSidebar = document.querySelector('.toc-sidebar');
    if (!tocSidebar) return;
    
    const headings = document.querySelectorAll('h1[id], h2[id], h3[id]');
    const tocList = tocSidebar.querySelector('.toc-list');
    
    if (!tocList || headings.length === 0) return;
    
    headings.forEach(function(heading, index) {
      const li = document.createElement('li');
      li.className = 'toc-item';
      
      const a = document.createElement('a');
      a.className = 'toc-link';
      a.href = '#' + heading.id;
      a.innerHTML = `
        <span class="toc-indicator"></span>
        <span class="toc-text">${heading.textContent.replace('¶', '').trim()}</span>
      `;
      
      li.appendChild(a);
      tocList.appendChild(li);
    });
    
    // Update active state on scroll
    const tocLinks = tocList.querySelectorAll('.toc-link');
    
    window.addEventListener('scroll', debounce(function() {
      let currentSection = '';
      
      headings.forEach(function(heading) {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 150) {
          currentSection = heading.id;
        }
      });
      
      tocLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
          link.classList.add('active');
        }
      });
    }, 50));
  }

  // ==========================================================================
  // Code Copy Buttons
  // ==========================================================================
  
  function initCodeCopyButtons() {
    const codeBlocks = document.querySelectorAll('.highlight pre, .jp-CodeCell .jp-Editor');
    
    codeBlocks.forEach(function(block) {
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      wrapper.style.position = 'relative';
      
      const button = document.createElement('button');
      button.className = 'copy-code-btn';
      button.innerHTML = '📋';
      button.setAttribute('aria-label', 'Copy code');
      button.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 6px 10px;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.2s, background 0.2s;
        z-index: 10;
        font-size: 14px;
      `;
      
      wrapper.addEventListener('mouseenter', function() {
        button.style.opacity = '1';
      });
      
      wrapper.addEventListener('mouseleave', function() {
        button.style.opacity = '0';
      });
      
      button.addEventListener('click', function() {
        const code = block.textContent;
        navigator.clipboard.writeText(code).then(function() {
          button.innerHTML = '✅';
          setTimeout(function() {
            button.innerHTML = '📋';
          }, 2000);
        }).catch(function() {
          button.innerHTML = '❌';
        });
      });
      
      // Wrap the block
      if (block.parentNode) {
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        wrapper.appendChild(button);
      }
    });
  }

  // ==========================================================================
  // Animated Number Counters
  // ==========================================================================
  
  function initNumberCounters() {
    const counters = document.querySelectorAll('.counter, .stat-value, .metric-value');
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(function(counter) {
      observer.observe(counter);
    });
  }
  
  function animateCounter(element) {
    const text = element.textContent;
    const match = text.match(/[\d,]+\.?\d*/);
    
    if (!match) return;
    
    const target = parseFloat(match[0].replace(/,/g, ''));
    const prefix = text.substring(0, text.indexOf(match[0]));
    const suffix = text.substring(text.indexOf(match[0]) + match[0].length);
    const decimals = (match[0].split('.')[1] || '').length;
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = target * easeOut;
      
      const formatted = current.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
      
      element.textContent = prefix + formatted + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    requestAnimationFrame(update);
  }

  // ==========================================================================
  // Smooth Scroll
  // ==========================================================================
  
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerOffset = 100;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ==========================================================================
  // Inject UI Elements
  // ==========================================================================
  
  function injectUIElements() {
    // Inject Skip Link for accessibility (must be first focusable element)
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Apply theme immediately
    const savedTheme = localStorage.getItem('ufood-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Inject Loading Overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading Analysis...</p>
    `;
    document.body.appendChild(loadingOverlay);
    
    // Remove loading overlay after page loads
    window.addEventListener('load', function() {
      setTimeout(() => {
        loadingOverlay.classList.add('loaded');
        setTimeout(() => loadingOverlay.remove(), 500);
      }, 300);
    });
    
    // Inject Header with Mobile Menu
    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `
      <div class="header-container">
        <a href="#" class="logo" style="text-decoration: none;">
          <span class="logo-icon">🍕</span>
          <span>UFood Analytics</span>
        </a>
        <nav class="desktop-nav">
          <ul class="nav-links">
            <li><a href="#UFood-Marketing-Data-Analysis-Project">Overview</a></li>
            <li><a href="#Dataset-Overview">Dataset</a></li>
            <li><a href="#Analysis-Structure">Analysis</a></li>
            <li><a href="#Summary-of-Findings-and-Next-Steps">Findings</a></li>
            <li><a href="#Conclusion:-Transforming-Data-into-Strategic-Action-for-UFood">Conclusion</a></li>
          </ul>
        </nav>
        <div class="header-actions">
          <button class="theme-toggle" aria-label="Toggle theme">${savedTheme === 'dark' ? '☀️' : '🌙'}</button>
          <button class="mobile-menu-toggle" aria-label="Toggle mobile menu" aria-expanded="false">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>
      </div>
      <nav class="mobile-nav" aria-hidden="true">
        <ul class="mobile-nav-links">
          <li><a href="#UFood-Marketing-Data-Analysis-Project">📊 Overview</a></li>
          <li><a href="#Dataset-Overview">📁 Dataset</a></li>
          <li><a href="#Analysis-Structure">🔬 Analysis</a></li>
          <li><a href="#Distribution-Analysis-of-Key-Variables">📈 Distributions</a></li>
          <li><a href="#Campaign-Performance-Analysis">🎯 Campaigns</a></li>
          <li><a href="#Customer-Segmentation-Analysis">👥 Segmentation</a></li>
          <li><a href="#Summary-of-Findings-and-Next-Steps">💡 Findings</a></li>
          <li><a href="#Conclusion:-Transforming-Data-into-Strategic-Action-for-UFood">✅ Conclusion</a></li>
        </ul>
      </nav>
    `;
    document.body.insertBefore(header, skipLink.nextSibling);
    
    // Mobile menu toggle functionality
    const mobileMenuToggle = header.querySelector('.mobile-menu-toggle');
    const mobileNav = header.querySelector('.mobile-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      this.classList.toggle('active');
      mobileNav.classList.toggle('open');
      mobileNav.setAttribute('aria-hidden', isExpanded);
      document.body.classList.toggle('mobile-menu-open');
    });
    
    // Close mobile menu when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('mobile-menu-open');
      });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Add id to main for skip link
    const main = document.querySelector('main');
    if (main) {
      main.id = 'main-content';
      main.setAttribute('tabindex', '-1');
      
      const hero = document.createElement('section');
      hero.className = 'hero-section';
      hero.innerHTML = `
        <div class="hero-background"></div>
        <div class="hero-grid"></div>
        <div class="hero-content">
          <div class="hero-badge">
            <span class="hero-badge-dot"></span>
            Data Analysis Project
          </div>
          <h1 class="hero-title">UFood Marketing<br>Data Analysis</h1>
          <p class="hero-subtitle">
            Comprehensive analysis of customer behavior and marketing campaign effectiveness 
            for Brazil's leading food delivery platform.
          </p>
          <div class="hero-stats">
            <div class="stat-card">
              <div class="stat-value counter">2,205</div>
              <div class="stat-label">Customers</div>
            </div>
            <div class="stat-card">
              <div class="stat-value counter">39</div>
              <div class="stat-label">Features</div>
            </div>
            <div class="stat-card">
              <div class="stat-value counter">6</div>
              <div class="stat-label">Campaigns</div>
            </div>
            <div class="stat-card">
              <div class="stat-value counter">3</div>
              <div class="stat-label">Segments</div>
            </div>
          </div>
        </div>
      `;
      // Insert hero BEFORE main, not inside it
      main.parentNode.insertBefore(hero, main);
    }
    
    // Inject Reading Progress Bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);
    
    // Inject Back to Top Button
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);
    
    // Inject Clean Sidebar Navigation
    const sidebar = document.createElement('aside');
    sidebar.className = 'nav-sidebar';
    sidebar.innerHTML = `
      <div class="sidebar-toggle" aria-label="Toggle sidebar">☰</div>
      <nav class="sidebar-nav">
        <div class="sidebar-title">Navigation</div>
        <ul class="sidebar-links">
          <li><a href="#UFood-Marketing-Data-Analysis-Project" data-section="overview">📊 Overview</a></li>
          <li><a href="#Dataset-Overview" data-section="dataset">📁 Dataset</a></li>
          <li><a href="#Analysis-Structure" data-section="analysis">🔬 Analysis</a></li>
          <li><a href="#Distribution-Analysis-of-Key-Variables" data-section="distribution">📈 Distributions</a></li>
          <li><a href="#Campaign-Performance-Analysis" data-section="campaign">🎯 Campaigns</a></li>
          <li><a href="#Customer-Segmentation-Analysis" data-section="segmentation">👥 Segmentation</a></li>
          <li><a href="#Summary-of-Findings-and-Next-Steps" data-section="findings">💡 Findings</a></li>
          <li><a href="#Conclusion:-Transforming-Data-into-Strategic-Action-for-UFood" data-section="conclusion">✅ Conclusion</a></li>
        </ul>
      </nav>
    `;
    document.body.appendChild(sidebar);
    
    // Sidebar toggle functionality
    const sidebarToggle = sidebar.querySelector('.sidebar-toggle');
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('expanded');
      this.textContent = sidebar.classList.contains('expanded') ? '✕' : '☰';
    });
    
    // Highlight current section in sidebar
    const sidebarLinks = sidebar.querySelectorAll('.sidebar-links a');
    const sections = [];
    sidebarLinks.forEach(link => {
      const id = link.getAttribute('href').substring(1);
      const el = document.getElementById(id);
      if (el) sections.push({ id, el, link });
    });
    
    function updateActiveSection() {
      const scrollPos = window.scrollY + 150;
      let current = sections[0];
      
      for (const section of sections) {
        if (section.el.offsetTop <= scrollPos) {
          current = section;
        }
      }
      
      sidebarLinks.forEach(link => link.classList.remove('active'));
      if (current) current.link.classList.add('active');
    }
    
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection();
    
    // Inject Footer AFTER main
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="footer-content">
        <div class="footer-logo">🍕 UFood Analytics</div>
        <p class="footer-text">
          Data analysis project exploring customer behavior and marketing effectiveness.<br>
          Built with Python, Pandas, and ❤️
        </p>
        <div class="footer-links">
          <a href="https://github.com/tzolkowski96" class="footer-link" target="_blank">GitHub</a>
          <a href="#" class="footer-link">AnalystBuilder</a>
        </div>
        <p class="footer-text" style="margin-top: 1rem; opacity: 0.6; font-size: 0.8rem;">
          © 2024 UFood Marketing Analysis
        </p>
      </div>
    `;
    if (main && main.parentNode) {
      main.parentNode.insertBefore(footer, main.nextSibling);
    } else {
      document.body.appendChild(footer);
    }
    
    // Re-initialize after injecting elements
    setTimeout(function() {
      initThemeToggle();
      initReadingProgress();
      initBackToTop();
      initTableOfContents();
    }, 50);
  }

  // ==========================================================================
  // Enhance Jupyter Cells
  // ==========================================================================
  
  function enhanceJupyterCells() {
    // Add cell numbers
    const codeCells = document.querySelectorAll('.jp-CodeCell');
    codeCells.forEach(function(cell, index) {
      const prompt = cell.querySelector('.jp-InputPrompt');
      if (prompt && prompt.textContent.trim() === 'In [ ]:') {
        prompt.textContent = `[${index + 1}]`;
      }
    });
    
    // Add hover effects to all cells
    document.querySelectorAll('.jp-Cell').forEach(function(cell) {
      cell.classList.add('hover-border-glow');
    });
    
    // Lazy load images with Intersection Observer
    const images = document.querySelectorAll('.jp-RenderedImage img');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            // Add loaded class for fade-in effect
            img.classList.add('lazy-loaded');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '100px 0px',
        threshold: 0.01
      });
      
      images.forEach(function(img) {
        // Add lazy loading attribute
        img.loading = 'lazy';
        img.decoding = 'async';
        img.classList.add('lazy-image');
        img.style.borderRadius = 'var(--radius-md)';
        img.style.boxShadow = 'var(--shadow-md)';
        imageObserver.observe(img);
      });
    } else {
      // Fallback for older browsers
      images.forEach(function(img) {
        img.style.borderRadius = 'var(--radius-md)';
        img.style.boxShadow = 'var(--shadow-md)';
      });
    }
  }

  // ==========================================================================
  // Keyboard Shortcuts
  // ==========================================================================
  
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
      // T - Toggle theme
      if (e.key === 't' && !e.ctrlKey && !e.metaKey && !isInputFocused()) {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) themeToggle.click();
      }
      
      // Escape - Scroll to top
      if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // J/K - Navigate sections
      if ((e.key === 'j' || e.key === 'k') && !isInputFocused()) {
        navigateSections(e.key === 'j' ? 1 : -1);
      }
    });
  }
  
  function isInputFocused() {
    const activeElement = document.activeElement;
    return activeElement.tagName === 'INPUT' || 
           activeElement.tagName === 'TEXTAREA' || 
           activeElement.isContentEditable;
  }
  
  function navigateSections(direction) {
    const headings = Array.from(document.querySelectorAll('h1[id], h2[id]'));
    const scrollPos = window.scrollY + 150;
    
    let currentIndex = -1;
    headings.forEach(function(heading, index) {
      if (heading.offsetTop <= scrollPos) {
        currentIndex = index;
      }
    });
    
    const nextIndex = Math.max(0, Math.min(headings.length - 1, currentIndex + direction));
    const target = headings[nextIndex];
    
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  }

  // ==========================================================================
  // Utility Functions
  // ==========================================================================
  
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = function() {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // ==========================================================================
  // Expose API
  // ==========================================================================
  
  window.UFoodAnalytics = {
    toggleTheme: function() {
      const themeToggle = document.querySelector('.theme-toggle');
      if (themeToggle) themeToggle.click();
    },
    scrollToTop: function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    scrollToSection: function(id) {
      const target = document.getElementById(id);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    }
  };

})();
