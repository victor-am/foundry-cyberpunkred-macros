/* ----------------------------------
    Token to Lootable Corpse
   ----------------------------------
   !!! REQUIRES THE "Warp Gate" MODULE !!!
   https://foundryvtt.com/packages/warpgate

   To setup this macro create a container character
   and put it's name on the "baseContainerActorName"
   variable below.
---------------------------------- */ 
// Name of the container actor used as a template
const baseContainerActorName = "Lootable Corpse Template";

// Item types that should be lootable
const lootableItemTypes = [
  "weapon",
  "ammo",
  "gear",
  "armor",
  "drug",
  "clothing",
  "cyberdeck",
  "program",
  "upgrade",
  "cyberware"
];

// Configures which types of cyberware are not be lootable
//
// Some cyberware types for reference:
//   "cyberArm"
//   "cyberwareInternal"
//   "cyberEye"
//   "fashionware"
//   "neuralWare"
//   "cyberLeg"
//   "cyberAudioSuite"
//   "borgware"
const ignoredCyberwareTypes = ["fashionware"]; 
const ignoredCyberwareInstallationType = ["hospital"]
const ignoreFoundationalCyberware = true;
/* ----------------------------------
   End
---------------------------------- */ 

if (!canvas.tokens.controlled[0]) {
  ui.notifications.warn("You must have one or more tokens selected");
} else {
  if (confirm("Are you sure you want to replace the selected tokens with looteable corpses?")) {
    canvas.tokens.controlled.forEach((token) => {
      const inventory = token.actor.items.filter((i) => {
        return lootableItemTypes.includes(i.type) &&
               !ignoredCyberwareTypes.includes(i.system.type) &&
               !ignoredCyberwareInstallationType.includes(i.system.install) &&
               (ignoreFoundationalCyberware ? i.system.isFoundational != true : true)
      });

      inventory.forEach((i) => {
        i.system.equipped = false;
        i.system.isInstalled = false;
      });
  
      const position = {
        x: token.x + Math.floor(canvas.grid.size / 2),
        y: token.y + Math.floor(canvas.grid.size / 2)
      }

      const updates = {
        token: {
          name: token.name,
          img: token.document.texture.src,
          overlayEffect: "icons/svg/skull.svg"
        },
        actor: {
          img: token.actor.img,
          items: inventory,
          name: token.name,
          flags: {
            "cyberpunk-red-core": {
              "container-type": "loot",
              "items-free": true
            }
          }
        }
      };
      
      warpgate.spawnAt(position, baseContainerActorName, updates);
      token.document.delete();
    })
  }
}
