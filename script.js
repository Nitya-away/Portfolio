var times = 0;
var progressBarAnimated = false;


window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loadingscreen').style.display = 'none';
  }, 1200);
});

let projectcards = Array.from(document.getElementsByClassName("projectcards"));

projectcards.forEach((card) => {
    card.addEventListener('click', () => {
        const link = card.getAttribute('data-link');
        if (link) window.open(link, '_blank');
    });
});

function move() {
    let root = document.querySelector(':root');
    let metertext = document.querySelectorAll('.metertext');

    let targetValues = [];
    let currentValues = [];


    metertext.forEach((text) => {
        targetValues.push(parseInt(text.innerText));
        currentValues.push(0);
        text.innerText = '0%';
    });

    let cssProps = ['--hpos', '--cpos', '--jpos', '--pypos', '--sqlpos'];
    let id = setInterval(frame,20);

    function frame() {
        let allDone = true;

        for (let i = 0; i < currentValues.length; i++) {
            if (currentValues[i] < targetValues[i]) {
                currentValues[i]++;
                metertext[i].innerText = currentValues[i] + '%';
                root.style.setProperty(cssProps[i], currentValues[i] + '%');
                allDone = false;
            }
        }
        if (allDone) clearInterval(id);
    }
}

function animateProgressBar(section) {
    const skillMeters = section.querySelectorAll('.skillmeter');
    const targetFills = [10,8,9,7,8,5];

    skillMeters.forEach((meter, meterIndex) => {
        const progressBoxes = meter.querySelectorAll('.progressbox');
        const targetFill = targetFills[meterIndex] || 0;
        let currentFill = 0;

        const fillInterval = setInterval(() => {
            if (currentFill < targetFill) {
                progressBoxes[currentFill].style.backgroundColor = '#E11D74';
                currentFill++;
            } else {
                clearInterval(fillInterval);
            }
        }, 80);
    });
}

function isInViewport(element) {
    let b = element.getBoundingClientRect();
    return (
        b.top >= 0 &&
        b.left >= 0 &&
        b.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        b.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}


window.addEventListener('scroll', () => {
    let skillsSection = document.querySelector('.myintro');
    if (isInViewport(skillsSection) && times === 0) {
        times = 1;
        move();
    }

    if (!progressBarAnimated) {
        let allSections = document.querySelectorAll('.myintro');
        let toolsSection = allSections[allSections.length - 1];
        if (toolsSection && isInViewport(toolsSection)) {
            progressBarAnimated = true;
            animateProgressBar(toolsSection);
        } 
    }
});