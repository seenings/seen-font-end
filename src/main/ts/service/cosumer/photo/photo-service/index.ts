import type {AxiosResponse} from "axios";
import {showNotify} from "vant";
import {API_PHOTO} from "../../../../http/photo-service-api.ts";
import seenAxios from "../../../../http/seen-axios.ts";
import type {PhotoContent} from "../../../../model/consumer/photo/file.ts";
import {photoFileCacheService} from "../../../../store/consumer/photo/photo-file-cache-service";
import {StringUtil} from "../../../../util/string-util.ts";
import {envService} from "../../../../config/sys/env";

class PhotoService {
    /**
     *  根据照片ID获取压缩照片内容
     * @param photoId 照片ID
     * @returns     照片内容
     */
    photoIdToResourcesByCompress = (photoId: number): Promise<PhotoContent> => {
        return photoFileCacheService
            .getByCompress(photoId)
            .then((res) => {
                let filename = "图片" + photoId;
                let file = new File([res], filename);
                let imageUrl = URL.createObjectURL(file);
                let photoContent: PhotoContent = {
                    file: file,
                    compressImageUrl: imageUrl,
                    imageUrl: "",
                    status: "下载成功",
                };
                return photoContent;
            })
            .catch(() => {
                return seenAxios<Blob>({
                    ...API_PHOTO.photoIdToResourcesByCompress,
                    params: {
                        photoId: photoId,
                    },
                    responseType: "blob",
                }).then((res: AxiosResponse<Blob>) => {
                    if (res.status === 204) {
                        let msg = "远端服务器图片无压缩图片";
                        console.warn(msg);
                        let photoContent: PhotoContent = {
                            file: null,
                            compressImageUrl: "",
                            imageUrl: "",
                            status: "下载失败",
                        };
                        return photoContent;
                    }
                    //缓存存入
                    photoFileCacheService.putByCompress(photoId, res.data);
                    let filename = StringUtil.contentToFilename(
                        res.headers["content-disposition"]
                    );
                    let file = new File([res.data], filename);
                    let compressImageUrl = URL.createObjectURL(file);
                    let photoContent: PhotoContent = {
                        file: file,
                        compressImageUrl: compressImageUrl,
                        imageUrl: "",
                        status: "下载成功",
                    };
                    return photoContent;
                });
            });
    };
    /**
     *  根据照片ID获取照片内容
     * @param photoId 照片ID
     * @returns     照片内容
     */
    photoIdToResources = (photoId: number): Promise<PhotoContent> => {
        return photoFileCacheService
            .getByFull(photoId)
            .then((res) => {
                let filename = "图片" + photoId;
                let file = new File([res], filename);
                let imageUrl = URL.createObjectURL(file);
                let photoContent: PhotoContent = {
                    file: file,
                    compressImageUrl: imageUrl,
                    imageUrl: imageUrl,
                    status: "下载成功",
                };
                return photoContent;
            })
            .catch(() => {
                return seenAxios<Blob>({
                    ...API_PHOTO.photoIdToResources,
                    params: {
                        photoId: photoId,
                    },
                    responseType: "blob",
                }).then((res: AxiosResponse<Blob>) => {
                    if (res.status === 204) {
                        let msg = "远端服务器图片丢失";
                        console.error(msg);
                        showNotify({message: msg, type: "danger"});
                        let photoContent: PhotoContent = {
                            file: null,
                            compressImageUrl: "",
                            imageUrl: "",
                            status: "下载失败",
                        };
                        return photoContent;
                    }
                    //缓存存入
                    photoFileCacheService.putByFull(photoId, res.data);

                    let filename = StringUtil.contentToFilename(
                        res.headers["content-disposition"]
                    );
                    let file = new File([res.data], filename);
                    let imageUrl = URL.createObjectURL(file);
                    let photoContent: PhotoContent = {
                        file: new File([res.data], filename),
                        compressImageUrl: imageUrl,
                        imageUrl: imageUrl,
                        status: "下载成功",
                    };
                    return photoContent;
                });
            });
    };
    /**
     * 根据照片ID获取照片URL
     * @param photoId
     */
    photoIdToPhotoUrl = (photoId: number): string => {
        if (!photoId) {
            return ''
        }
        return `/seen/rest-v1/file/file-content/photo-id-to-resources?photoId=${photoId}&${envService.getClientTokenName()}=${envService.getClientToken()}`;
    }
    /**
     * 根据照片ID获取照片URL,压缩
     * @param photoId
     */
    photoIdToPhotoUrlByCompress = (photoId: number): string => {
        if (!photoId) {
            return ''
        }
        return `${API_PHOTO.photoIdToResourcesByCompress.url}?photoId=${photoId}&${envService.getClientTokenName()}=${envService.getClientToken()}`;
    }
}

const photoService = new PhotoService();

export default photoService;
