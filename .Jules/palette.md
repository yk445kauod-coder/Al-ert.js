# Palette's Journal - Critical UX & Accessibility Learnings

## 2026-09-16 - Modal Focus Trapping and ARIA Dialog Semantics in Modal Alerts
**Learning:** Pure DOM JS modal libraries like `Al-Ert.js` often render `<div class="al-ert">` without explicit `role="dialog"`, `aria-modal="true"`, or keyboard focus trapping. This makes keyboard and screen reader navigation escape the modal into background page elements.
**Action:** Always add `role="dialog"`, `aria-modal="true"`, dynamic `aria-labelledby`/`aria-describedby` IDs, focus visible styles (`:focus-visible`), and a lightweight `Tab`/`Shift+Tab` focus trap on active modals.
