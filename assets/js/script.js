$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("public");
        emailjs.sendForm('service_fte7loi', 'template_b8wk0g5', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Med";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Bigdata Technologies", "Generative AI", "ML, Deep Learning & NLP"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

// Dummy data: Replace this with your JSON or fetch call
const projects = [
    {
        name: "Churn Model",
        desc: "Customer churn is a significant issue for many businesses, and predicting churn can help companies take preventive actions. This project provides a web-based platform for predicting customer churn using a machine learning model. The platform is built using Streamlit, a popular Python framework for creating web applications with ease.",
        image: "A Smarter Way To Reduce Customer Churn", 
        codeLink: "https://github.com/STALPHA2708/ChurnModel"
    },
    {
        name: "Credit-Card-Clustering",
        desc: "Clustering credit cards is a data-driven technique used to group credit card customers into different segments based on their spending behavior, demographic information, or financial attributes. This is typically done to identify distinct customer profiles, tailor marketing strategies, manage risk, or optimize credit card offers.",
        image: "Banking card design",
        codeLink: "https://github.com/STALPHA2708/Credit-Card-Clustering"
    },
    {
        name: "AI VS Human",
        desc: "Detecting AI-generated content involves building a machine learning model that classifies text data. This project demonstrates expertise in handling imbalanced datasets, implementing robust classification models, and using both traditional machine learning techniques and deep learning frameworks to achieve accurate detection.",
        image: "AI VS HUMAN",
        codeLink: "https://github.com/STALPHA2708/AI-Vs-Human"
    },
    {
        name: "Impact of Activities on Academic Performance",
        desc: "This project investigates the effect of extracurricular activities on students' academic performance through data analysis and visualization. The study explores how students manage time between activities and academics. This project demonstrates my ability to collect, analyze, and interpret survey data using visualizations and statistical techniques.",
        image: "data",
        codeLink: "https://github.com/STALPHA2708/ProjetIntegrer"
    },
    {
        name: "Face Landmarks Detection",
        desc: "This project focuses on detecting key facial landmarks, such as eyes, nose, mouth, and jawline, using CV and ML techniques. Applications include facial recognition, emotion analysis, augmented reality filters, and improving human-computer interaction. It demonstrates proficiency in leveraging AI for real-time facial feature analysis and tracking.",
        image: "landmarks",
        codeLink: "https://github.com/STALPHA2708/FaceLandmarkDetection"
    },
    {
        name: "Amazon Recommendation System",
        desc: "This project demonstrates how to build a recommendation system for Amazon-style product recommendations using Python. The system provides personalized recommendations based on product similarity and review scores, leveraging collaborative filtering techniques with minimal dependencies. Plus Fast API",
        image: "recomendation",
        codeLink: "https://github.com/STALPHA2708/Amzon-RecSys"
    }
  ];
  
  // Function to display the projects
function displayProjects() {
    const projectContainer = document.querySelector('.project-container');
    let projectHTML = '';

projects.forEach(project => {
    projectHTML += `
        <div class="project-box">
         <img src="./assets/images/projects/${project.image}.png" alt="${project.name}">
          <div class="content">
            <h3>${project.name}</h3>
            <p>${project.desc}</p>
            <div class="btns">
              <a href="${project.codeLink}" target="_blank" class="btn">View Code</a>
            </div>
          </div>
        </div>
      `;
    });
  
    projectContainer.innerHTML = projectHTML;
  }
  
  // Call the function to display projects on page load
document.addEventListener('DOMContentLoaded', displayProjects);
  


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat


/* ===== SCROLL REVEAL ANIMATION ===== */
// // Call the function to display projects on page load
// document.addEventListener('DOMContentLoaded', displayProjects);

// // ScrollReveal (optional)
// const srtop = ScrollReveal({
//   origin: 'bottom',
//   distance: '50px',
//   duration: 1000,
//   reset: true
// });

// /* SCROLL HOME */
// srtop.reveal('.home .content h3', { delay: 100 });
// srtop.reveal('.home .content p', { delay: 100 });
// srtop.reveal('.home .content .btn', { delay: 100 });

// srtop.reveal('.home .image', { delay: 400 });
// srtop.reveal('.home .linkedin', { interval: 600 });
// srtop.reveal('.home .github', { interval: 800 });
// srtop.reveal('.home .twitter', { interval: 1000 });
// srtop.reveal('.home .telegram', { interval: 600 });
// srtop.reveal('.home .instagram', { interval: 600 });
// srtop.reveal('.home .dev', { interval: 600 });

// /* SCROLL ABOUT */
// srtop.reveal('.about .content h3', { delay: 200 });
// srtop.reveal('.about .content .tag', { delay: 200 });
// srtop.reveal('.about .content p', { delay: 200 });
// srtop.reveal('.about .content .box-container', { delay: 200 });
// srtop.reveal('.about .content .resumebtn', { delay: 200 });


// /* SCROLL SKILLS */
// srtop.reveal('.skills .container', { interval: 200 });
// srtop.reveal('.skills .container .bar', { delay: 400 });

// /* SCROLL EDUCATION */
// srtop.reveal('.education .box', { interval: 200 });

// /* SCROLL PROJECTS */
// srtop.reveal('.project-box', { interval: 200 });

// /* SCROLL EXPERIENCE */
// srtop.reveal('.experience .timeline', { delay: 400 });
// srtop.reveal('.experience .timeline .container', { interval: 400 });

// /* SCROLL CONTACT */
// srtop.reveal('.contact .container', { delay: 400 });
// srtop.reveal('.contact .container .form-group', { delay: 400 });
