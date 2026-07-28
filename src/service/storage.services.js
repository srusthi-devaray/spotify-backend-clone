const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  privateKey: "private_lT/LMfL7RWbtIMe1K7A8aKsqGZw=",
  publicKey: "public_sXdsIR2HemV96RAtXDlunKYj1rk=",
  urlEndpoint: "https://ik.imagekit.io/30xgbuw2m",
});

async function uploadfile(file) {
  const result = await imagekit.upload({
    file,
    fileName: "newfile",
  });
  console.log(result);
  return result;
}

module.exports = uploadfile;
