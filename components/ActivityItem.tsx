import React from "react";
import { AuditLog } from "@prisma/client";
import { generateMessage } from "@/lib/generateMessage";
import { Avatar, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";

interface ActivityItemProps {
  data: AuditLog;
}

const ActivityItem = ({ data }: ActivityItemProps) => {
  return (
    <li className="flex items-start gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.userImage} alt={data.userName} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-nutral-700">
            {data.userName}
          </span>{" "}
          {generateMessage(data)}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};

export default ActivityItem;
