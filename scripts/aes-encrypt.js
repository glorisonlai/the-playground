const Forge = require("node-forge");

const makeKey = () => {
  const key = Forge.random.getBytesSync(16);
  console.log(Forge.util.bytesToHex(key));
  return Forge.util.bytesToHex(key);
};

const encrypt = (msg, key) => {
  const cipher = Forge.cipher.createCipher("AES-CBC", key);
  cipher.start({ iv: key });
  cipher.update(Forge.util.createBuffer(msg, "utf8"));
  cipher.finish();
  const encrypted = cipher.output;
  console.log(encrypted.toHex());
  return encrypted.toHex();
};

const decrypt = (encryptedHex, key) => {
  const encrypted = Forge.util.hexToBytes(encryptedHex);
  const decipher = Forge.cipher.createDecipher("AES-CBC", key);
  decipher.start({ iv: key });

  decipher.update(Forge.util.createBuffer(encrypted));
  decipher.finish();
  const decrypted = decipher.output;
  console.log(decrypted.toHex());
  return decrypted.toHex();
};

const FLAG_1 = "FLAG{1H4V3R34D4L1T3RM54NDC0ND1T10N5}";
const KEY_1 = "e2b739fb839ec9cbcc0b69080c2f8bcf";
const FLAG_2 = "FLAG{TH1S15TH3FL4G}";
const KEY_2 = "90234f66d999daf6edccc5bc1b6f43c4";
const FLAG_3 = "FLAG{ItxBv6H1Bf0ToAs9vmBZy9EVVfPwZU}";
const KEY_3 = "a80b8710b11d7932fd5fe35d535b4aab";

const blah = encrypt(
  "According to all known laws of aviation, there is no way a bee should be able to fly.",
  KEY_1
);

// const blah2 = encrypt(
//   "According to all known laws of aviation, there is no way a bee should be able to fly.",
//   KEY_2
// );

// const blah3 = encrypt(
//   "According to all known laws of aviation, there is no way a bee should be able to fly.",
//   KEY_3
// );

decrypt(blah, KEY_1);

makeKey();
