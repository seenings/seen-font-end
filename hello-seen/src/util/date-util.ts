import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

import zhCn from "dayjs/locale/zh-cn";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.locale(zhCn);
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});
dayjs.updateLocale("zh-cn", {
  relativeTime: {
    future: "%s后",
    past: "%s前",
    s: "几秒",
    m: "一分钟",
    mm: "%d分钟",
    h: "一小时",
    hh: "%d小时",
    d: "一天",
    dd: "%d天",
    M: "一个月",
    MM: "%d月",
    y: "一年",
    yy: "%d年",
  },
});

export class DateUtil {
  /**
   * 根据当前时间获取字符串，分钟
   * @param date  日期时间
   * @return 字符串
   */
  static fromNowByMinute(date: Date): string {
    return dayjs(date).fromNow();
  }

  /**
   * 根据日期获取中国日期时间
   * @param date  日期时间
   */
  static dateToChinenseDateTime(date: Date): string {
    return dayjs(date).format("YYYY年M月D日 H时m分s秒");
  }

  /**
   * 根据日期获取中国日期
   * @param date 日期时间
   */
  static dateToChinenseDate(date: Date): string {
    return dayjs(date).format("YYYY年M月D日");
  }

  /**
   * 两个日期的差异，毫秒
   * @param firstDate 第一个日期
   * @param secondDate  第二个日期
   * @return 毫秒
   */
  static diff(firstDate: Date, secondDate: Date): number {
    return dayjs(firstDate).diff(dayjs(secondDate));
  }

  /**
   * 获取月份，实际的
   * @param date  日期
   */
  static getMonth(date: Date): number {
    return dayjs(date).month() + 1;
  }
}
