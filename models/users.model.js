// const DB = require('../config/db');

const prisma = require("../config/db/prisma");

const USERS = {    
    create: async (req) => {
        try {
            const { username, email, password } = req.body;        
            const user = await prisma.users.create({
                data: {
                    username,
                    email,
                    password
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    password: true,
                    profilePic: true,
                    createdAt: true
                }
            })            
            return user;            
        } catch (err) {
            console.log(err);
            return { status: "failed", message: err.message };
        }
    }
}

module.exports = USERS;