export type PropsType = {
  route: {
    key: string;
    name: string;
    path: string | undefined;
    params: {
      url: string;
    };
  };
};

export type ChainProps = {
  name: string;
};
