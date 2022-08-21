import { z } from "zod";
import Center from "@models/Center";

export const CenterDtoType = z.object({
  Id: z.number(),
  TagId: z.number(),
  Name: z.string(),
  Value: z.number(),
  saghf: z.number(),
  Different: z.number(),
  picValue: z.number(),
  picTime: z.string(),
  ReceiveTime: z.string(),
});

export const transformCenterDto = (dto: CenterDto): Center => {
  return {
    id: dto.Id,
    currentValue: dto.Value,
    name: dto.Name,
    floor: dto.saghf,
    peak: dto.picValue,
    peakTime: dto.picTime,
    remainCapacity: dto.Different * -1,
  };
};

export type CenterDto = z.infer<typeof CenterDtoType>;
