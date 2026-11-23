/**
 * Semester 7 Examination Portal - Master Application Logic
 * High-performance, zero-dependency client application with Mobile & Theme optimizations.
 */

(function () {
  'use strict';

  // State Management
  const state = {
    activeFilter: 'all',
    searchQuery: '',
    completedUnits: new Set(),
    bookmarkedUnits: new Set(),
    activeUnitId: null,
    isReaderOpen: false,
    theme: 'light', // Light mode default for maximum legibility as requested
    basePath: './'
  };

  // Determine base path based on location
  function initBasePath() {
    if (typeof window.BASE_PATH_OVERRIDE !== 'undefined') {
      state.basePath = window.BASE_PATH_OVERRIDE;
      return;
    }
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/public/')) {
      state.basePath = './';
    } else {
      state.basePath = './public/';
    }
  }

  // Local Storage Keys
  const STORAGE_KEYS = {
    COMPLETED: 'sem7_completed_units_v1',
    BOOKMARKS: 'sem7_bookmarked_units_v1',
    THEME: 'sem7_theme_preference_v1'
  };

  // Load Saved Preferences
  function loadStoredState() {
    try {
      const savedCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED);
      if (savedCompleted) {
        state.completedUnits = new Set(JSON.parse(savedCompleted));
      }

      const savedBookmarks = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (savedBookmarks) {
        state.bookmarkedUnits = new Set(JSON.parse(savedBookmarks));
      }

      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      if (savedTheme) {
        state.theme = savedTheme;
      } else {
        state.theme = 'light'; // Default to light mode for crisp clarity
      }
      applyTheme(state.theme);
    } catch (e) {
      console.warn('LocalStorage error or private browsing active:', e);
      applyTheme('light');
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(Array.from(state.completedUnits)));
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(Array.from(state.bookmarkedUnits)));
      localStorage.setItem(STORAGE_KEYS.THEME, state.theme);
    } catch (e) {
      console.warn('Unable to persist to localStorage:', e);
    }
  }

  // Theme Management with Live Iframe Synchronization
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update theme-color meta tag for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'light' ? '#f8fafc' : '#0b0f17');
    }

    // Update Segmented Control Buttons
    const lightBtn = document.getElementById('theme-btn-light');
    const darkBtn = document.getElementById('theme-btn-dark');
    if (lightBtn && darkBtn) {
      if (theme === 'light') {
        lightBtn.classList.add('active');
        darkBtn.classList.remove('active');
      } else {
        darkBtn.classList.add('active');
        lightBtn.classList.remove('active');
      }
    }

    // Update Reader Toolbar Theme Button
    const readerThemeIcon = document.getElementById('reader-theme-icon');
    if (readerThemeIcon) {
      readerThemeIcon.innerHTML = theme === 'light' ? '🌙' : '☀️';
    }

    // Synchronize into Iframe if reader is active
    syncThemeToIframe();

    saveState();
  }

  function toggleTheme() {
    applyTheme(state.theme === 'light' ? 'dark' : 'light');
  }

  function syncThemeToIframe() {
    if (!readerIframe) return;
    try {
      if (readerIframe.contentDocument && readerIframe.contentDocument.documentElement) {
        readerIframe.contentDocument.documentElement.setAttribute('data-theme', state.theme);
      }
    } catch (e) {
      // Cross-origin boundary fallback
    }
  }

  // Flattened units list for easy sequential navigation
  let allUnitsList = [];

  function buildAllUnitsList() {
    allUnitsList = [];
    if (!window.STUDY_DATA || !window.STUDY_DATA.subjects) return;
    window.STUDY_DATA.subjects.forEach(subject => {
      subject.units.forEach(unit => {
        allUnitsList.push({
          ...unit,
          subjectName: subject.name,
          subjectCode: subject.code,
          subjectAccent: subject.accent
        });
      });
    });
  }

  // DOM Elements
  let searchInput, clearSearchBtn, contentContainer, emptyStateBox;
  let overallProgressBar, overallProgressText, completedCountText;
  let readerOverlay, readerIframe, readerDropdown, prevUnitBtn, nextUnitBtn;

  // Initialize DOM References & Listeners
  function initDom() {
    searchInput = document.getElementById('search-input');
    clearSearchBtn = document.getElementById('search-clear-btn');
    contentContainer = document.getElementById('subjects-container');
    emptyStateBox = document.getElementById('empty-state');
    overallProgressBar = document.getElementById('overall-progress-bar');
    overallProgressText = document.getElementById('overall-progress-text');
    completedCountText = document.getElementById('completed-count-text');

    readerOverlay = document.getElementById('reader-overlay');
    readerIframe = document.getElementById('reader-iframe');
    readerDropdown = document.getElementById('reader-dropdown');
    prevUnitBtn = document.getElementById('prev-unit-btn');
    nextUnitBtn = document.getElementById('next-unit-btn');

    setupEventListeners();
  }

  // Setup UI Listeners
  function setupEventListeners() {
    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        if (clearSearchBtn) {
          clearSearchBtn.style.display = state.searchQuery.length > 0 ? 'block' : 'none';
        }
        renderUnits();
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          state.searchQuery = '';
          clearSearchBtn.style.display = 'none';
          searchInput.focus();
          renderUnits();
        }
      });
    }

    // Filter tabs
    const filterTabs = document.querySelectorAll('.tab-btn[data-filter]');
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.activeFilter = tab.getAttribute('data-filter');
        renderUnits();
      });
    });

    // Segmented Theme Switch Buttons
    const lightBtn = document.getElementById('theme-btn-light');
    const darkBtn = document.getElementById('theme-btn-dark');

    if (lightBtn) {
      lightBtn.addEventListener('click', () => applyTheme('light'));
    }
    if (darkBtn) {
      darkBtn.addEventListener('click', () => applyTheme('dark'));
    }

    // Reader Toolbar Theme Toggle
    const readerThemeBtn = document.getElementById('reader-theme-toggle');
    if (readerThemeBtn) {
      readerThemeBtn.addEventListener('click', toggleTheme);
    }

    // Iframe Load Event for Theme Synchronization
    if (readerIframe) {
      readerIframe.addEventListener('load', () => {
        syncThemeToIframe();
      });
    }

    // Cheat Sheet Modal Toggle
    const cheatsheetBtn = document.getElementById('cheatsheet-btn');
    const cheatsheetModal = document.getElementById('cheatsheet-modal');
    const closeCheatsheetBtn = document.getElementById('close-cheatsheet-btn');

    if (cheatsheetBtn && cheatsheetModal) {
      cheatsheetBtn.addEventListener('click', () => {
        renderCheatSheet();
        cheatsheetModal.classList.add('active');
      });
    }

    if (closeCheatsheetBtn && cheatsheetModal) {
      closeCheatsheetBtn.addEventListener('click', () => {
        cheatsheetModal.classList.remove('active');
      });

      cheatsheetModal.addEventListener('click', (e) => {
        if (e.target === cheatsheetModal) {
          cheatsheetModal.classList.remove('active');
        }
      });
    }

    // Reset Progress Button
    const resetBtn = document.getElementById('reset-progress-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset your revision progress? This will uncheck all marked units.')) {
          state.completedUnits.clear();
          saveState();
          updateProgressUI();
          renderUnits();
        }
      });
    }

    // Reader UI buttons
    const backToHubBtn = document.getElementById('back-to-hub-btn');
    if (backToHubBtn) {
      backToHubBtn.addEventListener('click', closeReader);
    }

    if (prevUnitBtn) {
      prevUnitBtn.addEventListener('click', navigatePreviousUnit);
    }

    if (nextUnitBtn) {
      nextUnitBtn.addEventListener('click', navigateNextUnit);
    }

    if (readerDropdown) {
      readerDropdown.addEventListener('change', (e) => {
        openReader(e.target.value);
      });
    }

    const readerDirectTabBtn = document.getElementById('reader-direct-tab');
    if (readerDirectTabBtn) {
      readerDirectTabBtn.addEventListener('click', () => {
        if (state.activeUnitId) {
          const unit = allUnitsList.find(u => u.id === state.activeUnitId);
          if (unit) {
            window.open(state.basePath + unit.relativePath, '_blank');
          }
        }
      });
    }

    // Keyboard Shortcuts
    window.addEventListener('keydown', handleGlobalKeydown);

    // Hash routing for direct linking
    window.addEventListener('hashchange', handleHashRouting);
  }

  // Keyboard Shortcuts Handler
  function handleGlobalKeydown(e) {
    if (state.isReaderOpen) {
      if (e.key === 'Escape') {
        closeReader();
        return;
      }
      if (e.key === 'ArrowLeft' && !e.target.matches('input, textarea, select')) {
        navigatePreviousUnit();
        return;
      }
      if (e.key === 'ArrowRight' && !e.target.matches('input, textarea, select')) {
        navigateNextUnit();
        return;
      }
    } else {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && !e.target.matches('input, textarea')) {
        e.preventDefault();
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
      if (e.key === 't' && !e.target.matches('input, textarea')) {
        toggleTheme();
      }
    }
  }

  // Hash Navigation Handler
  function handleHashRouting() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#reader/')) {
      const unitId = hash.replace('#reader/', '');
      const unit = allUnitsList.find(u => u.id === unitId);
      if (unit) {
        openReader(unitId, false);
      }
    } else if (state.isReaderOpen) {
      closeReader(false);
    }
  }

  // Populate Reader Dropdown
  function populateReaderDropdown() {
    if (!readerDropdown) return;
    readerDropdown.innerHTML = '';
    
    window.STUDY_DATA.subjects.forEach(subject => {
      const optGroup = document.createElement('optgroup');
      optGroup.label = subject.name;
      subject.units.forEach(unit => {
        const option = document.createElement('option');
        option.value = unit.id;
        option.textContent = `${subject.code} U${unit.unitNum}: ${unit.title.replace(/^Unit \d+:\s*/, '')}`;
        optGroup.appendChild(option);
      });
      readerDropdown.appendChild(optGroup);
    });
  }

  // Open Reader Mode
  function openReader(unitId, updateHash = true) {
    const unitIndex = allUnitsList.findIndex(u => u.id === unitId);
    if (unitIndex === -1) return;

    const unit = allUnitsList[unitIndex];
    state.activeUnitId = unitId;
    state.isReaderOpen = true;

    if (readerDropdown) {
      readerDropdown.value = unitId;
    }

    const subjectPill = document.getElementById('reader-subject-pill');
    if (subjectPill) {
      subjectPill.textContent = unit.subjectCode;
      subjectPill.style.backgroundColor = unit.subjectAccent + '25';
      subjectPill.style.color = unit.subjectAccent;
      subjectPill.style.border = `1px solid ${unit.subjectAccent}60`;
    }

    if (prevUnitBtn) {
      prevUnitBtn.disabled = unitIndex === 0;
      prevUnitBtn.title = unitIndex > 0 ? `Previous: ${allUnitsList[unitIndex - 1].title}` : 'First Unit';
    }
    if (nextUnitBtn) {
      nextUnitBtn.disabled = unitIndex === allUnitsList.length - 1;
      nextUnitBtn.title = unitIndex < allUnitsList.length - 1 ? `Next: ${allUnitsList[unitIndex + 1].title}` : 'Last Unit';
    }

    const readerRevisedCheck = document.getElementById('reader-revised-check');
    if (readerRevisedCheck) {
      readerRevisedCheck.checked = state.completedUnits.has(unitId);
      readerRevisedCheck.onchange = (e) => {
        toggleUnitCompleted(unitId, e.target.checked);
      };
    }

    const fullUrl = state.basePath + unit.relativePath;
    if (readerIframe) {
      readerIframe.src = fullUrl;
    }

    document.title = `${unit.title} • Semester 7 Portal`;

    if (readerOverlay) {
      readerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    if (updateHash) {
      window.location.hash = `#reader/${unitId}`;
    }
  }

  // Close Reader Mode
  function closeReader(updateHash = true) {
    state.isReaderOpen = false;
    state.activeUnitId = null;

    if (readerOverlay) {
      readerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (readerIframe) {
      readerIframe.src = 'about:blank';
    }

    document.title = `${window.STUDY_DATA.portalTitle} • Exam Hub`;

    if (updateHash && window.location.hash.startsWith('#reader/')) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }

    renderUnits();
  }

  // Sequential Navigation
  function navigatePreviousUnit() {
    if (!state.activeUnitId) return;
    const currentIndex = allUnitsList.findIndex(u => u.id === state.activeUnitId);
    if (currentIndex > 0) {
      openReader(allUnitsList[currentIndex - 1].id);
    }
  }

  function navigateNextUnit() {
    if (!state.activeUnitId) return;
    const currentIndex = allUnitsList.findIndex(u => u.id === state.activeUnitId);
    if (currentIndex < allUnitsList.length - 1) {
      openReader(allUnitsList[currentIndex + 1].id);
    }
  }

  // Toggle Bookmark
  function toggleBookmark(unitId) {
    if (state.bookmarkedUnits.has(unitId)) {
      state.bookmarkedUnits.delete(unitId);
    } else {
      state.bookmarkedUnits.add(unitId);
    }
    saveState();
    renderUnits();
  }

  // Toggle Completed Status
  function toggleUnitCompleted(unitId, isCompleted) {
    if (isCompleted) {
      state.completedUnits.add(unitId);
    } else {
      state.completedUnits.delete(unitId);
    }
    saveState();
    updateProgressUI();
    renderUnits();
  }

  // Update Progress Indicators
  function updateProgressUI() {
    const total = allUnitsList.length;
    const completed = state.completedUnits.size;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    if (overallProgressBar) {
      overallProgressBar.style.width = `${percentage}%`;
    }
    if (overallProgressText) {
      overallProgressText.textContent = `${percentage}%`;
    }
    if (completedCountText) {
      completedCountText.textContent = `${completed} / ${total} Units Revised`;
    }

    const bookmarkedCountBadge = document.getElementById('badge-bookmarked');
    if (bookmarkedCountBadge) {
      bookmarkedCountBadge.textContent = state.bookmarkedUnits.size;
    }
  }

  // Render Subject Groups and Cards
  function renderUnits() {
    if (!contentContainer) return;
    contentContainer.innerHTML = '';

    let totalVisibleUnits = 0;
    const query = state.searchQuery;
    const filter = state.activeFilter;

    window.STUDY_DATA.subjects.forEach(subject => {
      const matchingUnits = subject.units.filter(unit => {
        if (filter === 'bookmarked' && !state.bookmarkedUnits.has(unit.id)) return false;
        if (filter === 'to-revise' && state.completedUnits.has(unit.id)) return false;
        if (filter !== 'all' && filter !== 'bookmarked' && filter !== 'to-revise' && filter !== subject.id) return false;

        if (query) {
          const titleMatch = unit.title.toLowerCase().includes(query);
          const subtitleMatch = unit.subtitle.toLowerCase().includes(query);
          const keywordMatch = unit.keywords.some(k => k.toLowerCase().includes(query));
          const sectionMatch = unit.sections.some(s => s.toLowerCase().includes(query));
          const unitNumberMatch = `unit ${unit.unitNum}`.includes(query) || `u${unit.unitNum}`.includes(query);
          return titleMatch || subtitleMatch || keywordMatch || sectionMatch || unitNumberMatch;
        }
        return true;
      });

      if (matchingUnits.length === 0) return;

      totalVisibleUnits += matchingUnits.length;

      const subjectCompletedCount = subject.units.filter(u => state.completedUnits.has(u.id)).length;
      const subjectPercentage = Math.round((subjectCompletedCount / subject.units.length) * 100);

      const subjectGroup = document.createElement('section');
      subjectGroup.className = 'subject-group';
      subjectGroup.id = `subject-${subject.id}`;
      subjectGroup.style.setProperty('--card-accent-border', subject.borderColor);

      const headerHtml = `
        <div class="subject-header">
          <div class="subject-title-area">
            <div class="subject-icon-box" style="background: ${subject.accentBg}; color: ${subject.accent}; border: 1px solid ${subject.borderColor};">
              ${getSubjectIconSvg(subject.icon)}
            </div>
            <div class="subject-info">
              <h3>${escapeHtml(subject.name)}</h3>
              <p>${escapeHtml(subject.summary)}</p>
            </div>
          </div>
          <div class="subject-progress-pill">
            <div class="subject-mini-track">
              <div class="subject-mini-fill" style="width: ${subjectPercentage}%; background-color: ${subject.accent};"></div>
            </div>
            <span>${subjectCompletedCount} / ${subject.units.length} Revised</span>
          </div>
        </div>
      `;

      const grid = document.createElement('div');
      grid.className = 'units-grid';

      matchingUnits.forEach(unit => {
        const isCompleted = state.completedUnits.has(unit.id);
        const isBookmarked = state.bookmarkedUnits.has(unit.id);
        const directFileUrl = state.basePath + unit.relativePath;

        const card = document.createElement('div');
        card.className = `unit-card ${isCompleted ? 'is-completed' : ''}`;
        card.style.setProperty('--card-badge-bg', subject.accentBg);
        card.style.setProperty('--card-badge-color', subject.accent);

        const previewSections = unit.sections.slice(0, 3).map(sec => `
          <li class="card-topic-item" title="${escapeHtml(sec)}">
            <span class="card-topic-bullet">•</span>
            <span>${escapeHtml(sec)}</span>
          </li>
        `).join('');

        card.innerHTML = `
          <div class="card-top-row">
            <div class="card-badges">
              <span class="unit-number-pill">Unit ${unit.unitNum}</span>
              <span class="unit-read-time">⏱️ ${unit.readTime}</span>
            </div>
            <div class="card-actions-top">
              <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" title="${isBookmarked ? 'Remove bookmark' : 'Bookmark for revision'}" data-bookmark-id="${unit.id}">
                ${isBookmarked ? '★' : '☆'}
              </button>
            </div>
          </div>

          <h4 class="card-title">${escapeHtml(unit.title)}</h4>
          <p class="card-subtitle">${escapeHtml(unit.subtitle)}</p>

          <ul class="card-topics-list">
            ${previewSections}
            ${unit.sections.length > 3 ? `<li class="card-topic-item" style="color: var(--text-muted); font-size: 0.72rem;">+ ${unit.sections.length - 3} more topics included</li>` : ''}
          </ul>

          <div class="card-footer">
            <button class="btn-read-unit" data-read-id="${unit.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              <span>Study Unit</span>
            </button>
            
            <a href="${directFileUrl}" target="_blank" class="btn-open-tab" title="Open in new window / tab">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>

            <label class="mark-revised-toggle" title="Mark this unit as revised">
              <input type="checkbox" ${isCompleted ? 'checked' : ''} data-toggle-completed="${unit.id}">
              <span>Revised</span>
            </label>
          </div>
        `;

        const readBtn = card.querySelector(`[data-read-id="${unit.id}"]`);
        if (readBtn) {
          readBtn.addEventListener('click', () => openReader(unit.id));
        }

        const bmarkBtn = card.querySelector(`[data-bookmark-id="${unit.id}"]`);
        if (bmarkBtn) {
          bmarkBtn.addEventListener('click', () => toggleBookmark(unit.id));
        }

        const completedCheck = card.querySelector(`[data-toggle-completed="${unit.id}"]`);
        if (completedCheck) {
          completedCheck.addEventListener('change', (e) => {
            toggleUnitCompleted(unit.id, e.target.checked);
          });
        }

        grid.appendChild(card);
      });

      subjectGroup.innerHTML = headerHtml;
      subjectGroup.appendChild(grid);
      contentContainer.appendChild(subjectGroup);
    });

    if (emptyStateBox) {
      if (totalVisibleUnits === 0) {
        emptyStateBox.classList.add('visible');
      } else {
        emptyStateBox.classList.remove('visible');
      }
    }
  }

  // Render Cheat Sheet in Modal
  function renderCheatSheet() {
    const modalContent = document.getElementById('cheatsheet-content');
    if (!modalContent || !window.STUDY_DATA.cheatSheets) return;

    modalContent.innerHTML = window.STUDY_DATA.cheatSheets.map(cat => `
      <div class="cheatsheet-category">
        <h4>${escapeHtml(cat.category)}</h4>
        <div style="overflow-x: auto; -webkit-overflow-scrolling: touch;">
          <table class="cheatsheet-table">
            <thead>
              <tr>
                <th style="width: 25%;">Concept / Topic</th>
                <th style="width: 45%;">Equation / Rule</th>
                <th style="width: 30%;">Exam Notes</th>
              </tr>
            </thead>
            <tbody>
              ${cat.items.map(item => `
                <tr>
                  <td><strong>${escapeHtml(item.name)}</strong></td>
                  <td><code class="formula-code">${escapeHtml(item.formula)}</code></td>
                  <td style="color: var(--text-secondary); font-size: 0.82rem;">${escapeHtml(item.desc)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `).join('');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getSubjectIconSvg(type) {
    switch (type) {
      case 'camera':
        return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`;
      case 'shield':
        return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
      case 'network':
        return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="6" height="6" rx="1"></rect><rect x="16" y="2" width="6" height="6" rx="1"></rect><rect x="9" y="16" width="6" height="6" rx="1"></rect><path d="M5 8v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8"></path><path d="M12 12v4"></path></svg>`;
      default:
        return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>`;
    }
  }

  function init() {
    initBasePath();
    loadStoredState();
    buildAllUnitsList();
    initDom();
    populateReaderDropdown();
    updateProgressUI();
    renderUnits();
    handleHashRouting();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
