export const API_PHOTO = {
    photoIdToResourcesByCompress: {
        url: "/seen/rest-v1/file/file-content/photo-id-to-resources-by-compress",
        method: "get"
    },
    photoIdToResources: {
        url: "/seen/rest-v1/file/file-content/photo-id-to-resources",
        method: "get"
    },
    uploadPhoto: {
        url: "/seen/rest-v1/photo/photo/upload",
        method: "post",
    },
    uploadPhotos: {
        url: "/rest-v1/photo/photo/uploads",
        method: "post",
    },
    saveMainPhoto: {
        url: "/rest-v1/user/self-info/save-main-photo",
        method: "post",
    },
    originUrlToStream: {
        url: "/seen/rest-v1/qr/qr-share/origin-url-to-stream",
        method: "get",
    }
};
