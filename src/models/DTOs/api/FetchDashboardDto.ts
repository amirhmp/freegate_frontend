import z from "zod";

const LinkType = z.object({
  title: z.string(),
  link: z.string(),
});

const PaymentAccountType = z.object({
  id: z.number(),
  title: z.string(),
  owner: z.string(),
  card_number: z.number(),
});

export const FetchDashboardDtoType = z.object({
  data: z.object({
    xray_account: z.string(),
    remainDays: z.number(),
    remainGB: z.string(),
    enable: z.boolean(),
    links: z.array(LinkType),
    os: z.string(),
    name: z.string(),
    username: z.string(),
    price: z.array(z.number()),
    paymentAccount: PaymentAccountType,
  }),
  succeed: z.boolean(),
  message: z.string().optional(),
});

export type FetchDashboardDto = z.infer<typeof FetchDashboardDtoType>;
