import { ConfigDomain } from "backend/lib/config-persistence/types";
import { setupAppConfigTestData } from "./_app-config";
import { setupIntegrationsConstantsTestData } from "./_integrations-constants";
import { setupCredentialsTestData } from "./_credentials";
import { setupDashboardTestData } from "./_dashboard";
import { setupRolesTestData } from "./_roles";
import { setupSchemaTestData } from "./_schema";
import { setupUsersTestData } from "./_users";
import { setupIntegrationsEnvTestData } from "./_integrations-env";
import { setupActivatedActionTestData } from "./_activated-actions";
import { setupActionInstanceTestData } from "./_action-instances";
import { setupActivatedStorageTestData } from "./_activated-storage";
import { setupTestDatabaseData } from "./_data";

export const setupAllTestData = async (
  domains: Array<ConfigDomain | "data">
) => {
  const allTestData: [ConfigDomain | "data", () => Promise<void>][] = [
    ["roles", setupRolesTestData],
    ["app-config", setupAppConfigTestData],
    ["users", setupUsersTestData],
    ["dashboard-widgets", setupDashboardTestData],
    ["schema", setupSchemaTestData],
    ["data", setupTestDatabaseData],
    ["activated_actions", setupActivatedActionTestData],
    ["activated_storage", setupActivatedStorageTestData],
    ["action_instances", setupActionInstanceTestData],
    ["constants", setupIntegrationsConstantsTestData],
    ["environment-variables", setupIntegrationsEnvTestData],
    ["credentials", setupCredentialsTestData],
  ];

  await Promise.all(
    allTestData
      .filter(([domain]) => {
        return domains.includes(domain);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(([_, testDataImpl]) => {
        return testDataImpl();
      })
  );
};
