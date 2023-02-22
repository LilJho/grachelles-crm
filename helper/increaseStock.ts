import { pb } from "lib/database/pocketbase";
import { updateStock } from "helper/updateStock";
import { ListResult } from "pocketbase";
import { IngredientsResponse, StocksResponse } from "types/pocketbase-types";
import _ from "lodash";

export const increaseStock = async (ingredients: string[]) => {
  try {
    const ingredientsCount = _.countBy(ingredients);
    const ingredientsUniq = _.uniq(ingredients);
    let filter = "";
    for (let i = 0; i < ingredientsUniq.length; i++) {
      filter += `id="${ingredientsUniq[i]}"`;
      if (i !== ingredientsUniq.length - 1) {
        filter += `||`;
      }
    }
    const res = (await pb.collection("ingredients").getList(1, 50, {
      filter,
      expand: "stock",
    })) as ListResult<IngredientsResponse>;
    const allIngredients = res.items.map((item) => ({
      ...item,
      quantity: item.quantity * ingredientsCount[item.id],
    }));
    console.log(allIngredients);
    const decreaseStockIngredients: Array<StocksResponse> = [];
    allIngredients.forEach((item) => {
      if (item.expand && item.expand.stock) {
        decreaseStockIngredients.push({
          ...item.expand.stock,
          quantity: item.expand.stock.quantity + item.quantity,
        });
      }
    });
    await updateStock(decreaseStockIngredients);
  } catch (error) {
    console.log(error);
  }
};
