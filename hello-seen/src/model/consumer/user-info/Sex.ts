export enum Sex {
  NONE = 0,

  MALE = 1,

  FEMALE = 2,
}

export enum MaritalStatus {
  "已婚",
  "未婚",
  "离异无孩",
  "离异带孩",
  "离异不带孩",
  "丧偶",
}

export class UserUtils {
  static toMaritalStatuss(): Map<number, string> {
    const entries = Object.entries(MaritalStatus);
    const result = new Map<number, string>();
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const key = entry[0];
      const number = Number(key);
      if (!isNaN(number)) {
        result.set(number, entry[1] + "");
      }
    }
    return result;
  }

  static idToName(id: number): string {
    return MaritalStatus[id];
  }

  static idToMaritalStatus(id: number): MaritalStatus {
    const maritalStatus = MaritalStatus[id];
    return this.nameToMaritalStatus(maritalStatus);
  }

  static nameToMaritalStatus(maritalStatusString: string): MaritalStatus {
    const maritalStatus = maritalStatusString as keyof typeof MaritalStatus;
    return MaritalStatus[maritalStatus];
  }

  static nameToId(maritalStatusString: string): number {
    const maritalStatus = maritalStatusString as keyof typeof MaritalStatus;
    return MaritalStatus[maritalStatus].valueOf();
  }

  static maritalStatusToName(maritalStatus: MaritalStatus): string {
    return MaritalStatus[maritalStatus];
  }

  static maritalStatusToId(maritalStatus: MaritalStatus): number {
    return maritalStatus.valueOf();
  }
}
