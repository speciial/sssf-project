'use strict';

const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');

const {
  marketType,
  marketEntryType,
  addMarketEntryType,
  addMarketOfferType,
} = require('./MarketType');

const MarketModel = require('../models/MarketModel');
const MarketEntryModel = require('../models/MarketEntryModel');

const MaterialRatioModel = require('../models/MaterialRatioModel');

const UserModel = require('../models/UserModel');
const UserMaterialModel = require('../models/UserMaterialModel');

/**
 * NOTE:
 *  For now, it is only possible to add an empty market!
 */
const addMarket = {
  type: marketType,
  args: {
    Name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args) => {
    try {
      return await MarketModel.create(args);
    } catch (error) {
      return new Error(error);
    }
  },
};

const addMarketEntry = {
  type: marketEntryType,
  args: {
    MarketName: { type: new GraphQLNonNull(GraphQLString) },
    MarketEntry: { type: new GraphQLNonNull(addMarketEntryType) },
  },
  resolve: async (parent, args) => {
    try {
      const user = await UserModel.findById(args.MarketEntry.User).populate(
        'Materials'
      );

      const hasMaterial = updateUserMaterial(
        user.Materials,
        args.MarketEntry.Materials
      );

      if (hasMaterial) {
        const market = await MarketModel.findOne({ Name: args.MarketName });

        // saving the offered materials
        const newMaterials = await Promise.all(
          args.MarketEntry.Materials.map(async (matRatio) => {
            const newMatRatio = new MaterialRatioModel(matRatio);
            await newMatRatio.save();
            return newMatRatio._id;
          })
        );
        args.MarketEntry.Materials = newMaterials;

        // creating the entry
        const newEntry = new MarketEntryModel(args.MarketEntry);
        await newEntry.save();

        // adding the entrie to market
        if (!market.Entries) {
          market.Entries = [];
        }
        market.Entries.push(newEntry._id);
        await MarketModel.findByIdAndUpdate(market._id, market, { new: true });

        return newEntry;
      } else {
        return new Error('User does not have the requiered materials');
      }
      return null;
    } catch (error) {
      return new Error(error);
    }
  },
};

const buyMarketEntry = {
  type: marketEntryType,
  args: {
    UserId: { type: new GraphQLNonNull(GraphQLID) },
    MarketEntryId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent, args) => {
    try {
      const buyingUser = await UserModel.findById(args.UserId).populate(
        'Materials'
      );
      const entry = await MarketEntryModel.findById(args.MarketEntryId)
        .populate('User')
        .populate('Materials');
      const sellingUser = entry.User;

      // console.log('Buying User', buyingUser);
      // console.log('Entry', entry);

      if (buyingUser.Money >= entry.SuggestedPrice) {
        // remove money from buying user
        buyingUser.Money -= entry.SuggestedPrice;

        // add money to selling user
        sellingUser.Money += entry.SuggestedPrice;

        // add materials to buying user
        const newUserMaterial = [];
        await Promise.all(
          buyingUser.Materials.map(async (uMat) => {
            const m = await UserMaterialModel.findByIdAndDelete(uMat);
            newUserMaterial.push({
              Material: uMat.Material,
              Quantity: uMat.Quantity,
            });
          })
        );

        await Promise.all(
          entry.Materials.map(async (eMat) => {
            let found = false;

            await Promise.all(
              newUserMaterial.map((bMat) => {
                console.log('eMat', eMat.MaterialID);
                console.log('bMat', bMat.Material);
                if (eMat.MaterialID == bMat.Material) {
                  found = true;
                  bMat.Quantity += eMat.Quantity;
                }
              })
            );

            console.log('Found', found);

            if (!found) {
              newUserMaterial.push({
                Material: eMat.MaterialID,
                Quantity: eMat.Quantity,
              });
            }
          })
        );

        console.log(newUserMaterial);

        const uMats = await Promise.all(
          newUserMaterial.map(async (mat) => {
            const m = new UserMaterialModel(mat);
            await m.save();
            return m._id;
          })
        );

        buyingUser.Materials = uMats;
        await UserModel.findByIdAndUpdate(buyingUser._id, buyingUser, {
          new: true,
        });

        // remove market entry
      } else {
        return new Error('Insufficent Founds!');
      }
    } catch (error) {
      return new Error(error);
    }
  },
};

const updateUserMaterial = async (userMaterial, newMaterial) => {
  let hasMaterial = true;
  newMaterial.map((eMat) => {
    // check if user owns material
    let found = false;
    userMaterial.map((uMat) => {
      if (uMat.Material == eMat.MaterialID) {
        found = true;
        // check if user has enough of it
        if (uMat.Quantity < eMat.Quantity) {
          hasMaterial = false;
        } else {
          uMat.Quantity -= eMat.Quantity;
        }
      }
    });
    if (!found) {
      hasMaterial = false;
    }
  });

  if (hasMaterial) {
    userMaterial.map(async (uMat) => {
      const newMat = UserMaterialModel(uMat);
      await UserMaterialModel.findByIdAndUpdate(uMat._id, newMat, {
        new: true,
      });
    });
  }

  return hasMaterial;
};

module.exports = {
  addMarket,
  addMarketEntry,
  buyMarketEntry,
};

/*
"markets": [
      {
        "Entries": [
          {
            "id": "5ea6cdbd4bda4f39a47db85e",
            "Materials": [
              {
                "Material": {
                  "Name": "Trees"
                },
                "Quantity": 20
              }
            ],
            "User": {
              "id": "5ea042bbebb53c2194bd25d7",
              "Username": "test"
            },
            "SuggestedPrice": 2000
          }
        ]
      }
]
 */

/*
[
      {
        "id": "5ea1a4d6d8d2ca2718799fd8",
        "Name": "Trees"
      },
      {
        "id": "5ea1a51ad8d2ca2718799fd9",
        "Name": "Stone"
      },
      {
        "id": "5ea1a53dd8d2ca2718799fda",
        "Name": "Iron Ore"
      },
      {
        "id": "5ea1a55bd8d2ca2718799fdb",
        "Name": "Silver Ore"
      },
      {
        "id": "5ea1a572d8d2ca2718799fdc",
        "Name": "Gold Ore"
      },
      {
        "id": "5ea1a5a0d8d2ca2718799fdd",
        "Name": "Wheat"
      },
      {
        "id": "5ea1a5c5d8d2ca2718799fde",
        "Name": "Tobacco"
      },
      {
        "id": "5ea1a5d9d8d2ca2718799fdf",
        "Name": "Fish"
      },
      {
        "id": "5ea1a5ebd8d2ca2718799fe0",
        "Name": "Wine"
      },
      {
        "id": "5ea1a64ed8d2ca2718799fe2",
        "Name": "Wood"
      },
      {
        "id": "5ea1a67fd8d2ca2718799fe4",
        "Name": "Coal"
      },
      {
        "id": "5ea1a6fcd8d2ca2718799fe7",
        "Name": "Iron Ingot"
      },
      {
        "id": "5ea1a723d8d2ca2718799fea",
        "Name": "Silver Ingot"
      },
      {
        "id": "5ea1a760d8d2ca2718799fed",
        "Name": "Gold Ingot"
      },
      {
        "id": "5ea1a7b0d8d2ca2718799fef",
        "Name": "Flour"
      },
      {
        "id": "5ea1a7dfd8d2ca2718799ff1",
        "Name": "Bread"
      },
      {
        "id": "5ea1a827d8d2ca2718799ff4",
        "Name": "Jewelry"
      },
      {
        "id": "5ea1a8ded8d2ca2718799ff8",
        "Name": "Tools"
      }
]
[
      {
        "id": "5ea042bbebb53c2194bd25d7",
        "Username": "test"
      },
      {
        "id": "5ea2d28327887352a0d7246e",
        "Username": "hop"
      },
      {
        "id": "5ea2d2bd27887352a0d7246f",
        "Username": "Hop"
      },
      {
        "id": "5ea0418cef1ee20f301658c7",
        "Username": "Bluue"
      }
]
 */
