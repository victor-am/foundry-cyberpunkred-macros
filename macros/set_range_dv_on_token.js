// Change this variable to the name of the DV you want to set
dvTable = "DV Assault Rifle"

token = canvas.tokens.controlled[0]
token.document.flags.cprDvTable = dvTable
ui.notifications.warn(`Range was set to ${dvTable}`);
