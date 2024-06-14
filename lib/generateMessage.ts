import { ACTION, AuditLog } from "@prisma/client";

export const generateMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log;
  switch (action) {
    case ACTION.CREATE:
      return `Created ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.UPDATE:
      return `Updated ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.DELETE:
      return `Deleted ${entityType.toLowerCase()} "${entityTitle}"`;
    default:
      return `Unknown Action ${entityType.toLowerCase()} "${entityTitle}"`;
  }
};
