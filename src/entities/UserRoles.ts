interface UserRoles {
  roleId: string;
  role: "Member" | "Coordinator" | "AssistantManager" | "Manager";
  precedence: number;
}

export default UserRoles;