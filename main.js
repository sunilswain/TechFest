

document.addEventListener('DOMContentLoaded', function() {
    // Morph Animation
    var interBubble = document.querySelector('.interactive');
    var curX = 0;
    var curY = 0;
    var tgX = 0;
    var tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = "translate(" + Math.round(curX) + "px, " + Math.round(curY) + "px)";
        requestAnimationFrame(function() {
            move();
        });
    }

    window.addEventListener('mousemove', function(event) {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();

    //
    function updateProgressBar(){
        const {scrollTop, scrollHeight} = document.querySelector(".front");
        const scrollPercent = scrollTop / (scrollHeight - window.innerHeight) * 100 + '%';
        document.querySelector('.percentage-scrollbar').style.setProperty('--progress', scrollPercent);
    }
    
    document.querySelector(".front").addEventListener('scroll', updateProgressBar);

    // Scroll To Top
    var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath.getTotalLength();

    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

    var updateProgress = function() {
        var scroll = document.querySelector(".front").scrollTop;
        var height = document.querySelector(".front").scrollHeight - window.innerHeight;
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }

    updateProgress();
    document.querySelector(".front").addEventListener('scroll', updateProgress);

    var offset = 50;
    var duration = 550;

    document.querySelector(".front").addEventListener('scroll', function() {
        if (document.querySelector(".front").scrollTop > offset) {
            document.querySelector('.progress-wrap').classList.add('active-progress');
        } else {
            document.querySelector('.progress-wrap').classList.remove('active-progress');
        }
    });

    document.querySelector('.progress-wrap').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector(".front").scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Animate on Scroll down
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting) {
                entry.target.classList.add("show");
            }
            else {
                entry.target.classList.add("show");
            }
        });
    });

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));
});
