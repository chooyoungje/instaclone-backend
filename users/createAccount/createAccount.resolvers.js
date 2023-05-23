import client from "../../client";
import bcrypt from "bcrypt"

export default {
    Mutation: {
        createAccount: async (_, { firstName, lastName, username, email, password }) => {
            // 이메일이나 username이 이미 있는지 중복 체크
            try {
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [
                            {
                                username
                            },
                            {
                                email
                            }]
                    }
                });
                if (existingUser) { 
                    throw new Error("이미 존재하는 사용자입니다");
                } 
                // 에러가 없다면 비번 hash허가
                const hashedPassword = await bcrypt.hash(password, 10);
                // 에러 없이 완료?? => DB에 저장
                return client.user.create({
                    data: {
                        firstName,
                        lastName,
                        email,
                        username,
                        password: hashedPassword,
                    }
                });
            } catch(error){ 
                return error;
            }

        },
    }
}