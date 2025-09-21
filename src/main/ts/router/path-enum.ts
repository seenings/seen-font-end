import {Enum} from "enum-plus";

export const PathEnum = Enum({
    Login: "consumer/LoginPage",
    BasicInfo: "consumer/BasicInfo",
    MainSwipe: "consumer/first/MainSwipe",
    TestPage: "TestPage",
    SendUserInfo: "consumer/friend/SendUserInfo",
    RecUserInfo: "consumer/friend/RecUserInfo",
    ChatList: "consumer/first/ChatList",
    SettingPage: "consumer/first/SettingPage",
    Welcome: "consumer/WelcomePage",
    ChatWindow: "consumer/chat/ChatWindow",
    WriteZone: "consumer/enter/WriteZone",
    AboutSeen: "consumer/sys/AboutSeen",
    PrivacySecurity: "consumer/sys/PrivacySecurity",
    PersonIntroduce: "consumer/introduce/PersonIntroduce",
    EditPersonIntroduce: "consumer/introduce/EditPersonIntroduce",
    EditBasicInformation: "consumer/info/EditBasicInformation",
    EditUserPhoto: "consumer/introduce/EditUserPhoto",
    EditTag: "consumer/introduce/EditTag",
})
export type PathEnumKey = typeof PathEnum.keyType;
export type PathEnumValue = typeof PathEnum.valueType;