function rate(stars) {
    const starElements = document.querySelectorAll('.star');
    const ratingText = document.getElementById('rating-text');
    
    starElements.forEach((star, index) => {
        if (index < stars) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    ratingText.textContent = `¡Gracias por tu calificación de ${stars} estrellas!`;
}

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-links a');

menuToggle.addEventListener('click', () =>{
    navLinks.classList.toggle('show');
});

navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show')
    });
});

document.querySelector('.download-button').addEventListener('click', function() {
    // URL de tu CV (reemplaza esto con la ruta real a tu archivo)
    const cvUrl = 'CV.pdf';
    
    // Crear un elemento temporal para la descarga
    const downloadLink = document.createElement('a');
    downloadLink.href = cvUrl;
    downloadLink.download = 'CV.pdf'; // Nombre que tendrá el archivo al descargarse
    
    // Ocultar el enlace
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    
    // Simular el clic y eliminar el enlace temporal
    downloadLink.click();
    document.body.removeChild(downloadLink);
});

// Objeto para almacenar las calificaciones
const ratingData = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
};

function updateRatingDisplay() {
    // Calcular total y promedio
    const total = Object.values(ratingData).reduce((a, b) => a + b, 0);
    const average = total > 0 
        ? Object.entries(ratingData).reduce((acc, [rating, count]) => acc + (rating * count), 0) / total 
        : 0;

    // Actualizar promedio y total
    document.querySelector('.average-score').textContent = average.toFixed(1);
    document.querySelector('.total-ratings').textContent = `${total} calificaciones totales`;

    // Actualizar barras de progreso
    Object.entries(ratingData).forEach(([rating, count]) => {
        const percentage = total > 0 ? (count / total) * 100 : 0;
        const progressBar = document.querySelector(`.rating-progress-fill[data-rating="${rating}"]`);
        const countElement = progressBar.parentElement.nextElementSibling;
        
        progressBar.style.width = `${percentage}%`;
        countElement.textContent = count;
    });
}

function rate(stars) {
    // Actualizar conteo de calificaciones
    ratingData[stars]++;
    
    // Actualizar estrellas activas
    const starElements = document.querySelectorAll('.star');
    starElements.forEach((star, index) => {
        if (index < stars) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    // Actualizar texto y display
    const ratingText = document.getElementById('rating-text');
    ratingText.textContent = `¡Gracias por tu calificación de ${stars} estrellas!`;
    
    // Actualizar estadísticas
    updateRatingDisplay();

    // Guardar en localStorage (opcional, para persistencia)
    localStorage.setItem('portfolioRatings', JSON.stringify(ratingData));
}

// Inicializar eventos
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', () => rate(star.dataset.rating));
});

// Cargar datos guardados (opcional)
const savedRatings = localStorage.getItem('portfolioRatings');
if (savedRatings) {
    Object.assign(ratingData, JSON.parse(savedRatings));
    updateRatingDisplay();
}