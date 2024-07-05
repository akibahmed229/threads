import UserService, {
  CreateUserPayload,
  GetUserPayload,
  UpdateUserPayload,
} from "../services/user";

const queries = {
  getUserToken: async (
    _: any,
    payload: { email: string; password: string },
  ) => {
    const token = await UserService.getUserToken({
      email: payload.email,
      password: payload.password,
    });

    return token;
  },

  getCurrentLoggedInUser: async (_: any, parametrs: any, context: any) => {
    if (!context && !context.user) {
      throw new Error("User not found");
    }
    const id = context.user.id;
    const user = UserService.getUserById(id);

    return user;
  },

  userLogin: async (_: any, payload: GetUserPayload) => {
    const user = await UserService.userLogin(payload);

    return user;
  },
};

const mutation = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUser(payload);

    return res.id;
  },
  updateUser: async (_: any, payload: UpdateUserPayload) => {
    const res = await UserService.updateUser(payload);

    return res;
  },
};

export const resolvers = { queries, mutation };
