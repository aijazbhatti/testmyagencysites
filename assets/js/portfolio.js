/**
 * NayaaSoft Portfolio Filter Scripts
 */
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.fb');
  const projectCards = document.querySelectorAll('#pgrid .portfolio-card, #pgrid .pc');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('on'));
      btn.classList.add('on');

      const filterVal = btn.dataset.f;

      projectCards.forEach(card => {
        const cat = card.dataset.cat;
        if (filterVal === 'All' || cat === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
});
