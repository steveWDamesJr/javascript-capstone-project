const contact = document.querySelector('.contact');
const main = document.querySelector('main');

contact.addEventListener('click', () => {
  main.innerHTML = `<div class="text-content">
  <p class="contacts-p">
    Here at Bahethia Ratings, we are elated to answer any questions you may have concerning our services. <br>
    Feel free to reach us at the following contacts below:
  </p>
  <ul class="contacts-p">
    <li>Preferred Email: bahethia_ratings@gmail.com</li>
    <li>WhatsApp us at: +38 377 568 7777</li>
    <li>Find us at: Worthick 45, 42340 Kennedy, French Isles, France</li>
  </ul>
  </div>`;
});