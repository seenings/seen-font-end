export class NavigatorUtil {
    /**
     * 复制内容到剪切板
     * @param value 内容
     */
    static clipboardToWriteText(
        value: string,
    ): Promise<boolean> {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(value).then(() => {
                return true;
            });
        } else {
            console.error("Navigator.Clipboard API is not available in this browser");
            return new Promise(() => false)
        }
    }
}