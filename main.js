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
    const opacity = (1-window.scrollY/homeHeight);
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


//arrow up 버튼 스크롤시 보여주기 
const arrowBtn = document.querySelector('#arrow-btn');

document.addEventListener('scroll', ()=>{
    if(window.scrollY>homeHeight/2){
        arrowBtn.classList.add('visible');
    } else {
        arrowBtn.classList.remove('visible');
    }
});

arrowBtn.addEventListener('click',()=>{
    scrollIntoView('#home');
});


//프로젝트 버튼 필터링
const workBtnContainer =document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click',(event)=>{
    const filter=event.target.dataset.filter || event.target.parentNode.dataset.filter;
    if(filter==null){
        return;
    }

    //이전 선택된 버튼 없애고 새로운 버튼에 효과 적용하기
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = 
    event.target.nodeName ==='BUTTON' ? event.target : event.target.parentNode;
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');

    setTimeout(()=>{

        projects.forEach((project)=>{
            if(filter==='*' || filter ===project.dataset.type){
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            } 
        }); 

        projectContainer.classList.remove('anim-out');
    },250);
    
    
});


//이동함수
function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
}



