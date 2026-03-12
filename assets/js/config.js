/* ========================================
   FRD Design System - Configuration
   ======================================== */

/**
 * Frank Ricci Design - Global Configuration
 * Accessible via window.FRD_CONFIG throughout the application
 */

window.FRD_CONFIG = {
  // Site Information
  siteName: 'Frank Ricci Design',
  siteUrl: 'https://frankriccidesign.com',

  // Contact Information
  email: 'frankriccidesign@gmail.com',
  whatsappNumber: '', // Format: +39XXXXXXXXXX (leave empty if not set up yet)
  phone: '', // Optional: format as needed

  // Legal
  pIVA: 'IT04191270984',
  businessName: 'Frank Ricci Design',
  businessCountry: 'Italy',

  // Google Analytics 4
  ga4MeasurementId: 'G-75PV2FYFJY', // Replace with actual measurement ID

  // Social Media Links
  social: {
    instagram: 'https://instagram.com/', // Add handle after base URL
    youtube: 'https://youtube.com/', // Add channel after base URL
    tiktok: 'https://tiktok.com/@', // Add handle after @
    facebook: 'https://facebook.com/', // Add page after base URL
    twitter: 'https://twitter.com/', // Add handle if needed
    linkedin: 'https://linkedin.com/company/', // Add company slug if needed
  },

  // Feature Flags
  features: {
    analyticsEnabled: true,
    lazyLoadImages: true,
    mobileMenuEnabled: true,
    scrollRevealEnabled: true,
    externalLinkTracking: true,
  },

  // API Endpoints
  api: {
    // Contact form endpoint (configure based on your backend)
    contactForm: '/api/contact',
    // Newsletter signup (configure as needed)
    newsletter: '/api/newsletter',
  },

  // Tracking Events
  trackingEvents: {
    contactFormSubmit: 'contact_form_submit',
    newsletterSignup: 'newsletter_signup',
    ctaClick: 'cta_click',
    externalLinkClick: 'external_link_click',
  },

  // UI Configuration
  ui: {
    // Scroll reveal animation threshold
    revealThreshold: 0.1,
    // Smooth scroll offset (for fixed header)
    scrollOffset: 80,
    // Mobile menu animation duration (ms)
    menuAnimationDuration: 300,
  },
};

/**
 * Helper function to get configuration value
 * Usage: FRD.getConfig('email')
 */
window.FRD = {
  getConfig: function (key) {
    const keys = key.split('.');
    let value = window.FRD_CONFIG;

    for (let i = 0; i < keys.length; i++) {
      if (value && typeof value === 'object' && keys[i] in value) {
        value = value[keys[i]];
      } else {
        return undefined;
      }
    }

    return value;
  },

  /**
   * Get social media URL
   * Usage: FRD.getSocialUrl('instagram')
   */
  getSocialUrl: function (platform) {
    return this.getConfig(`social.${platform}`);
  },

  /**
   * Check if feature is enabled
   * Usage: FRD.isFeatureEnabled('analyticsEnabled')
   */
  isFeatureEnabled: function (feature) {
    return this.getConfig(`features.${feature}`);
  },

  /**
   * Get API endpoint
   * Usage: FRD.getApiEndpoint('contactForm')
   */
  getApiEndpoint: function (endpoint) {
    return this.getConfig(`api.${endpoint}`);
  },

  /**
   * Format contact link for WhatsApp
   * Usage: FRD.getWhatsAppLink('Hello!')
   */
  getWhatsAppLink: function (message = '') {
    const number = this.getConfig('whatsappNumber');
    if (!number) return null;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${number}?text=${encodedMessage}`;
  },

  /**
   * Format contact link for Email
   * Usage: FRD.getEmailLink('Subject', 'Body text')
   */
  getEmailLink: function (subject = '', body = '') {
    const email = this.getConfig('email');
    if (!email) return null;

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    return `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
  },

  /**
   * Get Google Analytics measurement ID
   * Usage: FRD.getGAMeasurementId()
   */
  getGAMeasurementId: function () {
    return this.getConfig('ga4MeasurementId');
  },

  /**
   * Format company legal text
   * Usage: FRD.getCompanyLegalText()
   */
  getCompanyLegalText: function () {
    const name = this.getConfig('businessName');
    const pIVA = this.getConfig('pIVA');
    return `${name} | P.IVA ${pIVA}`;
  },
};

// Log configuration in development
if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
  console.log('[FRD Config] Configuration loaded:', window.FRD_CONFIG);
}
