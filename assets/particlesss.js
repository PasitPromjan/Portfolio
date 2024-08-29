document.addEventListener('DOMContentLoaded', function() {
    const switchToggle = document.querySelector('.toggle');
    const img1 = document.getElementById('img1');
    const divXxx = document.getElementById('particles-container');
    const divYyy = document.getElementById('particlesss-js');
    const tgl_edu = document.querySelector('.tgl-edu');
    const checkbox = document.getElementById('cb3-9');
    const tgl_skill = document.querySelector('.tgl-skill');
    const Sphere = document.getElementById('Sphere');
    var moder = 'dark';

    function switchMode(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            imageSwitchMode('light');
            moder = 'light';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            imageSwitchMode('dark');
            moder = 'dark';
        }
    }

    function initializeParticles() {
        // ใส่การตั้งค่าของ particles.js ที่นี่
        particlesJS('particlesss-js', {
            "particles": {
                "number": {
                    "value": 100,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 3,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": false,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": false,
                        "mode": "push"
                    },
                    "resize": true
                }
            },
            "retina_detect": true
        });
    }

    function switchtgledu(e) {
        if (e.target.checked) {
            if (moder === 'dark') {
                divXxx.style.display = 'none';
                divYyy.style.display = 'block';
                initializeParticles(); // เริ่มต้น particles.js
            } else {
                divXxx.style.display = 'block';
                divYyy.style.display = 'none';
            }
        } else {
            divXxx.style.display = 'none';
            divYyy.style.display = 'none';
        }
    }

    function imageSwitchMode(mode) {
        img1.src = `assets/images/1${mode}.svg`;
        if (checkbox.checked) {
            if (mode === 'dark') {
                divXxx.style.display = 'none';
                divYyy.style.display = 'block';
                initializeParticles(); // เริ่มต้น particles.js
            } else {
                divXxx.style.display = 'block';
                divYyy.style.display = 'none';
            }
        }
    }

    function switchtglskill(e) {
        if (e.target.checked) {
            Sphere.style.display = 'block';
        } else {
            Sphere.style.display = 'none';
        }
    }

    switchToggle.addEventListener('change', switchMode);
    tgl_edu.addEventListener('change', switchtgledu);
    tgl_skill.addEventListener('change', switchtglskill);
});
