// /**
//  * Engine Classes
//  */
// class Scene {
//     name: string

//     constructor(name: string) {
//         this.name = name
//     }

//     update(time: number, delta: number) {

//     }

//     render() {
        
//     }
// }

// class SceneManager {
//     scenes: Scene[]

//     constructor() {
//         this.scenes = []
//     }

//     update(time, delta) {
//         this.scenes.forEach(scene.update(time, delta))
//     }

//     addScene(scene: Scene) {
//         this.scenes.push(scene)
//     }

//     startScene(name: string) {
        
//     }
// }

// class Object() {
//     x: number
//     y: number
//     width: number
//     height: number
//     image: string
// }

// class Sprite extends Object() {
//     x: number
//     y: number
//     width: number
//     height: number
//     image: string
//     frames: string[]
//     currentFrameId: 0

//     update() {
//         this.currentFrameId = this.currentFrameId > this.frames.count() ?? 0 : this.currentFrameId + 1
//         this.image = this.frames[this.currentFrameId]
//     }
// }

// class Renderer() {
//     canvas: HTMLCanvasElement

//     constructor( parentId, width, height) {
//         this.canvas = new Canvas(parentId, width, height)
//         this.game = Game
//     }

//     render(objects: Object[]) {
//         objects.forEach(this.renderObject(object))
//     }

//     private renderObject(object: Object) {
//         object.width
//         object.height
//         object.x
//         object.y
//         object.image
//     }
// }


// class Game {
//     scenes: SceneManager
//     input: InputHandler
//     renderer: Renderer
//     configs: Config

//     constructor(configs: Config) {
//         this.configs = configs
//         this.input = new InputHandler()
//         this.renderer = new Renderer(parentId, width, height)
//         this.scenes = new SceneManager()
//     }

//     start() {
//         requestAnimationFrame(this.loop)
//     }

//     loop() {
//         const delta = window.performance.now() - this.lastTime
//         const time = window.performance.now()

//         this.input.update(time, delta)
//         this.scenes.update(time, delta)
//         this.renderer.render()

//         this.lastTime = time

//         requestAnimationFrame(this.loop)
//     }

//     addScene(scene: Scene) {
//         this.scenes.addScene(scene)
//     }
// }

// /**
//  * Game Classes
//  */

// class Bird extends Sprite {
    
// }

// class Pipe extends Object {
    
// }

// class GameplayScene extends Scene {
//     bird: Bird
//     pipes: Pipe[]
//     playButton: Object
//     pauseButton: Object

//     constructor() {
//         super('GameplayScene')
//     }

//     initInputEvents() {
//         //this.game.input.on('tap', this.flyUp())
//         window.onclick(this.flyUp())
//         this.playButton.onClick(this.startGame())
//     }

//     startGame() {
        
//     }

//     update(time, delta) {
//         this.bird.x += this.bird.speedX * delta
//         this.updatePipes()

//         if (this.birdCollidesPipe()) {
//             this.bird.die()
//         }
//     }
// }

// class FlappyBirdGame extends Game {
    
// }

// const gameConfigs = {
//     parentId: 'myFirstGameCanvas',
//     width: 800,
//     height: 600,
// }
// const flappyBirdGame = new FlappyBirdGame(gameConfigs)
// flappyBirdGame.addScene(new GameplayScene())
// flappyBirdGame.start()


// class TRexGame extends Game {
    
// }