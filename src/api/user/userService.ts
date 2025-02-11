import { StatusCodes } from "http-status-codes";

import type { User, UserRequest } from "@/api/user/userModel";
import { UserRepository } from "@/api/user/userRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { env } from "@/common/utils/envConfig";
import { UserModel } from "@/database/models/User";
import { logger } from "@/server";
import * as jwt from "jsonwebtoken";

export class UserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  // Retrieves all users from the database
  async findAll(): Promise<ServiceResponse<User[] | null>> {
    try {
      const users = await this.userRepository.findAllAsync();
      if (!users || users.length === 0) {
        return ServiceResponse.failure("No Users found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<User[]>("Users found", users);
    } catch (ex) {
      const errorMessage = `Error finding all users: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving users.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieves a single user by their ID
  async findById(id: number): Promise<ServiceResponse<User | null>> {
    try {
      const user = await this.userRepository.findByIdAsync(id);
      if (!user) {
        return ServiceResponse.failure("User not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<User>("User found", user);
    } catch (ex) {
      const errorMessage = `Error finding user with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while finding user.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser(userRequest: UserRequest): Promise<ServiceResponse<string | null>> {
    try {
      const user = await this.userRepository.createUser(userRequest);
      if (!user) {
        return ServiceResponse.failure("User not Created", null, StatusCodes.BAD_REQUEST);
      }
      const token = jwt.sign(
        {
          id: user.id,
        },
        env.SECRET_KEY,
        {
          expiresIn: "1d",
        },
      );
      return ServiceResponse.success<string>("User Created", token);
    } catch (ex) {
      const errorMessage = `Error creating user:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while finding user.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteAll(): Promise<ServiceResponse<string | null>> {
    try {
      const resp = await this.userRepository.deleteAllUsers();
      return ServiceResponse.success<string>("Users deleted", resp);
    } catch (ex) {
      const errorMessage = `Error creating user:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while finding user.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async findUser(username: string, password: string) {
    try {
      const user = await UserModel.findOne({
        where: { username },
      });
      if (!user) {
        return ServiceResponse.failure("Invalid username or password", null, StatusCodes.BAD_REQUEST);
      }
      const isMatch = await UserModel.verifyPassword(password, user.password);
      if (!isMatch) {
        return ServiceResponse.failure("Invalid username or password", null, StatusCodes.UNAUTHORIZED);
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        env.SECRET_KEY,
        {
          expiresIn: "1d",
        },
      );

      return ServiceResponse.success<string>("Login successful", token);
    } catch (ex) {
      const errorMessage = `Error in Login:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred in log in.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const userService = new UserService();
