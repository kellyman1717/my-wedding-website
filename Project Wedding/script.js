// Tanggal pernikahan (ganti dengan tanggal sebenarnya)
const weddingDate = new Date("2024-03-28T00:00:00");

function updateTimer() {
    const now = new Date();
    const difference = weddingDate - now;

    if (difference <= 0) {
        document.getElementById("timer").innerHTML = "The big day is here!";
    } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}

updateTimer();
setInterval(updateTimer, 1000);

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("rsvpForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value;
        const wish_message = document.getElementById("wish_message").value;
        const attend = document.getElementById("attend").value;

        let message;
        if (attend === "yes") {
            message = `Terimakasih ${name}!! Kami harap kedatangannya pada hari H!!`;
        } else {
            message = `Terimakasih ${name} telah mengisi, doakan kami agar lancar pada hari H`;
        }

        alert(message);
        updateDatabase(name, wish_message, attend);
    });
    
    const bgMusic = document.getElementById("bgMusic");
    bgMusic.volume = 0.3; // Set volumenya menjadi 50%

    document.addEventListener("click", function() {
        bgMusic.play();
    }, { once: true });

    // Fungsi untuk memeriksa apakah elemen dalam viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Fungsi untuk menampilkan elemen secara bertahap saat di-scroll
    function revealOnScroll() {
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('revealed');
            }
        });
    }

    // Memanggil fungsi revealOnScroll saat halaman dimuat dan di-scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Fungsi untuk mengirim data ke server dengan AJAX
    function updateDatabase(name, wish_message, attend) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "rsvp.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                console.log(xhr.responseText);
            }
        };
        xhr.send(`name=${name}&wish_message=${wish_message}&attend=${attend}`);
    }

    // Fungsi untuk memuat pesan dari server dan menambahkannya ke dalam halaman
    function loadMessages() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "messages.php", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                document.getElementById("messageContainer").innerHTML = xhr.responseText;
            }
        };
        xhr.send();
    }

    // Memanggil fungsi loadMessages setiap beberapa detik untuk memperbarui pesan
    setInterval(loadMessages, 5000); // Misalnya, memperbarui setiap 5 detik
});
