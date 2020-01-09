const {
  roundAmount,
  getSaleBySpecficField,
  getSaleByBillCategories
} = require("./../helpers/_helpers");

const getSaleByPaymentMode = async function(r) {
  const data = await getSaleBySpecficField({
    ...r,
    fieldName: "SettlementType"
  });
  return await roundAmount(data);
};

const getSaleByBillType = async function(r) {
  return await getSaleBySpecficField({ ...r, fieldName: "BillType" });
};

module.exports = {
  getSaleByPaymentMode,
  getSaleByBillType,
  getSaleByBillCategories
};
