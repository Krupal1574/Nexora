// @ts-check
import { module } from "@prisma/composer";
import { postgres, dataContract } from "@prisma/composer-prisma-cloud/orm";
import nexoraSiteContractJson from "./src/prisma/contract.json" with { type: "json" };
import nexoraSiteService from "./service.mjs";

export default module("nexora", ({ provision }) => {
  const database = provision(postgres({ name: "database", contract: dataContract(nexoraSiteContractJson), config: "./prisma.config.ts" }));
  provision(nexoraSiteService, { id: "nexorasite", deps: { db: database } });
});
