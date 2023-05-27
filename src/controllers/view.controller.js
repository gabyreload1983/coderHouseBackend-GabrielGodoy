import * as userService from "../services/users.service.js";

export const validateUrlExpiration = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) return res.render("sendEmailResetPassword");

    const isValidUrl = await userService.validateUrlExpiration(id);
    if (!isValidUrl) return res.render("sendEmailResetPassword");

    res.render("resetPassword");
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error);
  }
};
