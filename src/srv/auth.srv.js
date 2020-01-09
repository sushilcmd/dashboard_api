const { findData, getAgrregatedData } = require("../db");

const login = async ({ userID, password }) => {
  const options = {
    dbName: "customers",
    collection: "allCustomer",
    query: { userID, password }
  };
  try {
    const user = await findData(options);
    if (!user) {
      return { status: false, msg: "Cannot find data" };
    }
    return {
      status: true,
      customerName: user.customerName,
      userName: user.userName,
      outlets: user.outlets
    };
  } catch (error) {
    return { status: false, msg: error };
  }
};

const getOutletIds = async function(r) {
  const data = await getAgrregatedData({
    dbName: r.restaurant,
    collection: "bills",
    query: [
      {
        $group: {
          _id: "$OutletLocation"
        }
      }
    ]
  });
  return data.map( item => item._id)
};

module.exports = { login, getOutletIds };
