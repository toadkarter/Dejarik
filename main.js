const inuStats = {
    attack: 5,
    defence: 3,
}

const skullStats = {
    attack: 3,
    defence: 5,
}

AFRAME.registerComponent('gameStats', {
    schema: {
        attack: {type: 'number', default: 0},
        defense: {type: 'number', default: 0}
    },

    multiple: true
})

AFRAME.registerComponent('markerhandler', {
    init: function() {
        const currentModel = this.el

        currentModel.addEventListener('click', function() {
            const currentVisibility = this.getAttribute('visible');
            this.setAttribute("scale", "0 0 0");
        })
    },
    multiple: true
})

// https://aframe.io/docs/1.3.0/components/raycaster.html
// https://stackoverflow.com/questions/61944027/aframe-how-to-get-intersected-elements-from-raycaster-intersection-event
AFRAME.registerComponent('collider-check', {
    dependencies: ['raycaster'],
    init: function() {
        this.el.addEventListener('raycaster-intersection', function () {
            console.log('Player hit something!');
        })
    },
    multiple: true
})