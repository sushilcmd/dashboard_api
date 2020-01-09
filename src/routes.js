const router = require("express").Router();
const srvs = require("./srv/_srv");
const wrapper = async function(req, res, fn) {
  try {
    const r = req.body;
    const data = await fn(r);
    res.json(data);
  } catch (error) {
    res.json({ status: false, msg: error });
  }
};

router.post("/login", async (req, res) => {
  const { userID, password } = req.body;
  const result = await srvs.login({ userID, password });
  res.json(result);
});
router.post("/initalizeApp", async (req, res) => {
  const r = req.body;
});

router.post("/getOutletIds", async (req, res) =>
  wrapper(req, res, srvs.getOutletIds)
);

router.post("/getTotalSale", async (req, res) =>
  wrapper(req, res, srvs.getTotalSale)
);
router.post("/getTotalSaleAllOutlets", async (req, res) =>
  wrapper(req, res, srvs.getTotalSaleAllOutlets)
);
router.post("/getTWItemsSale", async (req, res) =>
  wrapper(req, res, srvs.getTWItemsSale)
);
router.post("/getTopItemsCategories", async (req, res) =>
  wrapper(req, res, srvs.getTopItemsCategoriesSrv)
);
router.post("/getSaleByPaymentMode", async (req, res) =>
  wrapper(req, res, srvs.getSaleByPaymentMode)
);
router.post("/getSaleByBillType", async (req, res) =>
  wrapper(req, res, srvs.getSaleByBillType)
);
router.post("/getSaleByBillCategories", async (req, res) =>
  wrapper(req, res, srvs.getSaleByBillCategories)
);
router.post("/getRunningOrder", async (req, res) =>
  wrapper(req, res, srvs.getRunningOrderSrv)
);
router.post("/getRunningOrders", async (req, res) =>
  wrapper(req, res, srvs.getRunningOrdersForOutlets)
);
router.post("/getDiscountBill", async (req, res) =>
  wrapper(req, res, srvs.getDiscountBill)
);
router.post("/getComplementryAndOTHBill", async (req, res) =>
  wrapper(req, res, srvs.getComplementryAndOTHBill)
);
router.post("/getModificationBill", async (req, res) =>
  wrapper(req, res, srvs.getModificationBill)
);
router.post("/getCancelBill", async (req, res) =>
  wrapper(req, res, srvs.getCancelBill)
);

module.exports = { router };
