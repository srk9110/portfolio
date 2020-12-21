'use strict';

//네비게이션 투명<->불투명 
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', ()=>{
    if(window.scrollY>navbarHeight){
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

//home 스크롤 시 불투명
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll',()=>{
    const opacity = (1-scrollY/homeHeight);
    home.style.opacity = opacity;
});


//네비게이션 버튼 스크롤링
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click',(event)=>{
    const target = event.target;
    const link = target.dataset.link;
    
    if(link==null){
        return;
    }
    scrollIntoView(link);
});


//contact me 버튼 스크롤링

const contactMeBtn = document.querySelector('.home__contact');
contactMeBtn.addEventListener('click',()=>{
    scrollIntoView('#contact');
});

//이동함수
function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
}




