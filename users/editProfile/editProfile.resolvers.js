import client from "../../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    editProfile: async (_, { firstName, lastName, username, email, password: newPassword }, { loggedInUser }) => {
      let hashedPassword = null;
      if (newPassword) {
        hashedPassword = await bcrypt.hash(newPassword, 10);
      }
      const updatedUser = await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          firstName,
          lastName,
          username,
          email,
          ...(hashedPassword && { password: hashedPassword }),
        },
      });
      if (updatedUser.id) {
        return { ok: true };
      } else {
        return { ok: false, error: "프로필 업데이트 불가능" };
      }
    },
  },
};
