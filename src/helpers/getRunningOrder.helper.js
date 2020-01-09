const moment = require("moment");
const { getAgrregatedData } = require("../db");
const { makeOptions } = require("./../helpers/makeOptions.helper");

const makePipe = function(outletID) {
  const pipe = [
    // Stage 1
    {
      $match: {
        IsKOTCancel: false,
        OrderDate: moment().format("YYYYMMDD")
      }
    },

    // Stage 2
    {
      $project: { KOTNo: 1, KOTAmount: 1, TableNo: 1 }
    }
  ];
  if (outletID) {
    pipe[0].$match["OutletLocation"] = { $eq: outletID };
  }
  return pipe;
};

const getRunningOrder = async function({ outletID, customerName }) {
  const newData = { totalAmt: 0, totalOrder: 0, bill: [] };
  const options = {
    dbName: customerName,
    collection: "orders",
    query: makePipe(outletID)
  };
  const data = await getAgrregatedData(options);
  for (let i = 0; i < data.length; ++i) {
    const el = data[i];
    el["isOrder"] = true;
    newData.totalAmt = newData.totalAmt + parseInt(el.KOTAmount);
  }
  newData["bill"] = data;
  newData.totalOrder = data.length;
  return newData;
};

const getRunningOrdersForOutlets = async function(r) {
  const pipe = [
    // Stage 1
    {
      $match: {
        IsKOTCancel: false,
        OrderDate: moment().format("YYYYMMDD")
      }
    },

    // Stage 2
    {
      $group: {
        _id: "$OutletLocation",
        totalSale: { $sum: "$KOTAmount" },
        totalOrders: { $sum: 1 }
      }
    }
  ];
  const options = makeOptions(pipe, r, "orders", "OrderDate");
  const data = await getAgrregatedData(options);
  // return options;
  return data
};

module.exports = { getRunningOrder, getRunningOrdersForOutlets };
