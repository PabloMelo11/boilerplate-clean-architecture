type ICreateUserControllerDTO = {
  name: string;
  email: string;
  password: string;
  driver_license: string;
  avatar?: string;
};

export { ICreateUserControllerDTO };
