var scroll = window.requestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000 / 60) };



const callback = function(entries, observer) {


    entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
            entry.target.classList.add("sa-animate");
        } else {
            if (entry.target.dataset.saArg != "one-shot") {
                entry.target.classList.remove("sa-animate");
            }



        }

    });
};

const observer = new IntersectionObserver(callback);

const targets = document.querySelectorAll("[data-sa]");
targets.forEach(function(target) {
    target.classList.add("sa-init");

    if (target.dataset.saArg != "standalone") {
        observer.observe(target);
    }

    if (target.dataset.saTarget) {
        //En fait le transition end s'arrete à partir du délai, il n'effectue pas les courbe. Une centaine d'heure dans le projet et je m'en rend compte que smaintenant

        target.ontransitionend = function() {
            let toAnimate = document.querySelectorAll(target.dataset.saTarget)
            toAnimate.forEach(function(item) {
                item.classList.add("sa-animate")
            })

            target.ontransitionend = null;
        }

    }
})