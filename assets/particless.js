function getParticleColor() {
    
    // Get the current theme from data-theme
    const theme = document.documentElement.getAttribute('data-theme');
    // Return the color based on the theme
    return theme === 'light' ? '#000000' : '#ffffff';
  }

particlesJS("particlesss-js", {
    "particles": {
      "number": {
        "value": 355,
        "density": {
          "enable": true,
          "value_area": 789.1476416322727
        }
      },
      "color": {
        "value": getParticleColor()
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": getParticleColor()
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.48927153781200905,
        "random": false,
        "anim": {
          "enable": true,
          "speed": 0.2,
          "opacity_min": 0,
          "sync": false
        }
      },
      "size": {
        "value": 2,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2,
          "size_min": 0,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": getParticleColor(),
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 0.2,
        "direction": "none",
        "random": true,
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
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 83.91608391608392,
          "size": 1,
          "duration": 3,
          "opacity": 1,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });

  // Initialize particles when the document is ready
document.addEventListener('DOMContentLoaded', initializeParticles);

// Update particles when the theme changes
document.addEventListener('change', function(e) {
  if (e.target.classList.contains('toggle')) {
      initializeParticles(); // Reinitialize particles with the new theme color
  }
});

var particles = initParticles(200);

var throttledParticlePush = _.throttle(function (x, y) {
  var particleX,
      particleY,
      force,
      maxForce = 200,
      distance,
      direction,
      maxDistance = 300;
  
  for (var i = 0; i < particles.length; i++) {
    particleX = particles[i]._gsTransform.x;
    particleY = particles[i]._gsTransform.y;
    distance = getDistance(x, y, particleX, particleY);
    
    if (distance < maxDistance) {
      force = (1 - (distance / maxDistance)) * maxForce;
      direction = getDirection(x, y, particleX, particleY);
      
      TweenMax.to(particles[i], 1, {
        x: "+=" + (force * -direction.x),
        y: "+=" + (force * -direction.y)
      });
    }
  }
}, 100);

document.addEventListener("mousemove", function (event) {
  throttledParticlePush(event.pageX, event.pageY);
});

function initParticles (totalParticles) {
  var container = document.querySelector('.particles-container'),
      particles = [],
      particle;
  
  for (var i = 0; i < totalParticles; i++) {
    particle = document.createElement('div');
    particle.className = 'particle';
    container.appendChild(particle);
    particles.push(particle);
    spawnParticle(particle);
  }
  
  return particles;
}

function spawnParticle (particle) {
  var initialRotation = random(0, 360),
      initialScale = random(0.9, 1.5),
      initialX = random(0, document.documentElement.clientWidth),
      initialY = random(0, document.documentElement.clientHeight),
      initialOpacity = random(0.7, 0.9),
      xSpeed = random(-10, 10),
      ySpeed = random(-10, 10),
      rotation = random(-360, 360),
      scale = random(-0.25, 0.5),
      life = random(10, 15),
      delay = random(0, 12),
      fadeTime = 2,
      pulseTime = 1.5;
  
  // Set the initial state of the particle
  TweenMax.set(particle, {
    opacity: 0,
    x: initialX,
    y: initialY,
    rotation: initialRotation,
    scale: 0
  });
  
  // Fade in animation
  TweenMax.to(particle, fadeTime, {
    opacity: initialOpacity,
    scale: initialScale,
    delay: delay,
    ease: Elastic.easeOut
  });
  
  // Movement animation
  TweenMax.to(particle, life, {
    x: initialX + xSpeed * life,
    y: initialY + ySpeed * life,
    rotation: initialRotation + rotation,
    delay: delay,
    ease: Linear.easeNone
  });
  
  // Pulsing animation
  TweenMax.to(particle, pulseTime, {
    backgroundColor: '#FF7ED4',
    yoyo: true,
    repeat: -1,
    delay: delay + fadeTime,
    ease: Power2.easeInOut
  });
  
  // Fade out animation
  TweenMax.to(particle, fadeTime, {
    opacity: 0,
    scale: 0,
    delay: life,
    ease: Power2.easeIn,
    onComplete: spawnParticle,
    onCompleteParams: [particle]
  });
}

function random (min, max) {
  return Math.random() * (max - min) + min;
}

function getDistance (x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
}

function getDirection (x1, y1, x2, y2) {
  var x = x1 - x2,
      y = y1 - y2,
      magnitude = getDistance(x1, y1, x2, y2);
  
  return {
    x: x / magnitude,
    y: y / magnitude
  };
}
