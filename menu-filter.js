/* ============================================
   Simple Bistro — menu-filter.js
   Filter menu items by tag using JS tab control
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.ticket-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      // Show/hide cards
      cards.forEach(card => {
        const tag = card.getAttribute('data-tag');
        if (filter === 'all' || tag === filter) {
          card.style.display = '';
          card.style.opacity = '1';
          card.style.transform = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
