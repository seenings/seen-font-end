import { Education } from "../../../model/consumer/school/Education";

/**
 * 学校工具类
 */
export class SchoolUtils {
  static toEducations(): Map<number, string> {
    const entries = Object.entries(Education);
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
    return Education[id];
  }

  static idToEducation(id: number): Education {
    const education = Education[id];
    return this.nameToEducation(education);
  }

  static nameToEducation(educationString: string): Education {
    const education = educationString as keyof typeof Education;
    return Education[education];
  }

  static nameToId(educationString: string): number {
    const education = educationString as keyof typeof Education;
    return Education[education].valueOf();
  }

  static educationToName(education: Education): string {
    return Education[education];
  }

  static educationToId(education: Education): number {
    return education.valueOf();
  }
}
