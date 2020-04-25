const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*
    NOTE: 
    
    Buildings are game objects that a player can build
    in order to produce different kinds of materials.

    To build a new Building the player needs to spend:
        - money (Cost)
        - the required materials (CraftingRecipe)
        
    A building can only be places by the player if they 
    have at least one empty building space.
 */

const buildingSchema = new Schema({
  Name: String,
  Cost: Number,
  Picture: String,
  MaterialID: { type: Schema.Types.ObjectId, ref: 'Material' },
  CraftingRecipe: [{ type: Schema.Types.ObjectId, ref: 'MaterialRatio' }],
});

module.exports = mongoose.model('Building', buildingSchema);
