import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const graphqlRouter = createTRPCRouter({
  getPass: publicProcedure
    .input(z.object({ wallet: z.string() }))
    .query(async ({ input }) => {
      const res = await fetch(
        "https://api.studio.thegraph.com/proxy/22025/safu-pass/v0.0.1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
query MyQuery($user: Bytes) {
  passwordAdds(where: {user: $user}) {
    blockNumber
    blockTimestamp
    data
    domain
    id
    transactionHash
    user
  }
}
          `,
            variables: {
              user: input.wallet,
            },
          }),
        },
      );

      const data = await res.json() as {
        data: {
          passwordAdds: {
            blockNumber: string;
            blockTimestamp: string;
            data: string;
            domain: string;
            id: string;
            transactionHash: string;
            user: string;
          }[];
        };
      };

      return { list: data.data.passwordAdds };
    }),
});
