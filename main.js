/*
This JS file contains the main logic belonging to the game "pieces".
These components are designed to be modular, so new pieces can be introduced into
the game simply by adding more <a-entity> types to the HTML that have
types markerhandler and collider-check, together with the relevant
properties such as attack and defense values. Modularity is achieved by using
the "multiple: true" property on both AFrame components.
*/

// https://aframe.io/docs/1.3.0/introduction/writing-a-component.html
// https://medium.com/swlh/how-to-handle-click-events-on-ar-js-f397ea5994d
AFRAME.registerComponent('markerhandler', {
    init: function() {
        // Getting a reference to the model and the text of a game piece
        const currentModel = this.el;
        const gameStats = currentModel.querySelectorAll('a-text');

        currentModel.addEventListener('click', function() {
            // If model is clicked, switch off every text connected to the model
            for (var i = 0; i < gameStats.length; i++) {
                const currentVisibility = gameStats[i].getAttribute('visible');
                gameStats[i].setAttribute('visible', !currentVisibility);
            }
        })
    },
    multiple: true
})

// https://aframe.io/docs/1.3.0/components/raycaster.html
AFRAME.registerComponent('collider-check', {
    dependencies: ['raycaster'],
    // Setting up properties of the game piece
    schema: {
        attack: {type: 'number', default: 0},
        defense: {type: 'number', default: 0},
        isDead: {type: 'boolean', default: false},
    },
    init: function() {
        // I found there were some misfires of the raycaster when the model
        // was just loaded up, so I included a buffer for any potential
        // false positives
        let colliderInit = 3;
        const playerStats = this.data
        const playerModel = this.el

        // Event that happens if raycaster is intersecting with something
        this.el.addEventListener('raycaster-intersection', function (evt) {
            if (colliderInit == 0) {

                // Get reference to enemy object from raycaster intersection
                const enemyStats = evt.detail.els[0].getAttribute('collider-check')
                const enemyModel = evt.detail.els[0]

                // Logic for battle. Sets the isDead property to 'true' so that the
                // animation can be played
                if (playerStats.attack >= enemyStats.defense) {
                    console.log("Player wins!")
                    enemyModel.setAttribute('collider-check', 'isDead', 'true')
                } else if (enemyStats.attack >= playerStats.defense) {
                    console.log("Enemy wins!")
                    playerModel.setAttribute('collider-check', 'isDead', 'true')
                }
            } else {
                // Decrease buffer for false positives
                colliderInit--;
            }

        })
    },
    // Responsible for the animation. Plays on every frame, so there is a guard
    // variable to ensure that its not played too early.
    tick: function() {
        // Get reference to player model, its "isDead" property and shrink factor.
        // Shrink factor can be modified depending on how fast you want the animation
        // to be
        const playerModel = this.el;
        const shrinkFactor = 0.1;
        const isDead = playerModel.getAttribute('collider-check').isDead

        // Do nothing if the player isn't dead yet
        if (!isDead) { return; }

        // Get reference to the current size of the player
        const currentSize = playerModel.getAttribute('scale').x

        // If the size of the model becomes less than 0 on the next frame,
        // then make the model invisible and stop. Avoids issue where negative
        // scale makes model increase in size.
        if (currentSize - shrinkFactor <= 0) {
            playerModel.setAttribute('visible', false); 
            return; 
        }

        // Reduce scale of model by the shrink factor
        playerModel.object3D.scale.set(
            currentSize-shrinkFactor, 
            currentSize-shrinkFactor, 
            currentSize-shrinkFactor
        )
    },
    multiple: true
})