import client from "../../client";

export default {
    Query: {
        seeProfile: async (_, {username}) => { 
            try {
                const findUser = client.user.findUnique({ where: { username } });
                if (!findUser) { 
                    throw new Error("찾는 유저가 없습니다");
                }
                return findUser;
             } catch (error) { 
                return error;
            }
        },

    }
}