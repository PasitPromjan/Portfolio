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
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Projects | Portfolio Jigar Sable";
            $("#favicon").attr("href", "/assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "/assets/images/favhand.png");
        }
    });


// fetch projects start
function getProjects() {
    return fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            return data
        });
}


function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";
    projects.forEach((project, index) => {
    projectsHTML += `
      <div class="pro-item tilt " data-index="${index}" data-img="${project.image}">
        <p class="pro-name">${project.name}</p> 
        <i class="pro-play"> <img src="https://www.rafaelalucas.com/dailyui/16/assets/play.svg" alt = "" ></i>
        <img class="pro-image" src="../assets/images/pro/${project.image}" style="object-fit: cover; object-position: top;" alt="">
      </div>
      `;
  });
    projectsContainer.innerHTML = projectsHTML;

    // vanilla tilt.js
    // VanillaTilt.init(document.querySelectorAll(".tilt"), {
    //     max: 20,
    // });
    // // vanilla tilt.js  

    // /* ===== SCROLL REVEAL ANIMATION ===== */
    // const srtop = ScrollReveal({
    //     origin: 'bottom',
    //     distance: '80px',
    //     duration: 1000,
    //     reset: true
    // });

    // /* SCROLL PROJECTS */
    // srtop.reveal('.work .box', { interval: 200 });

    // isotope filter products
    var $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
    });

    // filter items on button click
    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
      });
    
      /* ===== SCROLL REVEAL ANIMATION ===== */
      const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
      });
    
      /* SCROLL PROJECTS */
      srtop.reveal('.work .box', { interval: 200 });
    
      // Select elements
      const videoItem = document.querySelectorAll('.pro-item'),
        modalVideo = document.querySelector('.modal'),
        modalImage = document.getElementById('modal-main-1'),
        iconCloseVideo = document.querySelector('.modal-icon'),
        body = document.querySelector('body'),
        htmlImage = document.getElementById('modal-html'),
        cssImage = document.getElementById('modal-css'),
        jsImage = document.getElementById('modal-js');
    
      videoItem.forEach(function (el) {
        el.addEventListener("click", openVideo);
      });
    
      iconCloseVideo.addEventListener("click", closeVideo);
    
      function openVideo(e) {
        const myLayout = document.getElementById("modal-container");
        myLayout.scrollTop = 0;
    
    
        const projectIndex = e.currentTarget.dataset.index,
         imgSrc = projects[projectIndex].image,
         imghtml = projects[projectIndex].image_main.html,
         imgcss = projects[projectIndex].image_main.css,
         imgjs = projects[projectIndex].image_main.js;
    
    
        modalImage.src = `../assets/images/pro/${imgSrc}`;
        htmlImage.src = `../assets/images/pro/${imghtml}`;
        jsImage.src = `../assets/images/pro/${imgjs}`;
        cssImage.src = `../assets/images/pro/${imgcss}`;
    
        setTimeout(() => {
          modalVideo.classList.add('open');
        }, 300);
    
        body.style.overflow = "hidden";
      }
    
      
    
      bgCloseVideo = document.querySelector('.modal-bg')
      bgCloseVideo.addEventListener("click", trigger);
      function trigger() {
    
        console.log("ddd")
    
      }
    
      function closeVideo() {
        
          modalVideo.classList.remove('open');
          videoFrame.src = "";
    
      }
    
      if (window.innerWidth > 799) {
        document.querySelector('.box-container').style.height = window.innerHeight + "px";
    
      }
      document.querySelector('.modal').style.height = window.innerHeight + "px";
}

modalVideo = document.querySelector('.modal')
bgCloseVideo = document.querySelector('.modal-bg')
bgCloseVideo.addEventListener("click", trigger);
function trigger() {

  modalVideo.classList.remove('open');
  videoFrame.src = "";
}

getProjects().then(data => {
    showProjects(data);
})
// fetch projects end

// Start of Tawk.to Live Chat
/* var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})(); */
// End of Tawk.to Live Chat

// disable developer mode
/* document.onkeydown = function (e) {
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
} */
document.addEventListener('DOMContentLoaded', () => {
    const switchToggle = document.querySelector('.toggle');
    const savedTheme = localStorage.getItem('theme');

    function switchMode(e) {
        const theme = e.target.checked ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // ตรวจสอบว่ามีค่า theme ที่บันทึกไว้หรือไม่
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        switchToggle.checked = savedTheme === 'light';
    }

    switchToggle.addEventListener('change', switchMode);
});

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');

    // ตรวจสอบว่ามีค่า theme ที่บันทึกไว้หรือไม่
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
});