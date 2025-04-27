import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, GripVertical } from "lucide-react"

// Dados das equipes
const teams = [
  {
    id: "branding",
    name: "Branding & Design",
    progress: 75,
    color: "bg-indigo-400",
  },
  {
    id: "marketing",
    name: "Marketing",
    progress: 85,
    color: "bg-indigo-400",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    progress: 60,
    color: "bg-indigo-400",
  },
  {
    id: "brainstorm",
    name: "Team brainstorm",
    progress: 90,
    color: "bg-slate-800",
  },
  {
    id: "product",
    name: "Product Launch",
    progress: 95,
    color: "bg-indigo-400",
  },
]

export function TeamCard() {
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-4">
        <div className="flex items-center">
          <GripVertical className="h-4 w-4 text-gray-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <CardTitle className="text-sm font-medium">Team</CardTitle>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-4 h-[250px] overflow-auto">
        <div className="space-y-4">
          {teams.map((team) => (
            <div key={team.id} className="relative">
              <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${team.color} rounded-full flex items-center pl-4`}
                  style={{ width: `${team.progress}%` }}
                >
                  <span className="text-xs font-medium text-white truncate">{team.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  )
}
