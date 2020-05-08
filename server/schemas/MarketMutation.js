"use strict";

const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const {
  marketType,
  marketEntryType,
  addMarketEntryType,
  addMarketOfferType,
} = require("./MarketType");

const Authcontroller = require("../controllers/AuthController");

const MarketModel = require("../models/MarketModel");
const MarketEntryModel = require("../models/MarketEntryModel");

const MaterialRatioModel = require("../models/MaterialRatioModel");

const UserModel = require("../models/UserModel");
const UserMaterialModel = require("../models/UserMaterialModel");

/**
 * NOTE:
 *  For now, it is only possible to add an empty market!
 */
const addMarket = {
  type: marketType,
  args: {
    Name: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args, { req, res }) => {
    try {
      await Authcontroller.checkAuth(req, res);
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
  resolve: async (parent, args, { req, res }) => {
    try {
      await Authcontroller.checkAuth(req, res);
      const user = await UserModel.findById(args.MarketEntry.User).populate(
        "Materials"
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
        return new Error("User does not have the requiered materials");
      }
      return null;
    } catch (error) {
      return new Error(error);
    }
  },
};

const deleteMarketEntry = {
  type: marketEntryType,
  args: {
    MarketEntryId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent, args, { req, res }) => {
    try {
      await Authcontroller.checkAuth(req, res);
      const entry = await MarketEntryModel.findById(args.MarketEntryId)
        .populate("User")
        .populate("Materials");
      const user = entry.User;

      // add money back to user
      user.Money += entry.SuggestedPrice;

      // add materials to buying user
      const newUserMaterial = [];
      await Promise.all(
        user.Materials.map(async (uMat) => {
          const m = await UserMaterialModel.findByIdAndDelete(uMat._id);
          newUserMaterial.push({
            Material: uMat.Material,
            Quantity: uMat.Quantity,
          });
        })
      );

      await Promise.all(
        entry.Materials.map(async (eMat) => {
          let found = false;

          newUserMaterial.forEach((bMat) => {
            if (eMat.MaterialID + "" == bMat.Material + "") {
              found = true;
              bMat.Quantity += eMat.Quantity;
            }
          });
          if (!found) {
            newUserMaterial.push({
              Material: eMat.MaterialID,
              Quantity: eMat.Quantity,
            });
          }
        })
      );

      const uMats = await Promise.all(
        newUserMaterial.map(async (mat) => {
          const m = new UserMaterialModel(mat);
          await m.save();
          return m._id;
        })
      );

      user.Materials = uMats;
      await UserModel.findByIdAndUpdate(user._id, user, {
        new: true,
      });

      // remove market entry
      const delEntry = await MarketEntryModel.findByIdAndDelete(
        args.MarketEntryId
      );
      await delEntry.Materials.map(async (eMat) => {
        await MaterialRatioModel.findByIdAndDelete(eMat);
      });
      return delEntry;
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
  resolve: async (parent, args, { req, res }) => {
    try {
      await Authcontroller.checkAuth(req, res);
      const buyingUser = await UserModel.findById(args.UserId).populate(
        "Materials"
      );
      const entry = await MarketEntryModel.findById(args.MarketEntryId)
        .populate("User")
        .populate("Materials");
      const sellingUser = entry.User;

      if (buyingUser.Money >= entry.SuggestedPrice) {
        // remove money from buying user
        buyingUser.Money -= entry.SuggestedPrice;

        // add money to selling user
        sellingUser.Money += entry.SuggestedPrice;

        // add materials to buying user
        const newUserMaterial = [];
        await Promise.all(
          buyingUser.Materials.map(async (uMat) => {
            const m = await UserMaterialModel.findByIdAndDelete(uMat._id);
            newUserMaterial.push({
              Material: uMat.Material,
              Quantity: uMat.Quantity,
            });
          })
        );

        await Promise.all(
          entry.Materials.map(async (eMat) => {
            let found = false;

            newUserMaterial.forEach((bMat) => {
              if (eMat.MaterialID + "" == bMat.Material + "") {
                found = true;
                bMat.Quantity += eMat.Quantity;
              }
            });
            if (!found) {
              newUserMaterial.push({
                Material: eMat.MaterialID,
                Quantity: eMat.Quantity,
              });
            }
          })
        );

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

        await UserModel.findByIdAndUpdate(sellingUser._id, sellingUser, {
          new: true,
        });

        // remove market entry
        const delEntry = await MarketEntryModel.findByIdAndDelete(
          args.MarketEntryId
        );
        await delEntry.Materials.map(async (eMat) => {
          await MaterialRatioModel.findByIdAndDelete(eMat);
        });
        return delEntry;
      } else {
        return new Error("Insufficent Founds!");
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
