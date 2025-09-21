import {  type IntroduceTypeEnumValue} from "../photo/IntroduceTypeAndPhoto.ts";

export interface IntroduceTypeAndPhoto {
    introduceTypeEnum:
        IntroduceTypeEnumValue,
    order: number,
    photoId: number
}

export interface OrderAndPhotoId {
    order: number,
    photoId: number
}