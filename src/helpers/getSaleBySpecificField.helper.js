const moment = require("moment");
const { getAgrregatedData } = require("../db");
const { makeOptions } = require("./makeOptions.helper");

const getSaleBySpecficField = async function(r) {
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
        _id: "$" + r.fieldName,
        totalSale: { $sum: "$BillAmt" }
      }
    }
  ];
  const options = makeOptions(pipe, r);
  const data = await getAgrregatedData(options);
  return data;
};

module.exports = { getSaleBySpecficField };
