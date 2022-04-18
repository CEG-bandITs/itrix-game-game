import configuration from "../../config";

export default function handler(req, res) {
  console.log(req.connection.remoteAddress);
  if (
    req.connection.remoteAddress == "::1" ||
    req.connection.remoteAddress == "::ffff:127.0.0.1"
  ) {
    if (
      configuration.config.levelQuestions.length ==
      configuration.config.totalDays + 1
    ) {
      configuration.config = req.body;
      res.json({ msg: "Sucessfully Updated" });
    } else {
      res.json({ msg: "Not Sucessfull Updated (Length Not Matching)" });
    }
  } else res.send({ msg: "Not Updated" });
}
