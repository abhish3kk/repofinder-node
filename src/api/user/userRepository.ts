import type { User, UserRequest } from "@/api/user/userModel";
import { UserModel } from "@/database/models/User";

export class UserRepository {
  async findAllAsync(): Promise<User[]> {
    return await UserModel.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
  }

  async findByIdAsync(id: number): Promise<User | null> {
    return UserModel.findByPk(id, {
      attributes: {
        exclude: ["id", "password", "password", "createdAt", "updatedAt"],
      },
    });
  }

  async createUser(req: UserRequest): Promise<User> {
    const user = await UserModel.create(req);
    return user;
  }

  async deleteAllUsers(): Promise<string> {
    await UserModel.truncate();
    return "Users truncated";
  }

  async findUser(username: string, password: string): Promise<User | null> {
    const user = await UserModel.findOne({
      where: { username },
    });
    if (!user) {
      return null;
    }
    const isMatch = await UserModel.verifyPassword(password, user.password);
    if (!isMatch) {
      return null;
    }

    return user;
  }
}
