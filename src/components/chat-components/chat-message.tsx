import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Copy, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: number;
  role: string;
  content: string;
  timestamp: string;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} max-w-3xl`}
      >
        <div className="flex-shrink-0">
          <Avatar>
            {isUser ? (
              <>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>사</AvatarFallback>
              </>
            ) : (
              <>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>AI</AvatarFallback>
              </>
            )}
          </Avatar>
        </div>

        <div className={`mx-3 ${isUser ? "text-right" : "text-left"}`}>
          <div className="flex items-center mb-1">
            {!isUser && (
              <Badge variant="outline" className="mr-2">
                로그챗 A.I+
              </Badge>
            )}
            <span className="text-sm text-gray-500">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div
            className={`p-4 rounded-lg ${
              isUser ? "bg-[#18A8F1] text-white" : "bg-white text-gray-800"
            }`}
          >
            <div className="whitespace-pre-wrap">{message.content}</div>
          </div>

          {!isUser && (
            <div className="flex mt-2 space-x-2 justify-end">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-white"
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-white"
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-white"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-white"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
