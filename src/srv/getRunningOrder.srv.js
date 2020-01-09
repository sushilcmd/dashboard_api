const { getRunningOrder, getBilledOrder, getRunningOrdersForOutlets } = require("./../helpers/_helpers");
// runningOrder, billedOrder
const getRunningOrderSrv = async function(r) {
  const runningOrders = {
    billedOrders: { totalOrder: 0, totalAmt: 0 },
    currentOrders: { totalOrder: 0, totalAmt: 0 },
    bill: []
  };
  const order = await getRunningOrder(r);
  runningOrders["currentOrders"]["totalOrder"] = order.totalOrder;
  runningOrders["currentOrders"]["totalAmt"] = order.totalAmt;
  runningOrders["bill"] = order.bill;
  const bill = await getBilledOrder(r);

  for (let i = 0; i < bill.length; ++i) {
    const item = bill[i];
    item["isBill"] = true;
    runningOrders["billedOrders"]["totalOrder"] += 1;
    runningOrders["billedOrders"]["totalAmt"] += item.BillAmt;
    runningOrders["bill"].push(item);
  }

  return runningOrders;
};

module.exports = { getRunningOrderSrv, getRunningOrdersForOutlets };
