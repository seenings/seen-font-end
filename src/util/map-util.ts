export class MapUtils {
  /**
   * Map对象转vant的PickerOption
   * @param map   map对象
   */
  static mapToPickerOption(
    map: Map<string | number, string | number>,
  ): { value: string | number; text: string | number }[] {
    const pickerOptions: { value: string | number; text: string | number }[] =
      [];
    for (const entry of map.entries()) {
      pickerOptions.push({
        text: entry[1],
        value: entry[0],
      });
    }
    return pickerOptions;
  }
}
