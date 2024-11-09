document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting for demonstration  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
        alert("Thanks for your message, " + name + "!");
        // You can send the form data to a server here  
    } else {
        alert("Please fill in all fields.");
    }
});

// Smooth scrolling  
const links = document.querySelectorAll("nav ul li a");
links.forEach(link => {
    link.addEventListener("click", function() {
        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});