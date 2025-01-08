export class StringUtil {
  /**
   * 创建空格
   * @param length    长度
   */
  static createBlank(length: number): string {
    let str = "";
    for (let i = 0; i < length; i++) {
      str += " ";
    }
    return str;
  }

  /**
   *  换行符替换
   * @param str   字符串
   */
  static changeLine(str: string): string {
    return str.replace(/\n/g, "<br/>");
  }

  /**
   * 根据内容解析出文件名
   * @param str 内容
   */
  static contentToFilename(str: string): string {
    if (!str) {
      return str;
    }
    let split = str.split(";");
    if (!split || split.length === 0) {
      return "";
    }
    let value = split
      .map((n: string) => {
        let split1 = n.split("=");
        if (split1[0].indexOf("filename") > -1) {
          return split1[1];
        }
      })
      .find((n) => !!n);
    return value ? value : "";
  }
}
