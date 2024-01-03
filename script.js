const panelsheader = document.querySelectorAll('.container-header .panel');

function removeActiveClasses(panels) {
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
}

panelsheader.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActiveClasses(panelsheader);
        panel.classList.add('active');

        var panelName = panel.getAttribute('data-panel');
        var contentDiv = document.getElementById(panelName + '-content');
        document.getElementById('content').innerHTML = contentDiv.innerHTML;
        if (panelName == 'projects' || panelName == 'certifications') {
            const panelsbody = document.querySelectorAll('.container-body .panel');
            panelsbody[0].classList.add('active');
            var firstPanelName = panelsbody[0].getAttribute('data-panel');
            var firstContentDiv = document.getElementById(firstPanelName + '-body-content');
            document.getElementById('body-content').innerHTML = firstContentDiv.innerHTML;
            panelsbody.forEach(panel => {
                panel.addEventListener('click', () => {
                    removeActiveClasses(panelsbody);
                    panel.classList.add('active');
                    var panelName = panel.getAttribute('data-panel');
                    var contentDiv = document.getElementById(panelName + '-body-content');
                    document.getElementById('body-content').innerHTML = contentDiv.innerHTML;
                    document.getElementById('body-content').scrollIntoView({ behavior: "smooth" });
                });
            });
        }
        document.getElementById('content').scrollIntoView({ behavior: "smooth" });
    });
});



const title = 'WELCOME TO MY PORTFOLIO';
let i = 0;

function typeWriter() {
    if (i < title.length) {
        document.getElementById('title').innerHTML += title.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    } else {
        document.getElementById('title').style.animation = 'none';
        setTimeout(() => {
            document.getElementById('title').innerHTML = '';
            document.getElementById('title').style.animation = '';
            i = 0;
            let newTitle = document.getElementById('title').cloneNode(true);
            document.getElementById('title').parentNode.replaceChild(newTitle, document.getElementById('title'));
            setTimeout(typeWriter, 2000);
        }, 3000);
    }
}

setTimeout(typeWriter, 2000);
document.getElementById('content').innerHTML = document.getElementById('about-me-content').innerHTML;
