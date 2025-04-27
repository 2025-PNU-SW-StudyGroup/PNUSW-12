import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Plus, Fingerprint, ShoppingCart, Lightbulb, Target, Box, GripVertical } from "lucide-react"

// Dados dos projetos
const projects = [
  {
    id: "branding",
    name: "Branding",
    tasks: 22,
    icon: <Fingerprint className="h-5 w-5 text-white" />,
    color: "bg-indigo-500",
  },
  {
    id: "product",
    name: "Product",
    tasks: 56,
    icon: <Box className="h-5 w-5 text-white" />,
    color: "bg-indigo-500",
  },
  {
    id: "brainstorm",
    name: "Brainstorm",
    tasks: 26,
    icon: <Lightbulb className="h-5 w-5 text-white" />,
    color: "bg-indigo-500",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    tasks: 32,
    icon: <ShoppingCart className="h-5 w-5 text-white" />,
    color: "bg-slate-700",
  },
  {
    id: "marketing",
    name: "Marketing",
    tasks: 12,
    icon: <Target className="h-5 w-5 text-white" />,
    color: "bg-indigo-500",
  },
]

export function ProjectsCard() {
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-4">
        <div className="flex items-center">
          <GripVertical className="h-4 w-4 text-gray-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <CardTitle className="text-sm font-medium">Projects</CardTitle>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-3 border border-dashed rounded-md">
            <Plus className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-xs">New project</span>
          </div>

          {projects.map((project) => (
            <div key={project.id} className="flex items-start p-3 border rounded-md">
              <div className={`${project.color} p-2 rounded-md mr-3 flex-shrink-0`}>{project.icon}</div>
              <div>
                <div className="font-medium text-xs">{project.name}</div>
                <div className="text-[10px] text-gray-500">{project.tasks} tasks</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  )
}
