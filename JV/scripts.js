'use strict';

function App() {
    this.track = document.querySelector('#track');
    this.carruselItems = this.track.querySelectorAll('.carrusel');
    this.carruselList = document.querySelector('.carrusel-list');
    this.currentIndex = 0;

    // Clonar items al final para efecto loop
    this.cloneItems();

    // Asignar eventos
    const buttons = document.querySelectorAll('[data-button]');
    buttons.forEach(button => {
        button.addEventListener('click', this.processingButton.bind(this));
    });
}

App.prototype.cloneItems = function () {
    const fragment = document.createDocumentFragment();
    this.carruselItems.forEach(item => {
        const clone = item.cloneNode(true);
        fragment.appendChild(clone);
    });
    this.track.appendChild(fragment);

    // Actualizar lista
    this.carruselItems = this.track.querySelectorAll('.carrusel');
};

App.prototype.processingButton = function (event) {
    const btn = event.currentTarget;
    const itemWidth = this.carruselItems[0].offsetWidth;
    const totalItems = this.carruselItems.length;

    if (btn.dataset.button === 'button-next') {
        this.currentIndex++;
        if (this.currentIndex >= totalItems / 2) {
            this.track.style.transition = 'none';
            this.currentIndex = 0;
            this.track.style.left = '0px';
            void this.track.offsetWidth; // fuerza reflow
            this.track.style.transition = 'left 0.3s';
        }
    } else {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.track.style.transition = 'none';
            this.currentIndex = totalItems / 2 - 1;
            this.track.style.left = `${-1 * itemWidth * this.currentIndex}px`;
            void this.track.offsetWidth;
            this.track.style.transition = 'left 0.3s';
        }
    }

    this.track.style.left = `${-1 * itemWidth * this.currentIndex}px`;
};

window.onload = function () {
    window.app = new App();
};
