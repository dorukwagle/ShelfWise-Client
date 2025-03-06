const BASE_URL = "http://localhost:8080/api/";
const USER_CACHE_KEY = ["me"];
const USER_ROLES_KEY = ["roles"];
const AUTHORS_CACHE_KEY = ["authors"];
const GENRES_CACHE_KEY = ["genres"];
const PUBLISHERS_CACHE_KEY = ["publishers"];
const DETAILED_USER_ROLES_KEY = ["roles_detailed"];
const NET_ERR_KEY = ["net_err"];
const BOOKS_CACHE_KEY = ["books"]; 
const ENROLL_CACHE_KEY = ["enrollments"]
const ISBNS_CACHE_KEY = ["isbns"]
const DETAILED_MEMBER_TYPE_KEY = ["memberTypes_detailed"]
const GLOBAL_ATTRIBUTES_CACHE_KEY = ["global_attributes"];
const DEFAULT_PAGE_SIZE = 15;


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
  DETAILED_USER_ROLES_KEY,
  EUserRoles,
  BASE_URL,
  HOUR,
  DAY,
  NET_ERR_KEY,
  GENRES_CACHE_KEY,
  PUBLISHERS_CACHE_KEY,
  AUTHORS_CACHE_KEY,
  BOOKS_CACHE_KEY,
  ENROLL_CACHE_KEY,
  ISBNS_CACHE_KEY,
  DETAILED_MEMBER_TYPE_KEY,
  GLOBAL_ATTRIBUTES_CACHE_KEY, DEFAULT_PAGE_SIZE
};
