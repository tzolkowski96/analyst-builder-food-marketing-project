/**
 * ==========================================================================
 * UFood Marketing Analysis - Chart Enhancements
 * Image lightbox and table improvements
 * ==========================================================================
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initImageLightbox();
    enhanceDataTables();
  });

  // ==========================================================================
  // Image Lightbox
  // ==========================================================================
  
  function initImageLightbox() {
    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-overlay"></div>
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close">×</button>
        <img src="" alt="Enlarged view">
      </div>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('img');
    
    // Add click handlers to images
    document.querySelectorAll('.jp-RenderedImage img').forEach(function(img) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function() {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Chart visualization';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    
    // Close handlers
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // ==========================================================================
  // Enhance Data Tables
  // ==========================================================================
  
  function enhanceDataTables() {
    document.querySelectorAll('table, .dataframe').forEach(function(table) {
      // Skip if already wrapped
      if (table.parentElement.classList.contains('table-wrapper')) return;
      
      // Add responsive wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'table-wrapper';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

})();
