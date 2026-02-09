export type TestUser = {
  username: string;
  password: string;
};

export const USERS = {
  valid: {
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
  },
} satisfies Record<string, TestUser>;
