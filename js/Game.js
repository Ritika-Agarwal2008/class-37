class Game {
    constructor() { }

    getState() {
        var gameStateRef = database.ref('gameState')
        gameStateRef.on("value", function (data) {
            gameState = data.val()
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        })
    }

    async start() {
        if (gameState === 0) {
            player = new Player()
            var playerCountRef=await database.ref('playerCount').once("value")
            if(playerCountRef.exists()){
                playerCount=playerCountRef.val()
                player.getCount()
            }
            form = new Form()
            form.display();
        }
    }

    play() {
        form.hide()
        textSize(30)
        text("game start", 120, 100)

        Player.getPlayerInfo()

        var y = 130
        if (allPlayers !== undefined) {
            for (var p in allPlayers) {
                if (p === "player" + player.index)
                    fill("red")
                else
                    fill("black")
                y = y + 20
                textSize(15)
                text(allPlayers[p].name + ": " + allPlayers[p].distance, 120, y)
            }

        }
        if(keyIsDown(UP_ARROW)&&player.index!==null){
            player.distance+=50
            player.update()
        }
    }
}