import { Request, Response } from "express";
import jwt from "jsonwebtoken";

class AuthController {
  login(req: Request, res: Response) {
    const { user } = req;

    if (process.env.JWT_KEY) {
      const token = jwt.sign({ user }, process.env.JWT_KEY);

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      res.cookie("vault-showndown-session", token, {
        expires: expirationDate,
      });

      res.redirect("http://localhost:5173");

      return;
    }

    res.redirect("http://localhost:5173/?fail");
  }
}

export default new AuthController();
