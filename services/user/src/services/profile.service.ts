import prisma from "../prisma";
import { NotFoundError } from "../handlers/error.handler";

class ProfileService {
    async getProfile(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            throw new NotFoundError("User not found");
        }

        const payload = {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            avatar: user.avatar,
            createdAt: user.createdAt,
            bio: user.bio,
        }

        return payload;
    }

    async updateProfile(id: number, data: any) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            throw new NotFoundError("User not found");
        }

        // no password or email will end up here, 
        // validation will be done in the controller

        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data
        });

        const payload = {
            id: updatedUser.id,
            email: updatedUser.email,
            fullName: updatedUser.fullName,
            avatar: updatedUser.avatar,
            createdAt: updatedUser.createdAt,
            bio: updatedUser.bio,
        }

        return payload;
    }
}

export default ProfileService