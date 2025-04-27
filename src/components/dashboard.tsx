"use client";

import { useState, useEffect } from "react";
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SidebarDashboard } from "./sidebar-dashboard";
import { DraggableCards } from "./draggable-cards";

// Dados iniciais do menu
const initialMenuItems = [
  { id: "student1", label: "김민준", icon: "Users" },
  { id: "student2", label: "이서연", icon: "Users" },
  { id: "student3", label: "박지훈", icon: "Users" },
  { id: "student4", label: "최수아", icon: "Users" },
  { id: "student5", label: "정도윤", icon: "Users" },
  { id: "student6", label: "강하은", icon: "Users" },
  { id: "student7", label: "윤지민", icon: "Users" },
  { id: "student8", label: "임서준", icon: "Users" },
  { id: "student9", label: "한예은", icon: "Users" },
  { id: "student10", label: "오현우", icon: "Users" },
  { id: "settings", label: "Settings", icon: "Settings" },
];

// Dados iniciais dos cards
const initialCards = [
  { id: "ai-assessment", type: "ai-assessment" },
  { id: "achievement", type: "achievement" },
  { id: "questions", type: "questions" },
  { id: "question-trends", type: "question-trends" },
  { id: "reports", type: "reports" },
];

// Adicionar a função para obter a saudação baseada na hora
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Bom dia";
  if (hour >= 12 && hour < 18) return "Boa tarde";
  return "Boa noite";
};

export default function Dashboard() {
  // Update the activeUser state to include the selected student
  const [activeUser, setActiveUser] = useState({
    name: "김선생님",
    role: "담임교사",
    avatar: "/images/avatar2.png",
  });

  const [selectedStudent, setSelectedStudent] = useState({
    id: "student1",
    name: "김민준",
    grade: "3학년 2반",
    subject: "수학",
    avatar: "/images/avatar1.png",
  });
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [cards, setCards] = useState(initialCards);
  const [greeting, setGreeting] = useState("");

  // Atualizar a saudação quando o componente montar
  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  // Manipulador para quando termina o arrasto do menu
  const handleMenuDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setMenuItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Manipulador para quando termina o arrasto dos cards
  const handleCardsDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-['Inter',sans-serif]">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleMenuDragEnd}
      >
        <SortableContext
          items={menuItems.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <SidebarDashboard items={menuItems} activeUser={activeUser} />
        </SortableContext>
      </DndContext>

      <main className="flex-1 p-6">
        {/* Update the greeting in the main section */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-800">{`${selectedStudent.name} 학생 데이터`}</h1>
          <p className="text-sm text-gray-500">{selectedStudent.grade}</p>
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleCardsDragEnd}
        >
          <SortableContext
            items={cards.map((card) => card.id)}
            strategy={verticalListSortingStrategy}
          >
            <DraggableCards cards={cards} />
          </SortableContext>
        </DndContext>
      </main>
    </div>
  );
}
