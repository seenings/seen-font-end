import type {PhotoContent} from "../../../model/consumer/photo/file";

class PhotoUtil {
    /**
     * Record 转数组 Record的key-1为数组的索引 ,key从1开始，索引从0开始
     * @param orderToPhotoIdMap 顺序对应照片ID
     * @returns 按顺序排序
     */
    static orderToPhotoIdToImageIds = (
        orderToPhotoIdMap: Record<number, number>
    ): number[] => {
        let keys: number[] = Object.keys(orderToPhotoIdMap).map((value) => Number(value));
        const max = Math.max(...keys);
        const imageIds: number[] = Array.from({length: max});
        keys.forEach((value) => {
            if (orderToPhotoIdMap[value] === undefined) {

            } else {
                imageIds[value - 1] = orderToPhotoIdMap[value];

            }
        });
        return imageIds;
    };
    /**
     * 获取照片URL
     * @param photoIdToResourcesMap     照片ID对应照片内容
     * @param orderToPhotoIdMap 顺序对应照片ID
     * @returns 照片URL
     */
    static toImageUrls = (
        photoIdToResourcesMap: Record<number, PhotoContent>,
        orderToPhotoIdMap: Record<number, number>
    ): string[] => {
        const imageIds = this.orderToPhotoIdToImageIds(orderToPhotoIdMap);
        const imageUrls: string[] = Array.from({length: imageIds.length});
        imageIds.forEach((value, index) => {
            if (photoIdToResourcesMap[value] === undefined) {
            } else {
                imageUrls[index] = photoIdToResourcesMap[value].imageUrl;
            }
        });
        return imageUrls;
    };

    /**
     * 获取照片URL
     * @param photoIdToPhotoContentMap     照片ID对应照片内容
     * @param photoIds 照片ID
     * @returns 照片URL
     */
    static toImageUrlsByPhotoId = (
        photoIdToPhotoContentMap: Record<number, PhotoContent>,
        photoIds: number[]
    ): string[] => {
        const imageIds = photoIds;
        const imageUrls: string[] = Array.from({length: imageIds.length});
        imageIds.forEach((value, index) => {
            if (photoIdToPhotoContentMap[value] === undefined) {
            } else {
                imageUrls[index] = photoIdToPhotoContentMap[value].imageUrl;
            }
        });
        return imageUrls;
    };

    static firstImageUrl = (photoContent: PhotoContent | undefined) => {
        if (photoContent) {
            return photoContent.imageUrl
                ? photoContent.imageUrl
                : photoContent.compressImageUrl;
        } else {
            return "";
        }
    };
    static fileToUrl = (file: File | null): string => {
        if (file === null) {
            return "";
        }
        return URL.createObjectURL(file);
    };
}

export default PhotoUtil;
