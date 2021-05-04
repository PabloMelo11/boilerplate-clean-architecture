type UserTokenPropsDTO = {
  token: string;
  type: string;
  user_id: string;
  expires_date: Date;

  id?: string;
};

export { UserTokenPropsDTO };
