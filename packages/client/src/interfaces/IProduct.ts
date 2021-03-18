interface IProduct {
  id?: string;
  title: string;
  thumbnail: string;
}

type chosenProduct = IProduct & {
  option: string;
};
export type {IProduct, chosenProduct};
