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
        emailjs.init("C55AbtWUsLTEnY7tj");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
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
            document.title = "Pasit Promjan";
            $("#favicon").attr("href", "assets/images/icon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["วิศวกรรมคอมพิวเตอร์"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}



function showProjects(projects) {
  let projectsContainer = document.querySelector("#work .box-container");
  let projectHTML = "";
  projects.slice(0, 4).forEach((project, index) => {
    projectHTML += `
      <div class="pro-item tilt" data-index="${index}" data-img="${project.image}">
        <p class="pro-name">${project.name}</p> 
        <i class="pro-play"> <img src="https://www.rafaelalucas.com/dailyui/16/assets/play.svg" alt = "" ></i>
        <img class="pro-image" src="assets/images/pro/${project.image}" style="object-fit: cover; object-position: top;" alt="">
      </div>`;
  });
  projectsContainer.innerHTML = projectHTML;

  
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


    modalImage.src = `assets/images/pro/${imgSrc}`;
    htmlImage.src = `assets/images/pro/${imghtml}`;
    jsImage.src = `assets/images/pro/${imgjs}`;
    cssImage.src = `assets/images/pro/${imgcss}`;

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

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


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


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

srtop.reveal('.cert .box', { interval: 200 });

srtop.reveal('.work .box', { interval: 200 });

srtop.reveal('.edu .timeline', { delay: 400 });
srtop.reveal('.edu .timeline .container', { interval: 400 });

srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });




document.addEventListener('DOMContentLoaded', function() {
  const tgl_skill = document.querySelector('.tgl-skill');
  const Sphere = document.getElementById('Sphere');
  function switchtglskill(e) {
        
    if (e.target.checked) {
      Sphere.style.display = 'block';
        
    } else {
      Sphere.style.display = 'none';
    }
}

  tgl_skill.addEventListener('change', switchtglskill);

});



/* document.querySelector('.morebtn .btn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('edu').classList.toggle('show-content');
  });
   */


$(document).ready(function() {
  var cursor = $(".cursor");
  var follower = $(".cursor-follower");

  var posX = 0, posY = 0;
  var mouseX = 0, mouseY = 0;

  TweenMax.to({}, 0.016, {
    repeat: -1,
    onRepeat: function() {
      posX += (mouseX - posX) / 9;
      posY += (mouseY - posY) / 9;

      TweenMax.set(follower, {
        css: {    
          left: posX - 12,
          top: posY - 12
        }
      });

      TweenMax.set(cursor, {
        css: {    
          left: mouseX,
          top: mouseY
        }
      });
    }
  });

  $(document).on("mousemove", function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;

    // Check background color
    var elem = document.elementFromPoint(mouseX, mouseY);

    if (elem) {
      var bgColor = window.getComputedStyle(elem).backgroundColor;
      var cursorColor = cursor.css("background-color");

      // Compare background color with cursor color
      if (bgColor === cursorColor) {
        cursor.addClass("color-match");
      } else {
        cursor.removeClass("color-match");
      }
    }
  });

  $(".box").on("mouseenter", function() {
    cursor.addClass("active");
    follower.addClass("active");
  });
  $(".box").on("mouseleave", function() {
    cursor.removeClass("active");
    follower.removeClass("active");
  });

  $(".btn").on("mouseenter", function() {
    cursor.addClass("active2");
    follower.addClass("active2");
  });
  $(".btn").on("mouseleave", function() {
    cursor.removeClass("active2");
    follower.removeClass("active2");
  });

  $(".btn-nav").on("mouseenter", function() {
    cursor.addClass("active2");
    follower.addClass("active2");
  });
  $(".btn-nav").on("mouseleave", function() {
    cursor.removeClass("active2");
    follower.removeClass("active2");
  });
});

/* var product =[{
  id:0,
  img:'cert1.png',
  h3:'กฟหกหฟหกฟหกฟกหกฟ' ,
  p:'กหฟกฟดกหฟดฟดฟดฟหดดฟ',
  h4:'2018-2020 | Completed'

},{
  id:1,
  img:'cert2.png',
  h3:'กฟหกหฟหกฟหกฟกหกฟ' ,
  p:'กหฟกฟดกหฟดฟดฟดฟหดดฟ',
  h4:'2018-2020 | Completed' 
},{
  id:2,
  img:'cert1.png',
  h3:'กฟหกหฟหกฟหกฟกหกฟ' ,
  p:'กหฟกฟดกหฟดฟดฟดฟหดดฟ',
  h4:'2018-2020 | Completed'
},{
  id:3,
  img:'cert2.png',
  h3:'กฟหกหฟหกฟหกฟกหกฟ' ,
  p:'กหฟกฟดกหฟดฟดฟดฟหดดฟ',
  h4:'2018-2020 | Completed'
},{
  id:4,
  img:'cert1.png',
  h3:'กฟหกหฟหกฟหกฟกหกฟ' ,
  p:'กหฟกฟดกหฟดฟดฟดฟหดดฟ',
  h4:'2018-2020 | Completed'
},{
  id:5,
  img:'cert2.png',
  h3:'กฟหกหฟหกฟหกฟกหกฟ' ,
  p:'กหฟกฟดกหฟดฟดฟดฟหดดฟ',
  h4:'2018-2020 | Completed'
},{
  id:6,
  img:'cert1.png',
  h3:'กฟหกหฟหกฟหกฟกหกฟ' ,
  p:'กหฟกฟดกหฟดฟดฟดฟหดดฟ',
  h4:'2018-2020 | Completed'
}];

$(document).ready(() => {
  var box ='';
  for(let i=0;i<product.length; i++){
      box+= `<div class="box swiper-slide">
    <img src="assets/images/cert/${product[i].img}" alt="">
    <div class="content">
      <div class="tag">
      <h3>${product[i].h3}</h3>
      </div>
      <div class="desc">
        <p>${product[i].p}</p>
        <h4>${product[i].h4}</h4>
      </div>
    </div>
  </div>`;
  }
  $("#cert-list").html(box);
}) */

  document.addEventListener('DOMContentLoaded', async () => {
    async function fetchCertificates() {
      try {
        const response = await fetch('certificates.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error('Error fetching certificates:', error);
        return null;
      }
    }
  
    const certificates = await fetchCertificates();
    if (certificates) {
      const certListContainer = document.getElementById("cert-list");
      let boxContent = certificates.slice(0, 4).map(certificate => `
        <div class="box swiper-slide">
          <img src="assets/images/cert/${certificate.img}" alt="">
          <div class="content">
            <div class="tag"></div>
            <div class="desc">
              <h1>${certificate.h3}</h1>
              <p>${certificate.p}</p>
              <h4>${certificate.h4}</h4>
            </div>
          </div>
        </div>
      `).join('');
      certListContainer.innerHTML = boxContent;
    }
  
    // Initialize Swiper
    const swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: 1,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 4,
        slideShadows: false
      },
      keyboard: { enabled: true },
      mousewheel: { thresholdDelta: 70 },
      initialSlide: 0,
      on: {
        click(event) {
          swiper.slideTo(swiper.clickedIndex);
        }
      },
      breakpoints: {
        640: { slidesPerView: 2 }
      }
    });
  });
  