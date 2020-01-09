const makeOptions = function(pipe, r, collection = "bills", dateType = "BillDate") {
  if (r.startDate && r.endDate) {
    pipe[0].$match[dateType] = { $gte: r.startDate, $lte: r.endDate };
  }
  if (r.outletID) {
    pipe[0].$match["OutletLocation"] = { $eq: r.outletID };
  }
  return { dbName: r.customerName, collection, query: pipe };
};

const roundAmount = async function(data = []) {
  return data.map(item => {
    return {
      ...item,
      totalSale: Math.ceil(item.totalSale)
    };
  });
};
module.exports = { makeOptions, roundAmount };
