window.HELP_IMPROVE_VIDEOJS = false;

function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');

    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            button.classList.add('copied');
            copyText.textContent = 'Copied!';

            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            button.classList.add('copied');
            copyText.textContent = 'Copied!';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');

    if (carouselVideos.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(e => {
                    console.log('Autoplay prevented:', e);
                });
            } else {
                video.pause();
            }
        });
    }, {
        threshold: 0.5
    });

    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

$(document).ready(function() {
    var options = {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        breakpoints: [
            { changePoint: 480, slidesToShow: 1, slidesToScroll: 1 },
            { changePoint: 768, slidesToShow: 1, slidesToScroll: 1 },
            { changePoint: 1024, slidesToShow: 1, slidesToScroll: 1 }
        ]
    }

    setTimeout(function() {
        var carousels = bulmaCarousel.attach('.carousel', options);

        if (carousels && carousels.length > 0) {
            carousels.forEach(function(carousel) {
                carousel.on('after', function() {
                    const items = document.querySelectorAll('.carousel .item');
                    items.forEach(function(item) {
                        item.style.display = 'block';
                        item.style.visibility = 'visible';
                    });
                });

                carousel.on('ready', function() {
                    console.log('Carousel ready');
                    const images = document.querySelectorAll('.carousel .item img');
                    images.forEach(function(img) {
                        if (!img.complete) {
                            img.addEventListener('load', function() {
                                console.log('Image loaded in carousel:', this.src);
                            });
                        }
                    });
                });
            });
        }

        const forceShowItems = function() {
            const items = document.querySelectorAll('#results-carousel .item');
            items.forEach(function(item, index) {
                item.style.display = 'block';
                item.style.visibility = 'visible';
                item.style.opacity = '1';
                item.style.position = 'relative';

                if (index === 0) {
                    item.classList.add('is-active');
                }
            });
        };

        setTimeout(forceShowItems, 200);
        setTimeout(forceShowItems, 1000);
    }, 100);

    bulmaSlider.attach();

    setupVideoCarouselAutoplay();

    const checkCarouselVisibility = function() {
        const items = document.querySelectorAll('.carousel .item');
        items.forEach(function(item) {
            item.style.display = 'block';
            item.style.visibility = 'visible';
            item.style.opacity = '1';
        });
    };

    setTimeout(checkCarouselVisibility, 500);
    setTimeout(checkCarouselVisibility, 1000);

    setupImageErrorHandling();

})

function setupImageErrorHandling() {
    const images = document.querySelectorAll('.carousel .item img');
    images.forEach(function(img) {
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            this.style.display = 'none';

            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.style.cssText = `
                width: 100%;
                height: 250px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.2rem;
                font-weight: 600;
                text-align: center;
                margin-bottom: 1rem;
            `;
            placeholder.textContent = 'Image Loading...';

            this.parentNode.insertBefore(placeholder, this);
        });

        img.addEventListener('load', function() {
            console.log('Image loaded successfully:', this.src);
        });
    });
}
