import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Check, GripVertical, MessageSquare, ListChecks } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Dados das tarefas com avatares atualizados
const tasks = [
  {
    id: 1,
    name: "Task name 1",
    completed: false,
    assignee: {
      avatar: "/images/avatar1.png",
      initials: "JD",
      color: "bg-indigo-500",
    },
    metrics: {
      comments: 9,
      subtasks: 5,
    },
  },
  {
    id: 2,
    name: "Task name 2",
    completed: false,
    assignee: {
      avatar: "/images/avatar2.png",
      initials: "AB",
      color: "bg-pink-500",
    },
    metrics: {
      comments: 6,
      subtasks: 12,
    },
  },
  {
    id: 3,
    name: "Task name 3",
    completed: true,
    assignee: {
      avatar: "/images/avatar3.png",
      initials: "CD",
      color: "bg-amber-500",
    },
    metrics: {
      comments: 2,
      subtasks: 3,
    },
  },
  {
    id: 4,
    name: "Task name 4",
    completed: false,
    assignee: {
      avatar: "/images/avatar4.png",
      initials: "EF",
      color: "bg-orange-500",
    },
    metrics: {
      comments: 6,
      subtasks: 2,
    },
  },
  {
    id: 5,
    name: "Task name 5",
    completed: true,
    assignee: {
      avatar: "/images/avatar5.png",
      initials: "GH",
      color: "bg-yellow-500",
    },
    metrics: {
      comments: 3,
      subtasks: 6,
    },
  },
  {
    id: 6,
    name: "Task name 6",
    completed: false,
    assignee: {
      avatar: "/images/avatar6.png",
      initials: "IJ",
      color: "bg-emerald-500",
    },
    metrics: {
      comments: 4,
      subtasks: 8,
    },
  },
]

export function TasksCard() {
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-4">
        <div className="flex items-center">
          <GripVertical className="h-4 w-4 text-gray-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <CardTitle className="text-sm font-medium">My tasks</CardTitle>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-4 h-[250px] overflow-auto">
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border flex items-center justify-center mr-3",
                    task.completed ? "bg-indigo-100 border-indigo-500" : "border-gray-300",
                  )}
                >
                  {task.completed && <Check className="h-2.5 w-2.5 text-indigo-500" />}
                </div>
                <span className={cn("text-xs", task.completed && "line-through text-gray-500")}>{task.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={task.assignee.avatar} />
                  <AvatarFallback className={task.assignee.color}>{task.assignee.initials}</AvatarFallback>
                </Avatar>
                <div className="flex items-center text-[10px] text-gray-500">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  <span>{task.metrics.comments}</span>
                </div>
                <div className="flex items-center text-[10px] text-gray-500">
                  <ListChecks className="h-3 w-3 mr-1" />
                  <span>{task.metrics.subtasks}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  )
}
