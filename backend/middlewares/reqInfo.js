const UAParser = require("ua-parser-js");

function reqInfo(req, res, next) {
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const userAgentString = req.headers["user-agent"];
  const parser = new UAParser();
  const uaResult = parser.setUA(userAgentString).getResult();

  const deviceInfo = {
    browser: uaResult.browser.name, // Browser name
    browserVersion: uaResult.browser.version, // Browser version
    os: uaResult.os.name, // OS name
    osVersion: uaResult.os.version, // OS version
    full_ip: ipAddress, // IP address
    client_ip: ipAddress.split(", ")[0], // IP address
  };

  req.deviceInfo = deviceInfo;

  console.log(deviceInfo);

  next();
}

module.exports = reqInfo;
