# Semester 7 Examination Portal • Study Hub & Unit Navigator

A modern, high-performance web portal uniting all 15 study units across Semester VII:
- **Computer Vision (CV)** — Units 1 to 5
- **Fault-Tolerant Systems (FTS)** — Units 1 to 5
- **Software Defined Networks (SDN)** — Units 1 to 5

---

## 🚀 Key Features

1. **Front-Page Navigation Hub (`index.html`)**:
   - Modern, responsive dashboard with subject cards and unit overviews.
   - Live real-time fuzzy search across all units, topics, and algorithm names (shortcut: `/` or `Ctrl + K`).
   - Quick Filter chips: All Units (15), Computer Vision (5), Fault Tolerance (5), SDN (5), Bookmarked, and Pending Revision.
   - Dark & Light mode toggle with automatic persistence (`localStorage`).

2. **Integrated Study Reader**:
   - Click **"Study Unit"** on any card to open a full-height, distraction-free reading view.
   - Sticky top navigation bar with:
     - "← All Units" to return to the dashboard.
     - Subject & Unit switcher dropdown.
     - Sequential **"Prev"** / **"Next"** unit buttons (with keyboard shortcuts: `←` / `→`).
     - "Mark as Revised" toggle directly in the toolbar.
     - "Open in New Tab" button for printing, browser search, or external viewing.

3. **Progress Tracker & Bookmarking**:
   - Track completed revision units with interactive checkboxes.
   - Visual progress bar for overall curriculum and per-subject metrics.
   - Star bookmarking to save important units for last-minute review.
   - All progress is saved locally in the browser (`localStorage`).

4. **Exam Formula Sheet / Cheat Sheet**:
   - One-click modal containing core formulas, bounds, and definitions (e.g. MTTF/MTBF, Availability, TMR Reliability, Young's Checkpoint Formula, Hough Line Equations, Optical Flow, OpenFlow Pipeline, etc.).

5. **Direct Standalone Navigation Support**:
   - If an individual unit HTML file is opened directly in a new tab or from File Explorer, a floating `"← Back to Study Portal"` button automatically appears in the corner.

---

## 📂 Project Structure

```text
WEBSITE/
├── index.html                   # Main Portal Landing Page & Reader Hub
├── server.js                    # Zero-dependency local Node.js static server
├── package.json                 # npm start script
├── assets/
│   ├── css/
│   │   └── style.css            # Responsive, modern styling (Dark/Light themes)
│   └── js/
│       ├── data.js              # Comprehensive syllabus & unit metadata
│       └── app.js               # Reactive search, filters, reader modal & progress
└── public/
    ├── index.html               # Mirror portal for direct /public hosting
    ├── assets/                  # Mirrored assets for self-contained /public access
    ├── computer vision/         # Units 1 - 5 (HTML guides)
    ├── fault tolerance/         # Units 1 - 5 (HTML guides)
    └── software defined networks/ # Units 1 - 5 (HTML guides)
```

---

## 💻 How to Run

### Method 1: Double-Click (Zero Setup)
Simply double-click `index.html` (or `public/index.html`) in your file explorer. It will open in Google Chrome, Microsoft Edge, or Firefox immediately.

### Method 2: Node.js Static Server
Run from the project root:
```bash
npm start
# or:
node server.js
```
Then visit `http://localhost:3000` in your web browser.
