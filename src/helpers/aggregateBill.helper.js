const aggregateBill = async function(data) {
  const finalData = {
    admission: 0,
    totalSale: 0,
    cover: 0,
    apc: 0,
    apb: 0
  };
  if (!data || data.length <= 0) return finalData;

  for (let i = 0; i < data.length; ++i) {
    const item = data[i];
    finalData.admission += item.admission;
    finalData.cover = finalData.totalSale + item.cover;
    // finalData.cover += item.cover;
    finalData.totalSale += item.totalSale;
  }

  finalData["apc"] = Math.round(
    parseInt(finalData.totalSale) / parseInt(finalData.cover)
  );
  finalData["apb"] = Math.round(
    parseInt(finalData.totalSale) / parseInt(finalData.admission)
  );
  return finalData;
};

module.exports = { aggregateBill };
