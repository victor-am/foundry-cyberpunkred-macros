const amountTableName = "Loot Amount"
const lootTable = "Militar Mook Loot"


async function injectRandomLoot() {
  if (!canvas.tokens.controlled[0]) {
    ui.notifications.warn("You must have one or more tokens selected");
  } else {
    if (confirm("Are you sure you want to roll extra loot for the selected tokens?")) {
      canvas.tokens.controlled.forEach(async (token) => {
        const amount = (await game.tables.getName(amountTableName).roll()).results[0].text
        Array(amount).forEach(() => {
          game.betterTables.addLootToSelectedToken(game.tables.getName(lootTable), token)
        });
      })
    }
  }
}

injectRandomLoot();
