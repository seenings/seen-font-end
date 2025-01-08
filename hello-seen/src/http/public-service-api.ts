export const API_PUBLIC = {
  validateToken: {
    url: "/seen/public-v1/login/token/validate-token",
    method: "get",
  },
  loginPhone: {
    url: "/seen/public-v1/login/phone",
    method: "post",
  },
  sendCode: {
    url: "/public-v1/login/send-code",
    method: "post",
  },
  logout: {
    url: "/seen/public-v1/login/logout",
    method: "post",
  },
  toProvinceAndCity: {
    url: "/public-v1/pub/province/to-province-and-city",
    method: "get",
  },
  toProvinceAndSchool: {
    url: "/public-v1/pub/school/to-province-and-school",
    method: "get",
  },
  toParentIdToParentName: {
    url: "/public-v1/pub/tag/to-parent-id-to-parent-name",
    method: "get",
  },
  toParentIdToTagId: {
    url: "/public-v1/pub/tag/to-parent-id-to-tag-id",
    method: "get",
  },
  toTagIdToTagName: {
    url: "/public-v1/pub/tag/to-tag-id-to-tag-name",
    method: "get",
  },
};
