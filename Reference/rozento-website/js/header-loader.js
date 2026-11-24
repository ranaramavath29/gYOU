/* Rozento Header Loader
 * Injects the shared header partial (partials/header.html) into a
 * <div data-header-placeholder> element on each page.
 * Requires the site to be served over HTTP (e.g. `python3 -m http.server`).
 */
(function () {
  'use strict';

  const HEADER_PATH = 'partials/header.html';

  function loadHeader() {
    const placeholder = document.querySelector('[data-header-placeholder]');
    if (!placeholder) return;

    fetch(HEADER_PATH)
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.text();
      })
      .then(function (html) {
        placeholder.outerHTML = html.trim();
        // Load header interactivity after the DOM is updated
        var script = document.createElement('script');
        script.src = 'js/header.js';
        document.body.appendChild(script);
      })
      .catch(function (err) {
        console.error('[Rozento] Failed to load header:', err);
        placeholder.outerHTML =
          '<nav style="padding:16px 32px;background:#0C1220;border-bottom:1px solid #1E293B;color:#F8FAFC">' +
          '<a href="index.html" style="color:#F8FAFC;font-weight:700;text-decoration:none">rozento*</a></nav>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
  } else {
    loadHeader();
  }
})();