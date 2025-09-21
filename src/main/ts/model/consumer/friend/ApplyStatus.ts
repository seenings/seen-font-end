/**
 * 申请类型
 */
import {Enum} from "enum-plus";

export const ApplyStatus = Enum( {
  "未查看":0,
  "已通过好友请求":1,
  "请求被拒绝":2,
  "过期自动拒绝":3,
  "被请求方查看了申请":4,
})

export type ApplyStatusKey = typeof ApplyStatus.keyType;
export type ApplyStatusValue = typeof ApplyStatus.valueType;