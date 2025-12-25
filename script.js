'use strict';


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('nav')


///////////////////////////////////////
// Modal window

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
  // console.log(slcoords);

  // console.log(e.target.getBoundingClientRect());

  // console.log('current scroll X/Y', window.pageXOffset, pageYOffset); // y: how far you have scroll from the top; x: how far you scroll from the left

  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

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
////////////////////////////
  //PAGE NAVIGATION

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
// ////////////////////////////////
//TABBED Components 

const tab = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')


tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab')
  console.log(clicked)
  
   if(!clicked) return
  tab.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  
  
  clicked.classList.add('operations__tab--active');
  
  
 document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

// ////////////////////////////////
// ///////////////////////////////

const handlerOver = function (e) {
  const link = e.target
  const siblings = link.closest('.nav').querySelectorAll('.nav__link')
  const logo = link.closest('.nav').querySelectorAll('img')
  
  
  siblings.forEach(el => {
    if (el !== link) {
el.style.opacity = this;
    }
  })
  
logo.style.opacity = this;
}

// To add function to event handler

nav.addEventListener('mouseover', handlerOver.bind('0.5'))
nav.addEventListener('mouseleave', handlerOver.bind('1'))



//Sticky Navigation 

// const initialCoords = section1.getBoundingClientRect()

// window.addEventListener('scroll', function () {


// if(window.scrollY > initialCoords.top )
// nav.classList.add('sticky')
// else nav.classList.remove('sticky')
// })

// const obsFuntion = function (entries, observer) {
//   entries.forEach(entry => {
// console.log(entry)
//   })
// console.log(observer)
// } // it takes entries as the first argument, and of the threshold is an array of values, then we can loop over the entries.



// const obsOption = {
//   root: null,
//   threshold: [0, 0.2],
// }


// const observer = new IntersectionObserver(obsFuntion, obsOption) // It takes a callback function and options objects which contain null(the reference to which we want to observe) qnd threshold (the percentage of observance). in tbe observer call back function, we give to argument, on is referencimg to the threshold in the options object and other is referring to the observer function itself.

// observer.observe(section1) // i.e use th observer to observe thr section1

const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height

const stickyNav = function (entries) {
  const [entry] = entries;
  
  if (!entry.isIntersecting) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }
}


const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px` //it gives margin to the header, the negative gives ot margin bottom so it actually move up and the threshold will start at that new place,
})

headerObserver.observe(header)

/////////////////////////////////
//Revwal Sections 
const allSections = document.querySelectorAll('.section')


const revealSection = function (entries, observer) {
const [entry] = entries
if (!entry.isIntersecting) return // Guard clause

entry.target.classList.remove('section--hidden')
observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold:0.2
})

allSections.forEach( function (section) {
  section.classList.add('section--hidden')
  sectionObserver.observe(section)
})


////////////////////////////////////
///LAZY LOADING

const imgTargets = document.querySelectorAll('img[data-src]')

const loadImg = function (entries, observer) {
  const [entry] = entries
  
  entry.target.src = entry.target.dataset.src
  
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img')
  })
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', //this is telling the observe to do it 200px before getting to the image, so users won't detect 
})

imgTargets.forEach(img => imgObserver.observe(img))



//////////////////////////////////
/////////////////////////////////

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

// const h1 = document.querySelector('h1');

// //Going downwards
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// //Going upwards
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var( --gradient-secondary)';
// h1.closest('h1').style.background = 'var( --gradient-primary)';


// //Going Sideways: siblings 
// console.log(h1.previousElementSibling)
// console.log(h1.nextElementSibling)

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)'
// })