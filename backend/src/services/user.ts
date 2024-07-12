import { createHmac, randomBytes } from "node:crypto"; // Importing Node.js crypto modules for hashing and generating random bytes
import JWT from "jsonwebtoken"; // Importing JWT library for JSON Web Token operations
import { prismaClient } from "../lib/db"; // Importing Prisma Client instance for database operations

const JWT_SECRET = "I_AM_A_SECRET"; // Secret key used for JWT signing and verification

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImageURL: string;
}

export interface GetUserPayload {
  email: string;
  password: string;
}

class UserService {
  // Static method to generate hashed password using HMAC with SHA-256
  public static generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
  }

  // Static method to retrieve a user by ID using Prisma Client
  public static getUserById(id: string) {
    return prismaClient.user.findUnique({
      where: {
        id,
      },
    });
  }

  // Static method to create a new user using Prisma Client
  public static async createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password } = payload;
    const salt = randomBytes(32).toString("hex"); // Generate a random salt
    const hashedPassword = UserService.generateHash(salt, password); // Generate hashed password using the generated salt

    return await prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword, // Store hashed password in the database
        salt, // Store salt in the database for password hashing
      },
    });
  }
  // Static method to Login a user
  public static async updateUser(payload: UpdateUserPayload) {
    const { firstName, lastName, email, password, profileImageURL } = payload;

    const user = await UserService.getUserByEmail(email); // Retrieve user by email

    if (!user) {
      throw new Error("User not found");
    }

    const newPassword = !password
      ? user.password
      : UserService.generateHash(user.salt, password);

    const updatedinfo = await prismaClient.user.update({
      where: {
        email,
      },
      data: {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        password: newPassword || user.password,
        profileImageURL: profileImageURL || user.profileImageURL,
      },
    });

    // return the user
    return updatedinfo;
  }

  // Static method to Login a user
  public static async userLogin(payload: GetUserPayload) {
    const { email, password } = payload;

    const user = await UserService.getUserByEmail(email); // Retrieve user by email

    if (!user) {
      throw new Error("User not found");
    }

    // check if the password is correct
    const userSalt = user.salt;
    const userHashPassword = UserService.generateHash(userSalt, password);

    if (user.password !== userHashPassword) {
      throw new Error("Invalid password");
    }

    // return the user
    return user;
  }

  // Private static method to retrieve a user by email using Prisma Client
  private static async getUserByEmail(email: string) {
    return await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
  }

  // Static method to authenticate user and generate JWT token
  public static async getUserToken(payload: GetUserPayload) {
    const { email, password } = payload;
    const user = await UserService.getUserByEmail(email); // Retrieve user by email

    if (!user) {
      throw new Error("User not found"); // Throw error if user does not exist
    }

    const userSalt = user.salt; // Retrieve user's salt from the database
    const userHashPassword = UserService.generateHash(userSalt, password); // Generate hashed password using user's salt

    if (user.password !== userHashPassword) {
      throw new Error("Invalid password"); // Throw error if password does not match
    }

    // Generate JWT token with user ID and email payload
    const token = JWT.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1m",
      },
    );

    return token; // Return JWT token
  }

  // Static method to decode JWT token
  public static decodeJWToken(token: string) {
    return JWT.verify(token, JWT_SECRET); // Decode and verify JWT token
  }
}

export default UserService; // Export UserService class as default
