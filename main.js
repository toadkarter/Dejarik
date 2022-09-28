const inuStats = {
    attack: 5,
    defence: 3,
}

const skullStats = {
    attack: 3,
    defence: 5,
}

AFRAME.registerComponent('markerhandler', {
    init: function() {
        const currentMarker = document.querySelector("#coolMarker");
        const model = document.querySelector("#inu");
        const overlay = document.querySelector('#points');

        model.stats = inuStats;

        model.addEventListener('click', function(ev, target) {
            const intersectedElement = ev && ev.detail && ev.detail.intersectedEl;
            console.log(intersectedElement);
            if (model && intersectedElement == model) {
                console.log(model.stats["attack"]);
            }


            // const currentVisibility = overlay.getAttribute('visible');
            // overlay.setAttribute('visible', !currentVisibility);
        })
    }
})