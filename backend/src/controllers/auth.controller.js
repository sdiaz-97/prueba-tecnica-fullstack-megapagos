import { buildResponse } from "../utils/response.helper.js";
import {
  postLoginService
} from "../services/auth.service.js";

export const postLoginController = async (req, res) => {
  const { email, password } = req.body;
  const response = await postLoginService(email, password);

  if (response.status !== 200) {
    return res.status(200).json({ message: response.message });
  }

  const { tokenjwt } = response.data;

  res.cookie("tokenjwt", tokenjwt, {
    httpOnly: false,
    secure: false,
    sameSite: "Strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.cookie("userInfo", JSON.stringify(response.data.userData), {
    httpOnly: false,
    secure: false,
    sameSite: "Strict",
    maxAge: 24 * 60 * 60 * 1000,
  });


  res
    .status(200)
    .json(buildResponse(response.status, response.message, response.data));;
};
