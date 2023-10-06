import { Options } from '@components/common/Checkbox';
import {
  FloorsType,
  FormFilterMap,
  GroupType,
  RowsType,
  SectionsType,
} from 'interface/event';

export interface ExtractedData {
  class: Options[];
  zone: Options[];
  floors: Options[];
  rows: Options[];
}

export function filterDataSeat(
  valueForm: FormFilterMap,
  groups: GroupType[] = []
): ExtractedData {
  const classData: Options[] = [];
  const zoneData: Options[] = [];
  const floorsData: Options[] = [];
  const rowData: Options[] = [];

  function extractData(sections: SectionsType[]): void {
    sections.forEach((section: SectionsType) => {
      const zoneOptions: Options = {
        value: section.id,
        label: section.name,
      };
      zoneData.push(zoneOptions);

      if (section.floors && section.floors.length > 0) {
        section.floors.forEach((floor: FloorsType) => {
          const floorOptions: Options = {
            value: floor.id,
            label: floor.name,
          };
          floorsData.push(floorOptions);

          if (floor.rows && floor.rows.length > 0) {
            floor.rows.forEach((row: RowsType) => {
              const rowOptions: Options = {
                value: row.id,
                label: row.name,
              };
              rowData.push(rowOptions);
            });
          }
        });
      }
    });
  }
  if (valueForm?.classes) {
    groups.forEach((group: GroupType) => {
      const classInformation: Options = {
        value: group.id,
        label: group.name,
      };
      classData.push(classInformation);
      const classSelected = group.id === valueForm?.classes;
      if (classSelected) {
        if (group?.sections && group?.sections.length > 0) {
          group?.sections.forEach((section: SectionsType) => {
            const zoneOptions: Options = {
              value: section.id,
              label: section.name,
            };
            zoneData.push(zoneOptions);
            const zoneSelected = section.id === valueForm?.zones;
            if (zoneSelected) {
              if (section.floors && section.floors.length > 0) {
                section.floors.forEach((floor: FloorsType) => {
                  const floorOptions: Options = {
                    value: floor.id,
                    label: floor.name,
                  };
                  floorsData.push(floorOptions);

                  const floorSelected = floor.id === valueForm?.floors;
                  if (floorSelected) {
                    if (floor.rows && floor.rows.length > 0) {
                      floor.rows.forEach((row: RowsType) => {
                        const rowOptions: Options = {
                          value: row.id,
                          label: row.name,
                        };
                        rowData.push(rowOptions);
                      });
                    }
                  }
                });
              }
            } else if (section.floors && section.floors.length > 0) {
              section.floors.forEach((floor: FloorsType) => {
                const floorOptions: Options = {
                  value: floor.id,
                  label: floor.name,
                };
                floorsData.push(floorOptions);

                const floorSelected = floor.id === valueForm?.floors;
                if (floorSelected) {
                  if (floor.rows && floor.rows.length > 0) {
                    floor.rows.forEach((row: RowsType) => {
                      const rowOptions: Options = {
                        value: row.id,
                        label: row.name,
                      };
                      rowData.push(rowOptions);
                    });
                  }
                } else if (floor.rows && floor.rows.length > 0) {
                  floor.rows.forEach((row: RowsType) => {
                    const rowOptions: Options = {
                      value: row.id,
                      label: row.name,
                    };
                    rowData.push(rowOptions);
                  });
                }
              });
            }
          });
        }
      }
    });
  } else {
    groups.forEach((group: GroupType) => {
      const classInformation: Options = {
        value: group.id,
        label: group.name,
      };
      classData.push(classInformation);
      if (group.sections && group.sections.length > 0) {
        extractData(group.sections);
      }
    });
  }

  return {
    class: classData,
    zone: zoneData,
    floors: floorsData,
    rows: rowData,
  };
}
