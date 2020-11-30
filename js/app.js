let body = document.querySelector('body')
let sidemenuList = document.querySelector('#menuList').childNodes

let header = body.querySelector("header")
let overlay = body.querySelector("#overlay-container")

let overlayGrid = overlay.querySelector(".grid-holder")

let info = overlay.querySelector(".overlay-info")
let infoDiv = info.querySelector("div")

const transitionEnd = transitionEndEventName();

let moreinfo = document.querySelector(".background-container-in")
let gridcont = moreinfo.querySelector(".grid-holder-in")
let buttons = document.querySelectorAll(".btn")

window.addEventListener("DOMContentLoaded", (event) => {
    window.scrollTo(0, 0)

    buttons.forEach((button) => {
        if (button.id == "btn-cv") {
            button.addEventListener("mouseenter", function(e) {
                button.children[0].classList.add("btn-active")
                button.children[0].innerHTML = "..."
            })
            button.addEventListener("mouseleave", function(e) {
                button.children[0].classList.remove("btn-active")
                button.children[0].innerHTML = "CV"
            })
        } else {
            button.addEventListener("mouseenter", function(e) {
                button.children[0].classList.add("btn-active")
                button.children[0].innerHTML = "+"
                    //firstchild dont work I don't know why and I don't have the time left for debug
            })
            button.addEventListener("mouseleave", function(e) {
                button.children[0].classList.remove("btn-active")
                button.children[0].innerHTML = "PLUS"
            })
        }
    })


})








function brandClick() {


    if (overlay.classList.contains('overlay-active')) {
        //What to do when class is removed

        for (let i = 0; i < infoDiv.children.length; i++) {

            infoDiv.children[i].classList.remove("sa-animate");
        }

        infoDiv.children[1].ontransitionend = () => {
            header.style.color = "black"
            overlay.classList.remove('overlay-active')



            //Prevent multiple running by redefing the func
            infoDiv.children[1].ontransitionend = () => {}
        }

    } else {
        //Make overlay visible
        overlay.ontransitionend = () => {
            for (let i = 0; i < infoDiv.children.length; i++) {

                infoDiv.children[i].classList.add("sa-animate");
            }
            //Prevent multiple running by redefing the func
            overlay.ontransitionend = () => {}

        }
        header.style.color = "#F1F1F1";
        overlay.classList.add('overlay-active')
            // overlay.addEventListener(transitionEnd, myfunc)

    }


}


function dumbfunc() {};

function learnMore(target) {

    childs = moreinfo.querySelectorAll(".content-in")
    let tar = document.querySelector(target)
    let alreadyDisplayed = false;
    let childOn = tar;
    childs.forEach(function(child) {
        //Si il est en "block" ET que j'ai pas cliqué dessus (donc celui que j'ai laissé derière moi)
        if (child.style.display != 'none') {
            if (tar !== child) {
                childOn = child;
                alreadyDisplayed = true;
            }
        }
    })
    if (alreadyDisplayed == false) {
        tar.style.display = 'block'
    }

    if (alreadyDisplayed) {
        moreinfo.ontransitionend = function() {
            if ((childOn.style.display == "block" || tar.style.display == "block") && !moreinfo.classList.contains('info-visible')) {
                childs.forEach(function(child) {
                    child.style.display = 'none';
                })
            }


            learnMore(target); //Here is my Recursive bitch. je suis fier oui. Mon état mental se dégrade beaucoup trop rapidement ptn

            moreinfo.ontransitionend = null;
        }
    } else {
        moreinfo.ontransitionend = function() {
            if ((childOn.style.display == "block" || tar.style.display == "block") && !moreinfo.classList.contains('info-visible')) {
                childs.forEach(function(child) {
                    child.style.display = 'none';
                })
            }
            // window.scrollTo(0, moreinfo.offsetTop); //More clean than scrollToView but removed because it cause a bug when switching 

            moreinfo.ontransitionend = null;
        }
    }

    if (moreinfo.classList.contains('info-visible')) {
        moreinfo.style.height = 0 + "px";
        sidemenuList.forEach(function(li) {
            li.style = "background-color: transparent";
        })


    } else {
        moreinfo.style.height = moreinfo.scrollHeight + "px";
        sidemenuList.forEach(function(li) {
            li.style = "background-color: rgba(241, 241, 241, 1);";
        })
    }
    moreinfo.classList.toggle('info-visible');
}

function transitionEndEventName() {
    var i,
        undefined,
        el = document.createElement('div'),
        transitions = {
            'transition': 'transitionend',
            'OTransition': 'otransitionend', // oTransitionEnd in very old Opera
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        };

    for (i in transitions) {
        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
            return transitions[i];
        }
    }

    //TODO: throw 'TransitionEnd event is not supported in this browser'; 
}

//Scrolling
// Pure javascript was causing bug so I switched to Jquery even tho j'aimerais tout faire qu'avec du vanilla
$.fn.moveIt = function() {
    var $window = $(window);
    var instances = [];

    $(this).each(function() {
        instances.push(new moveItItem($(this)));
    });

    window.addEventListener(
        "scroll",
        function() {
            var scrollTop = $window.scrollTop();
            instances.forEach(function(inst) {
                inst.update(scrollTop);
            });
        }, { passive: true }
    );
};

var moveItItem = function(el) {
    this.el = $(el);
    this.speed = parseFloat(this.el.attr("data-scroll-speed"));
};

moveItItem.prototype.update = function(scrollTop) {
    this.el.css("transform", "translateY(" + -((scrollTop) / this.speed) + "px)");
};

// Initialization
$(function() {

    $("[data-scroll-speed]").moveIt();
});