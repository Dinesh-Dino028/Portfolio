/* ----------------- toggle icon navbar ----------------- */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

/* ----------------- scroll sections avtive Link ----------------- */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });


    /* ----------------- sticky navbar ----------------- */

    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.stickY > 100);

    /* ----------------- remove toggle icon and navbar when click navbar link (scroll) ----------------- */
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

};

/* ----------------- sticky navbar ----------------- */

ScrollReveal({
  //  reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });


/* Send Email */

function sendEmail() {

    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        emailSubject: document.getElementById("emailSubject").value,
        mobileNumber: document.getElementById("mobileNumber").value,
        message: document.getElementById("message").value
    }
    // Two options to send email:
    // 1) Client-side using EmailJS (quick, but exposes public keys)
    // 2) Recommended: send to your serverless endpoint which will relay the email securely

    // Option A: EmailJS (uncomment and set correct service/template IDs if you choose this)
    // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', params).then(function (response) {
    //     alert('Successfully Email Sent via EmailJS!');
    // }).catch(function(err){
    //     alert('EmailJS send failed: ' + err);
    // });

    // Option B: Post to a serverless endpoint (recommended for production)
    const SERVERLESS_ENDPOINT = '/.netlify/functions/sendEmail'; // example for Netlify

    fetch(SERVERLESS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    }).then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
    }).then(data => {
        alert('Successfully Email Sent via serverless function!');
    }).catch(err => {
        // fallback: if serverless fails and you have EmailJS configured, you can try that
        console.error('Send email error:', err);
        alert('Failed to send email via serverless endpoint. Check console for details.');
    });


};

