const imageKitConfig = require('../config/lib/imagekit.js');
// const { upload } = require('../config/storage/local/index.js');
const prisma = require('../config/db/prisma.js')

const USERS_MODELS = require('../models/users.model.js');

async function index(req, res) {
    try {
        const users = await prisma.users.findMany({
            select: {
                username: true,
                email: true,
                profilePic: true
            }
        })        
        res.json({
            status: 200,
            message: "Success GET Users API",
            data: users
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

async function createUser(req, res) {
    try {        
        const result = await USERS_MODELS.create(req);
        res.json({
            status: 201,
            message: "Success POST Users API",
            data: result
        })        
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
          });
    }
}

async function userById(req, res) {
    try {
        const userId = req.params.id;
        const isUser = await prisma.users.findUnique({
            where: {
                id: userId
            }
        });

        if (!isUser) {
            throw new Error('User not found');
        }

        const userDetails = await prisma.users.findUnique({
            where: {
                id: userId
            },
            select: {
                username: true,
                email: true,
                profilePic: true
            }
        })

        res.json({
            status: 200,
            message: 'Success GET user data',
            data: userDetails
        })
        return userDetails;
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
          });
    }
}

async function uploadProfilePic(req, res) {
    try {
        const userId = req.params.id;
        const isUser = await prisma.users.findUnique({
            where: {
                id: userId
            }
        })
        if (!isUser) {
            throw new Error("User not Found");
        }
        
        const profilePic = req.file;
        if (profilePic = !req.file) {
            throw new Error('No file selected')
        }

        const uploadPic = await imageKitConfig.upload({
            file: profilePic.buffer.toString('base64'),
            fileName: profilePic.originalname,
            folder: '/ch6-assets/profilePic',
            tags: ['user-profie-picture']
        })

        const result = await prisma.users.update({
            where: {
                id: userId
            },
            data: {
                profilePic: uploadPic.url
            }
        })

        console.log(result);
        return result;
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
          });
    }
}

module.exports = {
    index,
    createUser,
    userById,
    uploadProfilePic
}