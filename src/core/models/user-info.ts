export interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    role: "SYSADMIN" | "ADMIN" | "EMPLOYEE";
    profileImage: string;
    hasImage: boolean;
}