export class RecordUtils {
  /**
   * Record转Map
   * @param record    {key:value}
   */
  static recordToMap(
    record: Record<string | number, string | number>,
  ): Map<string | number, string | number> {
    const map = new Map<string | number, string | number>();
    for (const entry of Object.entries(record)) {
      map.set(entry[0], entry[1]);
    }
    return map;
  }

  /**
   * Record转PickerOption
   * @param record    {key:value}
   */
  static recordToPickerOption(
    record: Record<string | number, string | number>,
  ): { value: string | number; text: string | number }[] {
    const pickerOptions: { value: string | number; text: string | number }[] =
      [];
    for (const recordKey in record) {
      pickerOptions.push({
        text: record[recordKey],
        value: recordKey,
      });
    }
    return pickerOptions;
  }

  /**
   * 遍历value找text
   * @param pickerOptions 选项数组
   * @param value 值
   */
  static valueToText(
    pickerOptions: { value: string | number; text: string | number }[],
    value: string | number,
  ): string | number {
    const find = pickerOptions.find((res) => {
      return res.value === value || res.value === value + "";
    });
    return find ? find.text : value;
  }
}
