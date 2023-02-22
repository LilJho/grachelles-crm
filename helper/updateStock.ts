import { pb } from "lib/database/pocketbase";
import { StocksResponse } from "types/pocketbase-types";

export const updateStock = (stocks: Array<StocksResponse>) => {
  const promises: Array<Promise<StocksResponse>> = [];

  stocks.forEach((item) => {
    if (item) {
      pb.collection("stocks").update(item.id, item);
    }
  });

  const promise = new Promise((resolve, rejects) => {
    Promise.all(promises)
      .then((res) => resolve(res))
      .catch((e) => rejects(e));
  });
  return promise;
};
