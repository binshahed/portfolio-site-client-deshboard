/* eslint-disable @typescript-eslint/no-explicit-any */
export type TError = {
  data: {
    success: boolean;
    message: string;
    err?: {
      statusCode: number;
    };
    errorSources: {
      message: string;
      path: string;
    }[];
  };
};

export type TResSuccess = {
  data: {
    data: any;
    message: string;
    success: boolean;
  };
};
