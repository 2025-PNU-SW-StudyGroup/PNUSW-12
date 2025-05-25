"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card } from "@/components/ui/card"
import { cn } from "@/libs/utils"

// Import the card components
import { AIAssessmentCard } from "@/components/cards/ai-assessment-card"
import { AchievementCard } from "@/components/cards/achievement-card"
import { QuestionsCard } from "@/components/cards/questions-card"
import { QuestionTrendsCard } from "@/components/cards/question-trends-card"
import { ReportsCard } from "@/components/cards/reports-card"

// Componente para cada card arrastável
const SortableCard = ({ id, type }: { id: string; type: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  }

  // Renderizar o conteúdo do card com base no tipo
  const renderCardContent = () => {
    switch (type) {
      case "ai-assessment":
        return <AIAssessmentCard />
      case "achievement":
        return <AchievementCard />
      case "questions":
        return <QuestionsCard />
      case "question-trends":
        return <QuestionTrendsCard />
      case "reports":
        return <ReportsCard />
      default:
        return <div>Card não reconhecido</div>
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn("transition-all", isDragging ? "opacity-70 scale-105" : "")}
    >
      <Card className="relative group">
        <div className="absolute top-0 left-0 right-0 h-12 cursor-grab active:cursor-grabbing" {...listeners}></div>
        {renderCardContent()}
      </Card>
    </div>
  )
}

// Componente que renderiza os cards arrastáveis
export function DraggableCards({ cards }: { cards: Array<{ id: string; type: string }> }) {
  // Função para determinar a largura do card com base no tipo
  const getCardWidth = (type: string) => {
    return type === "ai-assessment" ? "col-span-12" : "col-span-12 md:col-span-6"
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {cards.map((card) => (
        <div key={card.id} className={getCardWidth(card.type)}>
          <SortableCard id={card.id} type={card.type} />
        </div>
      ))}
    </div>
  )
}
