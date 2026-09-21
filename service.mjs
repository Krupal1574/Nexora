// @ts-check
import nextjs from "@prisma/composer/nextjs";
import { compute } from "@prisma/composer-prisma-cloud";
import { postgres, dataContract } from "@prisma/composer-prisma-cloud/orm";
import nexoraSiteContractJson from "./src/prisma/contract.json" with { type: "json" };

export default compute({
  name: "nexora-site",
  deps: { db: postgres(dataContract(nexoraSiteContractJson)) },
  build: nextjs({ module: import.meta.url, appDir: "." }),
});
