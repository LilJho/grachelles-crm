import { AddOnsRecordExtend } from "types/pocketbase-types";

const useExtractAddOns = (addOnsList: AddOnsRecordExtend[]) => {
  const flattenAddOnsData: AddOnsRecordExtend[] = [].concat(
    ...(addOnsList as any)
  );

  const extractAddOnsData = flattenAddOnsData.reduce((acc: any, val) => {
    const existingAddOn = acc?.find((item: any) => item.name === val.name);
    if (existingAddOn) {
      existingAddOn.total_amount += val?.total_amount;
      existingAddOn.quantity += val?.quantity;
      return acc;
    } else {
      return [
        ...acc,
        {
          name: val?.name,
          total_amount: val?.total_amount,
          price: val?.price,
          quantity: val?.quantity,
        },
      ];
    }
  }, []);

  return extractAddOnsData;
};

export default useExtractAddOns;
