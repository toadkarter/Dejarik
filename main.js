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
        const gameStats = currentModel.querySelectorAll('a-text');

        currentModel.addEventListener('click', function() {
            for (var i = 0; i < gameStats.length; i++) {
                const currentVisibility = gameStats[i].getAttribute('visible');
                gameStats[i].setAttribute('visible', !currentVisibility);
            }
        })
    },
    multiple: true
})

// https://aframe.io/docs/1.3.0/components/raycaster.html
// https://stackoverflow.com/questions/61944027/aframe-how-to-get-intersected-elements-from-raycaster-intersection-event
AFRAME.registerComponent('collider-check', {
    dependencies: ['raycaster'],
    schema: {
        attack: {type: 'number', default: 0},
        defense: {type: 'number', default: 0}

    },
    init: function() {
        let colliderInit = 3;
        const playerStats = this.data
        const playerModel = this.el
        this.el.addEventListener('raycaster-intersection', function (evt) {
            if (colliderInit == 0) {
                const enemyStats = evt.detail.els[0].getAttribute('collider-check')
                const enemyModel = evt.detail.els[0]
                if (playerStats.attack >= enemyStats.defense) {
                    console.log("Player wins!")
                    enemyModel.setAttribute("visible", false);
                } else if (enemyStats.attack >= playerStats.defense) {
                    console.log("Enemy wins!")
                    playerModel.setAttribute("visible", false);
                }
            } else {
                colliderInit--;
            }

        })
    },
    tick: function() {
        const playerModel = this.el;
        const currentSize = playerModel.getAttribute('scale').x
        playerModel.object3D.scale.set(currentSize-0.01, currentSize-0.01, currentSize-0.01)
    },
    multiple: true
})