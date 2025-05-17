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

emailjs.init({
    publicKey: 'mFFf6rVBltk8xYYab'
  });
  
  document.getElementById("contact-form").addEventListener("submit", function(event) {
      event.preventDefault();
  
      emailjs.sendForm('service_fte7loi', 'template_b8wk0g5', this)
          .then(function(response) {
              console.log('SUCCESS!', response.status, response.text);
              document.getElementById("contact-form").reset();
              alert("Form Submitted Successfully");
          }, function(error) {
              console.log('FAILED...', error);
              alert("Form Submission Failed! Try Again");
          });
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
    strings: [
  "Scalable AI & Data Systems","Applied Machine Learning Research","Distributed Intelligence & Real-Time Inference","ML, Deep Learning & Scientific Computing","Advance Data Pipelines Architecture"],
    loop: true,
    typeSpeed: 80,
    backSpeed: 25,
    backDelay: 100,
});
// <!-- typed js effect ends -->

// Dummy data: Replace this with your JSON or fetch call
const projects = [
  {
    name: "Multitask Learning for Arabic Dialects",
    desc: "This research-focused project explored multitask learning (MTL) techniques for handling various NLP tasks in Arabic dialects, including machine translation, sentiment classification, and diacritization. Implemented a shared-encoder transformer architecture with hierarchical heads and multi-objective optimization. Results showed strong gains over single-task baselines, including a 58% BLEU improvement and 16-point classification accuracy increase. The study contributed to underrepresented language modeling and was co-supervised by academic researchers.",
    image: "./assets/images/projects/data.png",
    codeLink: "https://github.com/STALPHA2708/Arabic-Dialects-MTL"
  },
  {
    name: "Real-Time AI Pipeline for PPE Detection",
    desc: "Developed a full-stack AI system using YOLOv8 for detecting safety equipment in live video. Integrated Kafka, Spark, Trino, and dbt for data handling and monitoring with Grafana. Designed for scalability and industrial deployment.",
    image: "./assets/images/projects/data.png",
    codeLink: "https://github.com/STALPHA2708/PPE-Detection"
  },
  {
    name: "Neural Machine Translation – English to Darija",
    desc: "Built a custom neural translation model for English-to-Moroccan Arabic (Darija) using MarianMT. Applied dialect-specific tokenization and fine-tuning to improve translation fluency for domain-specific use cases.",
    image: "./assets/images/projects/data.png",
    codeLink: "https://github.com/STALPHA2708/Darija-Translation"
  },
  {
    name: "Sentiment Analysis for Cancer Patients",
    desc: "Designed a sentiment analysis tool using transformer-based models to analyze emotional states in cancer support forums. Helped surface emotional patterns to support patient-centered care research.",
    image: "./assets/images/projects/data.png",
    codeLink: "https://github.com/STALPHA2708/Cancer-Sentiment-NLP"
  },
  {
    name: "ELK-based Server Log Visualization",
    desc: "Created a pipeline using Elasticsearch, Logstash, Kibana, and PostgreSQL to analyze and visualize system logs in real time. Designed for anomaly detection and DevOps support.",
    image: "./assets/images/projects/data.png",
    codeLink: "https://github.com/STALPHA2708/ELK-Log-Pipeline"
  },
  {
    name: "Twitter Sentiment Analysis",
    desc: "Analyzed public sentiment on social topics using tweets. Applied text preprocessing, vectorization, and machine learning models like Naive Bayes and LSTM to classify emotional tone.",
    image: "./assets/images/projects/data.png",
    codeLink: "https://github.com/STALPHA2708/Twitter-Sentiment"
  },
  {
    name: "AI-Based Academic Plagiarism Detection",
    desc: "Built a plagiarism detection system using TF-IDF, SVM, and Random Forest to detect non-obvious similarity across academic submissions. Included multilingual support and visual feedback.",
    image: "./assets/images/projects/data.png",
    codeLink: "https://github.com/STALPHA2708/AI-Plagiarism-Detector"
  }
];


function displayCardStack() {
  const container = document.querySelector('.card-stack');
  container.innerHTML = '';

  projects.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    if (index === 0) card.classList.add('active');

    card.innerHTML = `
      <img src="${project.image}" alt="${project.name}">
      <h3>${project.name}</h3>
      <p>${project.desc}</p>
      <a href="${project.codeLink}" target="_blank" class="btn">View Code</a>
    `;

    card.addEventListener('click', () => {
  card.classList.remove('active');
  const next = card.nextElementSibling;

  if (next && next.classList.contains('card')) {
    next.classList.add('active');
  } else {
    // If no next card, restart from the first
    const first = document.querySelector('.card-stack .card:first-child');
    if (first) first.classList.add('active');
  }
});


    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', displayCardStack);

  


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
//var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
//(function () {
    //var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
   // s1.async = true;
    //s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
//s1.charset = 'UTF-8';
    //s1.setAttribute('crossorigin', '*');
    //s0.parentNode.insertBefore(s1, s0);
//})();
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
