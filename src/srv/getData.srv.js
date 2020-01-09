const moment = require("moment");
const { getAgrregatedData } = require("../db");
const { makeOptions } = require("../helpers/_helpers");
// Get Helpers
const {
  aggregateBill,
  getTopItemsCategories
} = require("./../helpers/_helpers");

// aggregateBill
const getTotalSale = async function(r) {
  const pipe = [
    // Stage 1
    {
      $match: {
        IsSettle: true,
        IsCancel: false,
        BBillSeries: { $nin: ["Complimentary", "On The House"] },
        BillDate: moment().format("YYYYMMDD")
      }
    },

    // Stage 2
    {
      $group: {
        _id: "$BillDate",
        admission: { $sum: 1 },
        totalSale: { $sum: "$BillAmt" },
        cover: { $sum: "$Cover" }
      }
    }
  ];
  const options = makeOptions(pipe, r);
  const data = await getAgrregatedData(options);
  return await aggregateBill(data);
};

const getTotalSaleAllOutlets = async function(r) {
  const pipe = [
    // Stage 1
    {
      $match: {
        IsSettle: true,
        IsCancel: false,
        BBillSeries: { $nin: ["Complimentary", "On The House"] },
        BillDate: moment().format("YYYYMMDD")
      }
    },

    // Stage 2
    {
      $group: {
        _id: "$OutletLocation",
        admission: { $sum: 1 },
        totalSale: { $sum: "$BillAmt" },
        cover: { $sum: "$Cover" }
      }
    }
  ];
  const options = makeOptions(pipe, r);
  const data = await getAgrregatedData(options);
  return data;
  // return await aggregateBill(data);
};
// getTopItemsCategories
const getTWItemsSale = async function(t) {
  const r = {
    ...t,
    fieldName: "ItemName",
    queryMeta: [{ $sort: { qty: 1 } }, { $limit: 10 }]
  };

  if (r.type == "all") {
    r.queryMeta = [];
  } else if (r.type == "top") {
    r.queryMeta[0].$sort["qty"] = -1;
  }
  return await getTopItemsCategories(r);
};

// getTopItemsCategories
const getTopItemsCategoriesSrv = async function(r) {
  const t = {
    ...r,
    fieldName: "SectionName",
    queryMeta: [{ $sort: { qty: -1 } }, { $limit: 20 }]
  };

  return await getTopItemsCategories(t);
};

module.exports = {
  getTotalSale,
  getTWItemsSale,
  getTopItemsCategoriesSrv,
  getTotalSaleAllOutlets
};
