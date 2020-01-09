const { getAgrregatedData } = require("../db");
const { makeOptions } = require("../helpers/_helpers");
const moment = require("moment");

const getDiscountBill = async function(r) {
  const initPipe = [
    // Stage 1
    {
      $match: {
        IsSettle: true,
        IsCancel: false,
        BdiscountPer: { $gt: 0 },
        BillDate: moment().format("YYYYMMDD")
      }
    },

    // Stage 2
    {
      $project: {
        BillNo: 1,
        BillAmt: 1,
        BdiscountPer: 1,
        BDiscountAmt: 1,
        FullName: 1
      }
    }
  ];
  const options = makeOptions(initPipe, r);
  const data = await getAgrregatedData(options);
  return data;
};

const getComplementryAndOTHBill = async function(r) {
  const initPipe = [
    // Stage 1
    {
      $match: {
        // "BillType": "Complimentary",
        BillType: r.billType,
        BdiscountPer: { $eq: 0 },
        BillDate: moment().format("YYYYMMDD")
      }
    },

    // Stage 2
    {
      $project: {
        BillNo: 1,
        BillAmt: 1,
        BDiscountReason: 1,
        FullName: 1
      }
    }
  ];
  const options = makeOptions(initPipe, r);
  const data = await getAgrregatedData(options);
  return data;
};

const getCancelBill = async function(r) {
  const initPipe = [
    // Stage 1
    {
      $match: {
        IsSettle: true,
        IsCancel: true,
        BillDate: moment().format("YYYYMMDD")
      }
    },

    // Stage 2
    {
      $project: {
        BillNo: 1,
        BillAmt: 1,
        CancelReason: 1,
        FullName: 1
      }
    }
  ];
  const options = makeOptions(initPipe, r);
  const data = await getAgrregatedData(options);
  return data;
};

const getModificationBill = async function(r) {
  const initPipe = [
    // Stage 1
    {
      $match: {
        IsSettle: true,
        IsCancel: false,
        IsModified: true,
        BillDate: moment().format("YYYYMMDD")
      }
    },

    // Stage 2
    {
      $project: {
        BillNo: 1,
        BillAmt: 1,
        prebillamt: 1,
        FullName: 1
      }
    }
  ];
  const options = makeOptions(initPipe, r);
  const data = await db.getAgrregatedData(options);
  return data;
};

module.exports = {
  getDiscountBill,
  getComplementryAndOTHBill,
  getModificationBill,
  getCancelBill
};
