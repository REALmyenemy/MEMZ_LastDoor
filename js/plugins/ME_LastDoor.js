/*:
 * Version 1.0.0
 * @target MZ
 * Last update 19/12/20
 * @author myenemy
 * @plugindesc You can go back to the entrance you came from
 * 
 * @command transfer
 * @text Transfer Player
 * @arg Type
 * @arg Map
 * @arg X
 * @arg Y
 * @arg Direction
 * @arg Transition
 * @desc Transfer player
 * 
 * @command return
 * @text Return to last door
 * @desc Returns the player to the place it was last transfered from.
 * 
 * 
 * @help
 * In many games there's the situation where a door's location or warp, changes,
 * it may be over time or for example, a shop that's just in every single city.
 * Instead noting and sending back to the last visited map, or copy-pasting that shop, you can just use this plugin.
 * 
 * Script Commands:
 * Transfer Player
 * Just like editor transfer player option, transfer the player to location X, Y in map Map
 * Type is 0 if you want to set the location specifically, any other number if you want to use variables
 * Map is the Map Id you will teleport the character to.
 * X is the X position of the player
 * Y is the Y position of the player
 * Direction is where the character will face. 1 for down, 2 for left, 3 for right, 4 for up. 0 Is to maintain it.
 * Trasition is the effect to apply on this transfer, 0 for black screen, 1 for white screen, any other for no effect.
 * 
 * If you don't set "Type", "Direction" and "Transition", they will be set to 0.
 * 
 * ME_LastDoor Return
 * Go back to the last place ME_LastDoor TP was used.
 * 
 * Remember to use normal transfer player when you don't need to go back to a variable place!
 * 
 * ==============================================
 * @Terms of use
 * - Common:
 * -  Free to use as in money.
 * -  Feel free to modify to redistribute it.
 * -  This plugin comes as is, with no guarantees.
 * -  I'll try to give support about it, but I can't say I will do it for sure.
 * - Non Commercial:
 * -  No credit required unless you modify it then credit yourself, in other words,
 *   no claiming as your own!
 * - Commercial:
 * -  Give credit me as the author of this plugin, I don't mind if you do so in some
 *   scene or some easter egg.
 * -  Report any bugs, incompatibilities and issues with this plugin to me, even if
 *   you have someone else fixing them.
 * 
 * @Terms of redistribution and disambiguation
 * - You must include a link to the original RPG Maker Forums Post plugin.
 * - You can add terms to it, but you can't remove or modify the ones already existent.
 * - You must follow LGPL 3.0.
 *
 * ==============================================
 *
 *
 */


PluginManager.registerCommand("ME_LastDoor","transfer",args => {
	
	if (args)
	{
		var type=parseInt(args["Type"])||0;
		var map=parseInt(args["Map"])||$gameMap._mapId;
		var x=parseInt(args["X"])||$gamePlayer._x;
		var y=parseInt(args["Y"])||$gamePlayer._y;
		var direction=parseInt(args["Direction"])||0;
		var transition=parseInt(args["Transition"])||0;
		Game_Interpreter.prototype.ME_LD_reserveTransfer([type,map,x,y,direction,transition]);
	}
});

PluginManager.registerCommand("ME_LastDoor","return",args => {
	if (args)
	{
		if ($gamePlayer.ME_LastDoor&&$gamePlayer.ME_LastDoor.length>3)
		{
			console.log($gamePlayer.ME_LastDoor)
			return Game_Interpreter.prototype.command201($gamePlayer.ME_LastDoor);
		}
	}
	return false;
});
Game_Player.prototype.ME_LastDoor=[];

Game_Interpreter.prototype.ME_LD_reserveTransfer = function(params) {
	$gamePlayer.ME_LastDoor=[0,$gameMap._mapId,$gamePlayer._x,$gamePlayer._y,0,params[5]];
    return Game_Interpreter.prototype.command201(params);
};
