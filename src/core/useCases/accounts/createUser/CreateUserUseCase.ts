export namespace ICreateUserDTO {
  export type Params = {
    name: string;
    password: string;
    email: string;
    driver_license: string;

    id?: string;
    avatar?: string;
  };
}

interface ICreateUserUseCase {
  execute(data: ICreateUserDTO.Params): Promise<void>;
}

export { ICreateUserUseCase };
