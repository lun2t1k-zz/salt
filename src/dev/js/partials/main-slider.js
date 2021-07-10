import Swiper from 'swiper/bundle';

export default () => {  
  const swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    autoplay: {
      delay: 3000
    },
    disableOnInteraction: false,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      bulletActiveClass: 'swiper-pagination-bullet-active',
      bulletClass: 'swiper-pagination-bullet',
      clickable: true
    },
    effect: 'slide',
    loop: true,
    speed: 800
  });
};
