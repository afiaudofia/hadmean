import { DeleteButton, SoftButton, Stack } from "@adminator/chromista";
import { useEntityDataDeletionMutation } from "frontend/hooks/data/data.store";
import { useEntityIdField } from "frontend/hooks/entity/entity.store";
import { NAVIGATION_LINKS } from "frontend/lib/routing";
import { IEntityCrudSettings } from "shared/configuration.constants";

interface IProps {
  crudSettings: IEntityCrudSettings;
  entity: string;
  row: {
    original: Record<string, unknown>;
  };
}

export function TableActions({ crudSettings, row, entity }: IProps) {
  const idField = useEntityIdField(entity);
  const entityDataDeletionMutation = useEntityDataDeletionMutation(entity);

  const idValue = row.original[idField.data || "id"] as string;
  return (
    <Stack spacing={4} align="center">
      {crudSettings.details && (
        <div>
          <SoftButton
            action={NAVIGATION_LINKS.ENTITY.DETAILS(entity, idValue)}
            label="Details"
            color="primary"
            justIcon
            icon="eye"
          />
        </div>
      )}
      {crudSettings.update && (
        <div>
          <SoftButton
            action={NAVIGATION_LINKS.ENTITY.UPDATE(entity, idValue)}
            label="Edit"
            icon="edit"
            color="primary"
            justIcon
          />
        </div>
      )}
      {crudSettings.delete && (
        <div>
          <DeleteButton
            onDelete={() => entityDataDeletionMutation.mutate(idValue)}
            isMakingDeleteRequest={entityDataDeletionMutation.isLoading}
            shouldConfirmAlert
          />
        </div>
      )}
    </Stack>
  );
}
