document.addEventListener("DOMContentLoaded", () => {

    // ----------- EMAIL ALERT -----------
    const emailInput = document.querySelector(".hero input");
    const getStartedBtn = document.querySelector(".hero .btn-red");

    getStartedBtn.addEventListener("click", () => {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "" || !emailRegex.test(email)) {
            alert("⚠ Please enter a valid email address!");
        } else {
            alert(`🎬 Welcome to Netflix, ${email}!`);
        }
    });

    // ----------- FAQ TOGGLE -----------
    const faqs = document.querySelectorAll(".faqbox");
    faqs.forEach(faq => {
        faq.addEventListener("click", () => {
            faq.classList.toggle("active");
        });
    });

    // ----------- DYNAMIC NAVBAR -----------
    window.addEventListener("scroll", () => {
        const nav = document.querySelector("nav");
        if (window.scrollY > 50) {
            nav.style.backgroundColor = "rgba(0,0,0,0.9)";
        } else {
            nav.style.backgroundColor = "transparent";
        }
    });

    // ----------- SCROLLABLE MOVIE ROWS -----------
    const containers = document.querySelectorAll(".movie-container");
    containers.forEach(container => {
        container.addEventListener("wheel", e => {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        });
    });

    // ----------- MOVIE HOVER INFO -----------
    const movies = document.querySelectorAll(".movie-container img");
    movies.forEach(movie => {
        movie.addEventListener("mouseenter", () => {
            const info = document.createElement("span");
            info.className = "hover-info";
            info.textContent = "▶ Play";
            movie.parentElement.style.position = "relative";
            movie.parentElement.appendChild(info);
        });
        movie.addEventListener("mouseleave", () => {
            document.querySelectorAll(".hover-info").forEach(el => el.remove());
        });

        // ----------- MODAL POPUP ON CLICK -----------
        movie.addEventListener("click", () => {
            const modal = document.createElement("div");
            modal.className = "modal";
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>${movie.alt}</h2>
                    <p>This is a movie description. Add details here.</p>
                </div>`;
            document.body.appendChild(modal);

            modal.querySelector(".close").addEventListener("click", () => modal.remove());
            modal.addEventListener("click", e => {
                if (e.target === modal) modal.remove();
            });
        });
    });

});
