const { Notion } = require("@neurosity/notion");
require("dotenv").config();

const deviceId = process.env.DEVICE_ID || "";
const email = process.env.EMAIL || "";
const password = process.env.PASSWORD || "";

const verifyEnvs = (email, password, deviceId) => {
    const invalidEnv = (env) => {
      return env === "" || env === 0;
    };
    if (
      invalidEnv(email) ||
      invalidEnv(password) ||
      invalidEnv(deviceId)
    ) {
      console.error(
        "Please verify deviceId, email and password are in .env file, quitting..."
      );
      process.exit(0);
    }
  };
  verifyEnvs(email, password, deviceId);
  
console.log(`${email} attempting to authenticate to ${deviceId}`);
  
const notion = new Notion({
    deviceId
});
  
const main = async () => {
    await notion
      .login({
        email,
        password
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
    console.log("Logged in");
};

// calm subscription example
  
//notion.calm().subscribe((calm) => {
//    if (calm.probability > 0.3) {
//      console.log("Hello World!");
//    }
//  });

// kenesis subscription example

notion.kinesis("leftHandPinch").subscribe((intent) => {
    console.log("Hello World!");
  });
  
  main();