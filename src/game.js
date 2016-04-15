import GameState from './states/game_state';
import Boot from './states/boot';
import SpriteSheetBuilderTest from './states/spritesheet_builder_test'

class Game extends Phaser.Game {

  setupStage() {

    this.input.maxPointers = 1
    this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE
    this.scale.setMinMax(this.width / 2, this.height / 2, this.width, this.height)
    this.scale.forceOrientation(true) // landscape
    this.scale.pageAlignHorizontally = true

    if (this.device.desktop) {
      this.scale.setResizeCallback(this.fitToWindow, this)
    } else {
      // Mobile
      this.scale.setResizeCallback(this.fitToWindowMobile, this)
    }
  }

  fitToWindowMobile() {
  let gameHeight = this.height
    let windowAspectRatio = window.innerWidth/window.innerHeight
    let gameWidth = Math.ceil(this.height * windowAspectRatio)
    this.scale.setGameSize(gameWidth, gameHeight)
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
  }

  fitToWindow() {
    let w = window.innerWidth / this.width
    let h = window.innerHeight / this.height
    let scale = Math.min( w, h )
    this.scale.setUserScale(scale, scale)
  }

  addStates() {
    this.states.forEach( ([name, stateClass]) => {
      this.state.add(name, stateClass)
    })
  }

  startGame() {
    console.log('start game')
    this.stateIndex = 0
    this.nextState()
  }

  nextState() {
    this.gotoStateByIndex(this.stateIndex + 1)
  }

  prevState() {
    this.gotoStateByIndex(this.stateIndex - 1)
  }

  gotoStateByIndex(index) {
    index = Math.min(index, this.states.length-1)
    index = Math.max(index, 1)
    this.stateIndex = index
    this.state.start(this.states[index][0])
  }

}

Game.prototype.states = [
  ['boot', Boot],
  ['Spritesheet Builder Test', SpriteSheetBuilderTest],
]


export default Game;
