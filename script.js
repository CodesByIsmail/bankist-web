'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////
//Scrolling
btnScrollTo.addEventListener('click', function (e) {
  const slcoords = section1.getBoundingClientRect();
  console.log(slcoords);

  console.log(e.target.getBoundingClientRect());

  console.log('current scroll X/Y', window.pageXOffset, pageYOffset); // y: how far you have scroll from the top; x: how far you scroll from the left

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //Scrolling

  /////////////////////////////Old method

  // window.scrollTo(
  //   slcoords.left + window.pageXOffset,
  //   slcoords.top + window.pageYOffset //.top give a height relative to the viewport, so to actually give a coordinate relative to the top of the web page we add the pageoffset that we have scrolled
  // );

  // window.scrollTo({
  //   left: slcoords.left + window.pageXOffset,
  //   top: slcoords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////
//Page Navigation

// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault()

//     const id = this.getAttribute('href')
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   } )

// });

//Event Delegation:we add a big event listener to a common parent of the links, then we use e.targer to check where the event happens then we use matching strategy to check if the link is the one that is clicked not any place irrelevant.

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// ////////////////////////////////
// ///////////////////////////////

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// // document.querySelector('.header');
// console.log(allSections);

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button'); //retutn a htmlcollection and it is a life collection, and if a change happens to the dom, it changes in the collection unlike the node list which does not updates
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn')); // also return a html collection

// // Creating and inserting elements

// // .insertAdjacentHTML

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We used cookied for improved funtionality and analytics';
// message.innerHTML =
//   'We used cookied for improved funtionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// // header.prepend(message); //Adds as the first element of the header

// // header.append(message) //Adds as the last element of the header; it moves the element from the the first element to the last element because it cannot be at multiple place at a time

// // header.append(message.cloneNode(true))

// header.before(message);
// header.after(message);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     // message.remove();
//     message.parentElement.removeChild(message); //old format
//   });

// //////////////////////////

// ///Styles

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.color); //will not work because we can only use style keyword for the style we set ourselves
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// // to change a value in css variable
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src); //this give a absolut link to the src
// console.log(logo.className);

// //we can also create attribute here
// logo.alt = 'Beautiful minimalist logo';

// // Non-standards
// console.log(logo.designer); //will not work because .designer is not a special attrivute for image
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// console.log(logo.src); // to get absolute src
// console.log(logo.getAttribute('src')); // to get relative src

// const link = document.querySelector('.twitter-link');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// //Data Attribute

// console.log(logo.dataset.versionNumber); //stored in the dataset

// // Classes

// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c', 'j');
// logo.classList.contains('c', 'j');

// //Don't use
// logo.className = 'jonas'; //it overwrites other class names

// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventlistener: you hover heading');
// };

// h1.addEventListener('mouseenter', alertH1);
// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alertH1);
// }, 5000);

//rgb(255, 255, 255)

// Bubbling: some eventhandlers has capturing stage, target stage and bubbling stage: when a child element is targeted the event goes through from the root parent element and then goes to the target element and then bubbles back up to passing through the parent element i.e when the target element is clicked the effect of the event is also seen on the parent element even though the parent element is not clicked

// const randomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);

// //STOP PROPAGATION
// e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// }); // when we give the eventhandler a third parameter(true or false), we are saying it shoukd respong to event handler at capturing stage. so it is the one that runs first while the other waits for bubbling stage for execution

const h1 = document.querySelector('h1');

//Going downwards
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

//Going upwards
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var( --gradient-secondary)';
h1.closest('h1').style.background = 'var( --gradient-primary)';


//Going Sideways: siblings 
console.log(h1.previousElementSibling)
console.log(h1.nextElementSibling)

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)'
})