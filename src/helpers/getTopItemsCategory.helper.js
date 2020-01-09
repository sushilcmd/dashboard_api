const { getAgrregatedData } = require("../db");
const moment = require("moment");

const makePipe = function(r) {
  let pipe = [
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
      $lookup: {
        from: "billItems",
        localField: "billUId",
        foreignField: "OBID",
        as: "items"
      }
    },

    // Stage 3
    {
      $unwind: {
        path: "$items"
      }
    },
    {
      $match: {
        "items.SectionName": { $ne: "BREADS" }
      }
    },

    // Stage 4
    {
      $group: {
        _id: `$items.${r.fieldName}`,
        itemName: { $first: "$items." + r.fieldName },
        qty: { $sum: "$items.Qty" },
        amt: { $sum: "$items.ItemAmount" }
      }
    }
  ];
  if (r.startDate && r.endDate) {
    pipe[0].$match["BillDate"] = { $gte: r.startDate, $lte: r.endDate };
  }
  if (r.outletID) {
    pipe[0].$match["OutletLocation"] = { $eq: r.outletID };
  }
  pipe = pipe.concat(r.queryMeta);
  return pipe;
};

exports.getTopItemsCategories = async function(r) {
  const options = {
    dbName: r.customerName,
    collection: "bills",
    query: makePipe(r)
  };
  return await getAgrregatedData(options);
};
