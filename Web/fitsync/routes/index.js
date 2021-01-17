var express = require("express");
var router = express.Router();
const OpenTok = require("opentok");

const secrets = require("../keys/passwords.json");

const API_KEY = secrets["API_KEY"];
const API_SECRET = secrets["SECRET"];

router.get("/", function (req, res, next) {
  const vonage_creds = create_session();
  console.log(vonage_creds);
  let json = {
    api_key: API_KEY,
    sessionID: vonage_creds.sessionID,
    token: vonage_creds["token"],
  };
  res.render("index", { data: JSON.stringify(json) });
});

function create_session() {
  const opentok = new OpenTok(API_KEY, API_SECRET);
  let sessionId;
  let token;
  opentok.createSession({ mediaMode: "routed" }, function (error, session) {
    if (error) {
      console.log("Error creating session:", error);
    } else {
      sessionId = session.sessionId;
      let tokenOptions = {};
      tokenOptions.role = "publisher";

      // Generate a token.
      token = opentok.generateToken(sessionId, tokenOptions);
    }
  });
  // console.log(`token:: ${token}`);
  sessionId =
    "2_MX40NzA4NDU0NH5-MTYxMDg0MzcwODkwN35IMW9xLzBqN3E0My8xSkwzbmNaZ09Scmd-fg";
  token =
    "T1==cGFydG5lcl9pZD00NzA4NDU0NCZzaWc9MGMzYmM1YTFlMTg1NzhhNDk4N2ZjNjYxZThiYTU4Nzg2Y2QyNTMyNTpzZXNzaW9uX2lkPTJfTVg0ME56QTRORFUwTkg1LU1UWXhNRGcwTXpjd09Ea3dOMzVJTVc5eEx6QnFOM0UwTXk4eFNrd3pibU5hWjA5U2NtZC1mZyZjcmVhdGVfdGltZT0xNjEwODQzNzI0Jm5vbmNlPTAuODAyODYxNTE0MzU1NTYwMiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjEzNDM1NzIzJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";
  return { sessionID: sessionId, token: token };
}

module.exports = router;
