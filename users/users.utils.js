import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    // 토큰이 없다면 유저가 없는 것이다(확인 불가능)
    console.log(token);
    // token에서 id 가져오기
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    console.log(id);
    // id가지고 유저 찾기 유저가 있으면 유저 리턴
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};
