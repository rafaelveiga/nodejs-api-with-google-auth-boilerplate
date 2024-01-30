import { PrismaClient, User } from "@prisma/client";
import { Profile } from "passport-google-oauth20";
const prisma = new PrismaClient();

class UserController {
  async findOrCreate(profile: Profile) {
    console.log(profile);
    const user = await prisma.user.findUnique({
      where: {
        email: profile.emails![0].value,
      },
    });

    if (!user) {
      const newUser = await this.createUser(profile);

      return newUser;
    } else {
      return user;
    }
  }

  async createUser(profile: Profile) {
    const newUser = await prisma.user.create({
      data: {
        email: profile.emails![0].value,
        name: profile.displayName,
      },
    });

    return newUser;
  }
}

export default new UserController();
