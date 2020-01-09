const moment = require("moment");
const { getAgrregatedData } = require("../db");
const { makeOptions } = require("./makeOptions.helper");

const getBilledOrder = async function(r) {
  const pipe = [
    // Stage 1
    {
      $match: {
        IsSettle: false,
        IsCancel: false,
        BillType: { $nin: ["Complimentary", "On The House"] },
        BillDate: moment().format("YYYYMMDD")
      }
    },

    // Stage 2
    {
      $project: {
        BillNo: 1,
        BillAmt: 1
      }
    }
  ];
  const options = makeOptions(pipe, r);
  const data = await getAgrregatedData(options);
  return data;
};

module.exports = { getBilledOrder };
