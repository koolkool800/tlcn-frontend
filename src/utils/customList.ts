import { Options } from '@components/common/Checkbox';
import { Seat } from '@pages/BuyTicket';
import { FloorsType, GroupType, RowsType, SectionsType } from 'interface/event';

interface ExtractedData {
  class: Options[];
  zone: Options[];
  floors: Options[];
  rows: Options[];
}

export const extractDataMap = (
  groups: GroupType[] | undefined
): ExtractedData => {
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

  if (groups && groups.length > 0) {
    groups.forEach((group: GroupType) => {
      const classInformation: Options = {
        value: group.id,
        label: group.name,
        groupName: group.groupId,
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
};

export const findDataClasses = (
  classId: string,
  groups: GroupType[] = []
): ExtractedData => {
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

  if (classId) {
    groups.forEach((group: GroupType) => {
      const classInformation: Options = {
        value: group.id,
        label: group.name,
      };
      classData.push(classInformation);
    });

    const groupItem = groups.find((group: GroupType) => group.id === classId);
    if (groupItem) {
      if (groupItem?.sections && groupItem?.sections.length > 0) {
        extractData(groupItem.sections);
      }
    }
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
};

export function findDataZone(
  zoneId: string,
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

  function extractDataSections(sections: SectionsType[]): void {
    sections.forEach((section: SectionsType) => {
      const zoneOptions: Options = {
        value: section.id,
        label: section.name,
      };
      zoneData.push(zoneOptions);
    });
  }

  if (zoneId) {
    for (const groupItem of groups) {
      const classOptions: Options = {
        value: groupItem.id,
        label: groupItem.name,
      };
      classData.push(classOptions);
      if (groupItem.sections && groupItem.sections.length > 0) {
        extractDataSections(groupItem.sections);
        const zone = groupItem.sections.find(
          (section) => section.id === zoneId
        );
        if (zone) {
          if (zone.floors && zone.floors.length > 0) {
            zone.floors.forEach((floor: FloorsType) => {
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
        }
      }
    }
  } else {
    for (const groupItem of groups) {
      const classOptions: Options = {
        value: groupItem.id,
        label: groupItem.name,
      };
      classData.push(classOptions);
      if (groupItem.sections && groupItem.sections.length > 0) {
        extractData(groupItem.sections);
      }
    }
  }

  return {
    class: classData,
    zone: zoneData,
    floors: floorsData,
    rows: rowData,
  };
}

export function findDataFloor(
  floorId: string,
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

  function extractDataFloor(floors: FloorsType[]): void {
    floors.forEach((floor: FloorsType) => {
      const floorOptions: Options = {
        value: floor.id,
        label: floor.name,
      };
      floorsData.push(floorOptions);
    });
  }

  if (floorId) {
    for (const groupItem of groups) {
      const classOptions: Options = {
        value: groupItem.id,
        label: groupItem.name,
      };
      classData.push(classOptions);

      if (groupItem.sections && groupItem.sections.length > 0) {
        for (const section of groupItem.sections) {
          const zoneOptions: Options = {
            value: section.id,
            label: section.name,
          };
          zoneData.push(zoneOptions);
          if (section.floors && section.floors.length > 0) {
            const floor = section.floors.find((fl) => fl.id === floorId);
            if (floor) {
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

            extractDataFloor(section.floors);
          }
        }
      }
    }
  } else {
    for (const groupItem of groups) {
      const classOptions: Options = {
        value: groupItem.id,
        label: groupItem.name,
      };
      classData.push(classOptions);
      if (groupItem.sections && groupItem.sections.length > 0) {
        extractData(groupItem.sections);
      }
    }
  }

  return {
    class: classData,
    zone: zoneData,
    floors: floorsData,
    rows: rowData,
  };
}

export const findClassIdBasedZoneId = (
  zoneId: string,
  groups: GroupType[] = []
): string | undefined => {
  const foundGroup = groups.find((groupItem) =>
    groupItem.sections.some((section) => section.id === zoneId)
  );
  return foundGroup ? foundGroup.id : undefined;
};

export function findClassAndSectionID(
  floorID: string,
  groups: GroupType[] = []
): {
  classID: string | null;
  sectionID: string | null;
} {
  for (const group of groups) {
    for (const section of group.sections) {
      const foundFloor = section.floors.find((floor) => floor.id === floorID);
      if (foundFloor) {
        return {
          classID: group.id,
          sectionID: section.id,
        };
      }
    }
  }

  return {
    classID: null,
    sectionID: null,
  };
}

export function findClassSectionAndZoneID(
  rowID: string,
  groups: GroupType[] = []
): {
  classID: string | null;
  sectionID: string | null;
  floorID: string | null;
} {
  for (const group of groups) {
    for (const section of group.sections) {
      for (const floor of section.floors) {
        const foundRow = floor.rows.find((row) => row.id === rowID);
        if (foundRow) {
          return {
            classID: group.id,
            sectionID: section.id,
            floorID: floor.id,
          };
        }
      }
    }
  }

  return {
    classID: null,
    sectionID: null,
    floorID: null,
  };
}
