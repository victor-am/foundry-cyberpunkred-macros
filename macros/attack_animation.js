// Requires:
// - JB2A Patreon Collection (you can use the free version and replace the animations not available there)
// - Sequencer

const soundFile = "https://assets.forge-vtt.com/6338a3aa866f8f73ed4b6ca4/SFX/Guns/9mm-pistol-shoot-short-reverb-7152.mp3"
const target = game.user.targets.values().next().value
const attacker = canvas.tokens.controlled[0]

if (target == attacker) {
  ui.notifications.warn("You must control a different token from the one being targeted")
} else {
  new Sequence()
    .sound()
      .volume(0.3)
      .file(soundFile)
    .effect()
        .atLocation(attacker)
        .stretchTo(target)
        .file("jb2a.bullet.01.orange")
        .repeats(1, 200, 300)
    .effect()
      .startTime(200)
      .file("jb2a.liquid.splash_side.red")
      .atLocation(target)
      .rotateTowards(attacker)
      .spriteOffset({x: -0.5}, {gridUnits: true})
      .rotate(180)
      .scale(0.5)
    .thenDo(() => {
      BloodSplatter.socketSplat([target])
    })
    .play();
}
