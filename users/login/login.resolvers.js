import client from "../../client";
import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken";

// 실제로 할 행동들 적어 놓기
export default {
    Mutation: {
        login: async (_, {username, password}) => { 

                //DB에서 username있는지 찾기
                const existingUser = await client.user.findUnique({ where: { username } });
                if (!existingUser) {
                    return {ok : false, error: "유저 찾지못함"}
                } 
                const okPassword = await bcrypt.compare(password, existingUser.password)
                if (!okPassword) { 
                    return {ok : false, error: "비밀번호가 틀렸음"}
                }
            const token = jwt.sign({ id: existingUser.id }, process.env.SECRET_KEY);
            return {
                ok: true,
                token
            }
        }
         }
    }