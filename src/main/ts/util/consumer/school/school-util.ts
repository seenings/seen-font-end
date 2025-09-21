import {Education} from "../../../model/consumer/school/Education.ts";

/**
 * 学校工具类
 */
export class SchoolUtils {
    static toEducations(): Map<number, string> {

        const result = new Map<number, string>();
        Education.values
            .forEach((value, key) => {
                result.set(key, value.key);
            })
        return result;
    }
}
