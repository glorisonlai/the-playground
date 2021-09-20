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

const FLAG_1 = "FLAG{}";
const KEY_1 = "key";
const FLAG_2 = "FLAG{}";
const KEY_2 = "key";
const FLAG_3 = "FLAG{}";
const KEY_3 = "key";
const secret = "secret";
const secretHex = "736563726574";

const blah = encrypt(secret, KEY_1);

console.log(decrypt(blah, KEY_1) === secretHex);
