var times = 0;
var progressBarAnimated = false;


window.addEventListener('load' , () => {
    document.getElementById('loadingscreen').style.display = 'none';
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