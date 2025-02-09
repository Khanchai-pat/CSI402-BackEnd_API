import express, { Request, Response } from "express";
export const members = express();

members.post("/members", (req: Request, res: Response) => {
  const { stdId, moneys } = req.body;
  try {
    if (!stdId || !moneys) {
      res.status(500).send({
        status: "error",
        msg: "ใส่ข้อมูลไม่ครบถ้วน",
      });
    } else {
      let point = 0;
      let totalPoint = 1000;

      if (moneys < 100) {
        res.status(500).send({
          status: "OK",
          msg: "จำนวนเงินนี้ไม่สามารถแลกเป็นแต้มได้",
          data: {
            stdId: stdId,
            pointsEarned: point,
            totalPoint: totalPoint,
          },
        });
      } else {
        point = (moneys / 100) * 10;
        totalPoint += point;
        res.status(200).send({
          status: "OK",
          msg: "สะสมแต้มแล้ว",
          data: {
            stdId: stdId,
            pointsEarned: point,
            totalPoint: totalPoint,
          },
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      status: "OK",
      msg: `ไม่พบข้อมูล ${error}`,
    });
  }
});
