export interface UserState {
  response: {
    success?: boolean;
    message?: string;
    result?: any[];
  };
}

export const createState = (): UserState => {
  return {
    response: {
      success: false,
      message: "",
      result: [],
    }
  };
}