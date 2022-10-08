/* ----------------------------------
    Token to Lootable Corpse
   ----------------------------------
   To setup this macro create a container character
   and put it's name on the "baseContainerActorName"
   variable below.
---------------------------------- */ 
// Name of the container actor used as a template
const baseContainerActorName = "Lootable Corpse Template"

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
  "upgrade"
];
/* ----------------------------------
   End
---------------------------------- */ 

if (!canvas.tokens.controlled[0]) {
  ui.notifications.warn("You must have one or more tokens selected");
} else {
  if (confirm("Are you sure you want to replace the selected tokens with looteable corpses?")) {
    canvas.tokens.controlled.forEach((token) => {
      const inventory = token.actor.items.filter(i => lootableItemTypes.includes(i.type));
      inventory.forEach(i => i.data.equipped = false);
  
      const position = {
        x: token.data.x + Math.floor(token.width / 2) - 3,
        y: token.data.y + Math.floor(token.height / 2) - 3
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
      token.destroy();
    })
  }
}
