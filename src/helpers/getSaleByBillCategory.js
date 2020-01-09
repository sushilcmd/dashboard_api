const moment = require("moment");
const { getAgrregatedData } = require("../db");
const { makeOptions } = require("./makeOptions.helper");

/**
 * Get Sale by Bill Cateogories Order
 * @param {Object} r - Options.
 * @param {Object} r.customerName - Options for getting running order.
 */
const getSaleByBillCategories = async function(r) {
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
        _id: "$TaxCategory",
        category: { $first: "$TaxCategory" },
        totalSale: { $sum: "$BillAmt" }
      }
    }
  ];
  const options = makeOptions(pipe, r);
  const data = await getAgrregatedData(options);
  return data;
};

module.exports = { getSaleByBillCategories };
