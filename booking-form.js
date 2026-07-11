/* ============================================
   Simple Bistro — booking-form.js
   Client-side validation + mailto fallback for reservations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('booking-form');
  const msgEl = document.getElementById('form-msg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get values
    const name = form.elements['name'].value.trim();
    const phone = form.elements['phone'].value.trim();
    const branch = form.elements['branch'].value;
    const date = form.elements['date'].value;
    const time = form.elements['time'].value;
    const party = form.elements['party'].value;
    const notes = form.elements['notes'].value.trim();

    // Validate required fields
    if (!name || !phone || !branch || !date || !time || !party) {
      msgEl.textContent = 'Please fill in all required fields before submitting.';
      msgEl.className = 'form-msg error show';
      return;
    }

    // Build mailto body
    let body = `Hi Simple Bistro! I'd like to make a reservation.\n\n`;
    body += `Name: ${name}\n`;
    body += `Phone: ${phone}\n`;
    body += `Branch: ${branch}\n`;
    body += `Date: ${date}\n`;
    body += `Time: ${time}\n`;
    body += `Party Size: ${party} people\n`;
    if (notes) body += `Notes: ${notes}\n`;

    const subject = encodeURIComponent(`Reservation: ${name} — ${branch} — ${date}`);
    const bodyEncoded = encodeURIComponent(body);
    const mailto = `mailto:simplebistrosince2016@gmail.com?subject=${subject}&body=${bodyEncoded}`;

    // Open email client
    window.location.href = mailto;

    // Show confirmation
    msgEl.textContent = "We'll confirm by phone shortly — see you soon!";
    msgEl.className = 'form-msg success show';

    // Also show a nice confirmation block
    const confirmBlock = document.createElement('div');
    confirmBlock.className = 'booking-confirm';
    confirmBlock.innerHTML = `
      <h3>Reservation Sent!</h3>
      <p>We'll confirm by phone shortly — see you soon!</p>
      <p class="mono-sm" style="margin-top:0.8rem;color:var(--cream-dim)">${branch} · ${date} · ${time} · ${party} guests</p>
    `;
    // Remove any existing confirm block first
    const existing = form.querySelector('.booking-confirm');
    if (existing) existing.remove();
    form.after(confirmBlock);
  });
});
