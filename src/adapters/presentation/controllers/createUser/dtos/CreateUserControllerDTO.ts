type CreateUserControllerDTO = {
  name: string;
  email: string;
  password: string;
  driver_license: string;
  avatar?: string;
};

export { CreateUserControllerDTO };
