const a = require("./auth.srv");
const b = require("./getBill.srv");
const c = require("./getData.srv");
const d = require("./getRunningOrder.srv");
const e = require("./getSale.srv");



module.exports = { ...a, ...b, ...c, ...d, ...e };
