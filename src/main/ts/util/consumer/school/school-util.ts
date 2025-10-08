import {Education} from "../../../model/consumer/school/Education.ts";

/**
 * 学校工具类
 */
export class SchoolUtils {
    static toEducations(): Map<number, string> {

        const result = new Map<number, string>();
        Education.values
            .forEach((value) => {
                result.set(value, Education.key(value));
            })
        return result;
    }
}
