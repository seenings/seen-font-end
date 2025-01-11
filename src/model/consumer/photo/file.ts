/**
 * 这是照片
 */
export interface PhotoContent {
  /**
   * 文件
   */
  file: File | null;
  /**
   * 压缩图片路径
   */
  compressImageUrl: string;
  /**
   * 图片路径
   */
  imageUrl: string;
  /**
   * 状态
   */
  status: PhotoStatus;
}

export type PhotoStatus =
  | "没上传"
  | "上传成功"
  | "上传失败"
  | "下载成功"
  | "下载失败";
