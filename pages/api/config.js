import configuration from "../../config";

export default function handler(req, res) {
  if (req.connection.remoteAddress == "::1") {
    if (
      configuration.config.levelQuestions.length + 1 ==
      configuration.config.totalDays
    ) {
      configuration.config = req.body;
      res.json({ msg: "Sucessfull Updated" });
    } else {
      res.json({ msg: "Not Sucessfull Updated (Length Not Matching)" });
    }
  } else res.send({ msg: "Not Updated" });
}
