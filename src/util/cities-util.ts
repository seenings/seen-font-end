import type { CascaderString } from "../model/sys/option";

 
export class CitiesUtils {
  /**
   * 遍历value找text
   * @param pickerOptions 选项数组
   * @param values 值
   */
  static valuesToText(
    pickerOptions: CascaderString[],
    values: string[] | number[],
  ): string {
    if (!values || !values[0] ) {
      return "";
    }
    const firstValue = values[0];
    const secondValue = values[1];
    let firstText = "";
    let secondText = "";
    let subs: CascaderString[] = [];
    for (let i = 0; i < pickerOptions.length; i++) {
      if (pickerOptions[i].v === firstValue) {
        firstText = pickerOptions[i].t;
        subs = pickerOptions[i].c;
      }
    }
    for (let i = 0; i < subs.length; i++) {
      if (subs[i].v === secondValue) {
        secondText = subs[i].t;
      }
    }
    return firstText + (secondText ? "～" + secondText : "");
  }
}
