import { rolesController } from "backend/roles/roles.controller";
import { BASE_ROLE_FORM_SCHEMA } from "shared/form-schemas/roles/base";
import { USER_PERMISSIONS } from "shared/types/user";
import { requestHandler } from "../../../backend/lib/request";

export default requestHandler(
  {
    GET: async () => {
      return await rolesController.listRoles();
    },

    POST: async (getValidatedRequest) => {
      const validatedRequest = await getValidatedRequest([
        {
          _type: "requestBody",
          options: BASE_ROLE_FORM_SCHEMA,
        },
      ]);
      return await rolesController.createRole(validatedRequest.requestBody);
    },
  },
  [
    {
      _type: "canUser",
      body: USER_PERMISSIONS.CAN_MANAGE_PERMISSIONS,
    },
  ]
);
