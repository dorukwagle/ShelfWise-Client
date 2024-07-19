const BASE_URL = "http://localhost:8080/api";
const USER_CACHE_KEY = ["me"];
const USER_ROLES_KEY = ["roles"];

enum EUserRoles {
    Manager = "Manager",
    AssistantManager = "AssistantManager",
    Coordinator = "Coordinator",
    Member = "Member"
}

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

export {
    USER_CACHE_KEY,
    USER_ROLES_KEY,
    EUserRoles,
    BASE_URL,
    HOUR,
    DAY
}