export class Util {
  /**
   * 中文长度=2，英文长度=1（ASCII码）
   * @param str
   */
  static actualLength(str: string): number {
    if (!str) {
      return 0;
    }
    let length = 0;
    for (let i = 0; i < str.length; i++) {
      const charAt = str.charCodeAt(i);
      if (charAt >= 0 && charAt <= 127) {
        length++;
      } else {
        length = length + 2;
      }
    }
    return length;
  }

  /**
   * 按长度分割字符串
   * @param str   字符串
   * @param lineLength    每一行的长度
   */
  static split(str: string, lineLength: number): string[] {
    if (lineLength <= 2) {
      throw new Error("每一行的长度至少要大于2");
    }
    if (!str) {
      return [];
    }
    if (str.length <= 2) {
      return [str];
    }
    const split: string[] = [];
    let start = 0;
    for (let i = 0; i < str.length + 1; i++) {
      const substring = str.substring(start, i);
      const actualLength = this.actualLength(substring);
      if (actualLength === lineLength) {
        split.push(substring);
        start = i;
      } else if (actualLength > lineLength) {
        split.push(str.substring(start, i - 1));
        start = i - 1;
      }
    }
    if (start !== str.length) {
      split.push(str.substring(start, str.length));
    }
    return split;
  }

  static len<V>(data: Record<string | number | symbol, V>): number {
    if (typeof data === "undefined") {
      return 0;
    }
    return Object.keys(data).length;
  }
}
