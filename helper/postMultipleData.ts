import { pb } from "lib/database/pocketbase";
import { v4 as uuid } from "uuid";

const postMultipleData = async <T>(collectionName: string, data: T[]) => {
  const promises = data?.map(async (item) => {
    return await pb.collection(collectionName).create(item as object, {
      $cancelKey: `${collectionName}-${uuid()}`,
    });
  });

  const results = await Promise.all(promises);
  const idArray = results.map((result) => result.id);

  return idArray;
};

export default postMultipleData;
