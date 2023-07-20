---
titles: Reldawin Redesign Doc
date: 2023-07-20 00:09:00 -0
categories: [Reldawin,c#,unity]  # TAG names should always be lowercase
tags: [Reldawin]
---

# Reldawin

* Perpetually online game
* Isomeric RPG
* Survival builder-crafter hunter-gather miner-refiner smither-hitter
* Hardcore pvp
* PC

Built in Unity, utilizing Unity's isometric tilemap and 2D lighting system for shadows and day/night illumination.
Sprites rendered from models are made in blender, rendered in 2D at 8 angles using a python script.
Sprite dimensions are currently undecided but pixel-perfect is the objective.

## Mapping

Initially the world was generated using a seed and that seed was distributed on connection to generate the base world, then when a player would load a chunk, any modification to that chunk in the editor or by a player in hand would be sent from the server. This was by no means a bad strategy especially as i didn't have time to build a detailed world.

Now I'd like to try a different approach, having a large premade world which tiles are determined by pixel colour.
That world can be loaded by an editor, specifically it'll load 9 chunks, the center one being interactive, the others simply being there to reveal how the center chunk melds with its surroundings.
This will require building a custom editor that allows for connecting and disconnecting to the server while the game isn't running.

Tiles will include seamless variations of the following tiles:

* deepWater
* water
* shallowWater
* sand
* dirt
* pavedRoad
* dirtRoad
* forest
* deepForest
* grass
* prairie

The server is responsible for generating and sending trees, subterranean reservoirs, and mining nodes on chuck load. However only trees will be perpetually loaded as reservoirs and mining nodes are (currently) unlimited.
Their spawn rates are determined by the terrain type in the overworld.

### Trees

Trees have 4 phases and grow one phase every week, from Sappling to Mature to Old.
When a mature tree becomes old, or an old tree becomes withered, there's a 50% chance a new sappling will begin to grow next to it.
when a withered tree grows it is removed from the game.
* Mature trees yield 2 logs
* Old trees yield 3 logs
* Withered trees yields 1 log
* Sprouts yield nothing but can be picked using a sickle

## Player Character

It might be a bad decision but I've opted to having player character data be stored on the client computer. I'll change this after release if it comes to light that users are decoding their characters to give themselves an advantage or if I decide to make a mobile build later down the line.

### Actions

Static Skills
* Woodcutting
* Carpentry
* Mining
* Smelting
* Smithing
* Foraging
* Farming
* Cooking
* Eating
* Tailoring
* Divining
* Prospecting
* First-aid

Dynamic Skills
* Archery
* Fighting
* Blocking

### Inventory

12x4 grid. Items are sizes of 1x1, 2x1, 1x2, 2x2, 2x3, 1x3, 2x4, 1x4.
Items cannot be rotated in the inventory. There is no weight limit.

### Crafting

Tap the crafting button in the inventory to open up a 3x3 grid you can insert items into.
There's a search function to find recipes.

### Minimap

If the player gets a papyrus they can start recording map data. This item does not take up an inventory slot.

### Items

#### Rune Stones

Runestones are to be incredibly rare drops when performing gathering actions.
In ascending order of rarity there's Af, Afn, Mer, Esh, Null, Lor, Ren, Odd, Nemen, Aki, Fay, Reegr, Leth, Vi, Bach, Zos.

#### Equipment

Equioment isn't dropped by NPCs and can only be aquired by manufacturing. Items cannot be upgraded and all manufactured items of the same type are equal. Certain weapon types however are better vs. certain armour types.
Players can produce socketable variants at a hefty cost which can have rune stones inserted to give them item prefixes and suffixes depending on the order the stones were inserted. These artefacts are insanely rare.

### Recipes

There's a lot of recipes. I'll put together a wiki to categorise them all prior to release.

## NPCs 

Foxes, Rabbits, ducks, chickens, roosters, bears.
beyond that the only opposition you'll face will be other players.

## Building

Right-click the ground while holding a hammer, wooden mallet, or trowel.
When a selection is made the template will snap to the tile being moused-over. Tapping R rotates the object.
These objects include

* wall
* window
* door
* crate
* chest

A roof will automatically appear over a completed structure.

### Storage

Crates and chests have a storage capacity of 12x4.

### Doors

Doors cannot currently be locked

### Land Claim

Players can claim land using a Settlement token which can be built from the carpentry window. the maximum and default size is 30x30.
players can enter your claim and kill you, but they can't loot containers, including dead bodies (not including their own), or take items from the ground. They can't utilize facilities in this region or harvest crops. There's currently no system in place to allow friends to do anything in your claim.

## Online

Player's overhead names are by default questionmarks.
What users choose to name others is entirely up to them.
There is an acquaintance list where players can name each other, add notes and flag players as friend or foe, changing their mouse-over outline and overhead name label.

This is a work in progress.
