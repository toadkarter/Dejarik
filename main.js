AFRAME.registerComponent('markerhandler', {
    init: function() {
        const model = document.querySelector("#inu");
        const overlay = document.querySelector('#points');

        model.addEventListener('click', function(ev, target) {
            const currentVisibility = overlay.getAttribute('visible');
            overlay.setAttribute('visible', !currentVisibility);
        })
    }
})