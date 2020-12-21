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


//네비게이션 버튼 스크롤링

const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click',(event)=>{
    const target = event.target;
    const link = target.dataset.link;
    
    if(link==null){
        return;
    }

    console.log(link);
    const scrollTo = document.querySelector(link);
    console.log(scrollTo);
    scrollTo.scrollIntoView({behavior:'smooth', block:'start'});
});



