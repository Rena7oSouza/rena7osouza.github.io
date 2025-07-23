// ================================
// DOM ELEMENTS SELECTION
// ================================

const open_btn = document.querySelector('.open-btn');
const close_btn = document.querySelector('.close-btn');
const nav = document.querySelectorAll('.my-nav');
const mainContent = document.getElementById('main-content');
const menuItems = document.querySelectorAll('.list li a');
const sections = document.querySelectorAll('section');
const projectList = document.getElementById("projectList");
const filterButtons = document.querySelectorAll('.filter-btn');

// ================================
// INITIAL PAGE LOAD
// ================================

window.addEventListener('DOMContentLoaded', () => {
    const aboutMeLink = document.querySelector('a[href="#about"]');
    if (aboutMeLink) {
        changeContent.call(aboutMeLink, { preventDefault: () => { } }); // Opens "About Me" by default
    }

    generateCardsFromJson(); // Generate project cards on page load
});

// ================================
// HIDE ALL SECTIONS EXCEPT HEADER
// ================================

sections.forEach(section => {
    if (section.id !== 'header') {
        section.style.display = 'none';
    }
});

document.getElementById('about').style.display = 'block';

// ================================
// MENU ITEM TO SECTION ID MAPPING
// ================================

const idMap = {
    'About Me': 'about',
    'Skills': 'skills',
    'Graduations': 'graduations',
    'Courses': 'courses',
    'HTML/CSS': 'html-css',
    'Python': 'python',
    'Contact Me': 'contact'
};

// ================================
// FUNCTION TO SWITCH CONTENT
// ================================

function changeContent(e) {
    e.preventDefault();
    const contentId = idMap[this.textContent];
    const contentElement = document.getElementById(contentId);
    if (contentElement) {
        sections.forEach(section => {
            if (section.id !== 'header') {
                section.style.display = 'none';
            }
        });

        contentElement.style.display = 'block';
        // Reset filter to show all projects in the new section
        filterProjects('all');
    }
}

// ================================
// MENU CLICK EVENT HANDLERS
// ================================

menuItems.forEach(item => {
    item.addEventListener('click', changeContent);
});

// Project menu toggle
function handleProjectClick() {
    if (projectList.style.display === "none") {
        projectList.style.display = "block";
    } else {
        projectList.style.display = "none";
    }

    if (projectList.style.maxHeight) {
        projectList.style.maxHeight = null;
    } else {
        projectList.style.maxHeight = projectList.scrollHeight + "px";
    }
}

// Certifications menu toggle
function handleCertificationsClick() {
    if (certificationsList.style.display === "none") {
        certificationsList.style.display = "block";
    } else {
        certificationsList.style.display = "none";
    }

    if (certificationsList.style.maxHeight) {
        certificationsList.style.maxHeight = null;
    } else {
        certificationsList.style.maxHeight = certificationsList.scrollHeight + "px";
    }
}

document.getElementById("projects")?.addEventListener("click", handleProjectClick);
document.getElementById("certifications")?.addEventListener("click", handleCertificationsClick);

// ================================
// SIDEBAR OPEN/CLOSE FUNCTIONS
// ================================

open_btn.addEventListener('click', () => {
    nav.forEach(nav_el => nav_el.classList.add('visible'));
    document.body.classList.add('menu-open');
});

close_btn.addEventListener('click', () => {
    nav.forEach(nav_el => nav_el.classList.remove('visible'));
    document.body.classList.remove('menu-open');
    mainContent.classList.add('menu-closing');
});

mainContent.addEventListener('transitionend', function () {
    mainContent.classList.remove('menu-closing');
});

// ================================
// TYPING EFFECT FUNCTION
// ================================

let titles = ['Hello, I\'m Renato Souza', 'Welcome to my portfolio!'];
let i = 0;
let titleIndex = 0;

function typeWriter() {
    if (i < titles[titleIndex].length) {
        document.getElementById('title').innerHTML += titles[titleIndex].charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    } else {
        document.getElementById('title').style.animation = 'none';
        let delayBeforeNextTitle = titles[titleIndex] === 'Hello, I\'m Renato Souza' ? 0 : 2000;
        setTimeout(() => {
            document.getElementById('title').innerHTML = '';
            document.getElementById('title').style.animation = '';
            i = 0;
            titleIndex = (titleIndex + 1) % titles.length;
            let newTitle = document.getElementById('title').cloneNode(true);
            document.getElementById('title').parentNode.replaceChild(newTitle, document.getElementById('title'));
            setTimeout(typeWriter, delayBeforeNextTitle);
        }, 3000);
    }
}
typeWriter();

// ================================
// GENERATE PROJECT CARDS FROM JSON
// ================================

async function generateCardsFromJson() {
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();

        projects.forEach(project => {
            const section = document.getElementById(project.category);
            if (!section) {
                console.warn(`Section with id "${project.category}" not found.`);
                return;
            }

            const row = section.querySelector('.row');
            if (!row) {
                console.warn(`No .row found in section "${project.category}".`);
                return;
            }

            const card = document.createElement('div');
            card.className = 'col-md-3 col-sm-6 my-3 project-card';

            // Build data-tech attribute with all badges alt text
            const techs = project.badges.map(badge => badge.alt.toLowerCase()).join(' ');
            card.setAttribute('data-tech', techs);

            card.innerHTML = `
                <div class="project-cards">
                    <div class="project-cards-video-container">
                        <iframe class="project-cards-video-top"
                            src="${project.videoUrl}" frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                    </div>

                    <div class="project-cards-body">
                        <h5 class="project-cards-title">${project.title}</h5>
                        <p class="project-cards-text">${project.description}</p>
                    </div>

                    <div class="project-cards-footer">
                        <h5>This project uses:</h5>
                        <div class="project-cards-footer-images">
                            ${project.badges.map(badge => `
                                <img src="${badge.src}" alt="${badge.alt}" class="project-cards-footer-img">
                            `).join('')}
                        </div>
                    </div>

                    <div class="project-cards-footer-links">
                        <h5>Links:</h5>
                        <div class="row justify-content-center">
                            <div class="col-6 col-md-6">
                                <a href="${project.githubLink}" target="_blank">
                                    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"
                                        alt="GitHub" class="project-cards-footer-lnk img-fluid" style="cursor: pointer;">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            row.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// ================================
// FILTER PROJECTS BY TECHNOLOGY
// ================================

function filterProjects(tech) {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        if (tech === 'all' || card.dataset.tech.includes(tech)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add event listeners to filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tech = button.dataset.tech;
        filterProjects(tech);
    });
});
