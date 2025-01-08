import { IntroduceTypeEnum } from "../photo/IntroduceTypeAndPhoto";

export interface IntroduceTypeAndPhoto {
    introduceTypeEnum:
        IntroduceTypeEnum,
    order: number,
    photoId: number
}

export interface OrderAndPhotoId {
    order: number,
    photoId: number
}