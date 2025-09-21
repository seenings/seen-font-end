import type {CascaderString} from "../model/sys/option.ts";


export class CitiesUtils {
    /**
     * 遍历value找text
     * @param pickerOptions 选项数组
     * @param values 值
     */
    static valuesToText(
        pickerOptions: CascaderString[] | undefined,
        values: string[] | number[],
    ): string {
        if (!values || !values[0] || !pickerOptions) {
            return "";
        }
        const firstValue = values[0];
        const secondValue = values[1];
        let firstText = "";
        let secondText = "";
        let subs: CascaderString[] = [];
        for (let i = 0; i < pickerOptions.length; i++) {
            let pickerOption:CascaderString|undefined = pickerOptions[i];
            if (pickerOption&&pickerOption.v === firstValue) {
                firstText = pickerOption.t;
                subs = pickerOption.c;
            }
        }
        for (let i = 0; i < subs.length; i++) {
            let sub:CascaderString|undefined = subs[i];
            if (sub&&sub.v === secondValue) {
                secondText = sub.t;
            }
        }
        return firstText + (secondText ? "～" + secondText : "");
    }
}
