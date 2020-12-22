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
    navbarMenu.classList.remove('active');
    scrollIntoView(link);
    selectNavItem(target);
});


//스크롤링 따라 네비게이션바 메뉴 활성화
const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#works',
    '#testimonial',
    '#contact' 
];

const sections = sectionIds.map(id=>document.querySelector(id));
const navItems = sectionIds.map(id=>
    document.querySelector(`[data-link="${id}"]`)
);

let selectedNavItem = navItems[0];
let selectedNavIndex=0;
function selectNavItem(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
};

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
};

const observer = new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
        if(!entry.isIntersecting && entry.intersectionRatio>0){
            const index = sectionIds.indexOf(`#${entry.target.id}`);

            if(entry.boundingClientRect.y<0){
                selectedNavIndex = index+1;
            } else {
                selectedNavIndex = index-1;
            }
        }
    });   
    
},observerOptions);
sections.forEach(section=>observer.observe(section));

window.addEventListener('wheel',()=>{
    if(window.scrollY===0){
        selectedNavIndex=0;
    } else if(Math.round(window.scrollY+window.innerHeight) >= document.body.clientHeight){
        selectedNavIndex=navItems.length-1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});



//화면 작을 때 버튼 클릭하면 네비게이션 메뉴 나타나게하기
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');

navbarToggleBtn.addEventListener('click',()=>{
    navbarMenu.classList.toggle('active');
});


//home 스크롤 시 불투명
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll',()=>{
    const opacity = (1-window.scrollY/homeHeight);
    home.style.opacity = opacity;
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
    const top = scrollTo.offsetTop-navbarHeight<0
    ?0:scrollTo.offsetTop-navbarHeight;
    window.scrollTo({behavior:'smooth', top:top});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}



