"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Send } from "lucide-react";
import { ChatMessage } from "./chat-message";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatAreaProps {
  onOpenSidebar: () => void;
  sidebarOpen: boolean;
  isMobile: boolean;
}

// 챗봇의 질의응답 내용을 수학 문제 관련으로 변경
// initialMessages 부분만 수정하고 나머지는 그대로 유지

// 샘플 채팅 메시지
const initialMessages = [
  {
    id: 1,
    role: "user",
    content: "삼각함수의 덧셈정리를 증명하는 방법을 알려주세요.",
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    role: "assistant",
    content: `삼각함수의 덧셈정리 증명을 설명해 드리겠습니다.

먼저, sin(A+B)의 증명부터 살펴보겠습니다:

1. **단위원 접근법 사용**:
   - 단위원 위의 점 P(cos A, sin A)와 Q(cos B, sin B)를 고려합니다.
   - 각 A+B에 해당하는 점 R(cos(A+B), sin(A+B))을 찾습니다.

2. **회전 변환 적용**:
   - 점 P를 각도 B만큼 회전시키면 점 R이 됩니다.
   - 회전 변환 공식을 적용하면:
     * x' = x·cos B - y·sin B
     * y' = x·sin B + y·cos B

3. **대입 및 정리**:
   - P(cos A, sin A)를 회전 변환 공식에 대입하면:
     * cos(A+B) = cos A·cos B - sin A·sin B
     * sin(A+B) = cos A·sin B + sin A·cos B

이것이 삼각함수의 덧셈정리입니다.

cos(A+B)의 증명도 유사한 방법으로 진행됩니다.

이 덧셈정리를 이용하면 다음과 같은 다양한 공식도 유도할 수 있습니다:
- sin(A-B) = sin A·cos B - cos A·sin B
- cos(A-B) = cos A·cos B + sin A·sin B

이 공식들은 삼각함수의 다양한 계산과 증명에 매우 유용하게 활용됩니다.`,
    timestamp: new Date().toISOString(),
  },
  {
    id: 3,
    role: "user",
    content: "이차방정식의 근의 공식은 어떻게 유도하나요?",
    timestamp: new Date().toISOString(),
  },
  {
    id: 4,
    role: "assistant",
    content: `이차방정식 ax² + bx + c = 0 (a ≠ 0)의 근의 공식 유도 과정을 설명해 드리겠습니다:

1. **표준형으로 변환**:
   - 양변을 a로 나누어 x² + (b/a)x + (c/a) = 0 형태로 만듭니다.

2. **완전제곱식 만들기**:
   - x² + (b/a)x를 완전제곱식으로 만들기 위해 (b/2a)²을 더하고 빼줍니다.
   - x² + (b/a)x + (b/2a)² - (b/2a)² + (c/a) = 0
   - (x + b/2a)² = (b/2a)² - (c/a)
   - (x + b/2a)² = (b²/4a²) - (c/a)
   - (x + b/2a)² = (b² - 4ac)/4a²

3. **제곱근 취하기**:
   - x + b/2a = ±√(b² - 4ac)/2a

4. **x에 대해 정리**:
   - x = -b/2a ± √(b² - 4ac)/2a
   - x = (-b ± √(b² - 4ac))/2a

이것이 이차방정식의 근의 공식입니다. 이 공식을 사용하면 모든 이차방정식의 해를 구할 수 있습니다.

판별식 D = b² - 4ac의 값에 따라 해의 성질이 결정됩니다:
- D > 0: 서로 다른 두 실근
- D = 0: 중근(중복근)
- D < 0: 서로 다른 두 허근`,
    timestamp: new Date().toISOString(),
  },
];

export function ChatArea({
  onOpenSidebar,
  sidebarOpen,
  isMobile,
}: ChatAreaProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // 사용자 메시지 추가
    const newUserMessage = {
      id: messages.length + 1,
      role: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newUserMessage]);
    setInputValue("");

    // AI 응답 시뮬레이션 (실제 앱에서는 API를 호출할 것입니다)
    setTimeout(() => {
      const newAiMessage = {
        id: messages.length + 2,
        role: "assistant",
        content:
          "이것은 시뮬레이션된 응답입니다. 실제 애플리케이션에서는 입력에 기반하여 AI 모델에 의해 생성될 것입니다.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newAiMessage]);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* 헤더 (모바일에서만 표시) */}
      {isMobile && !sidebarOpen && (
        <div className="p-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSidebar}
            className="mr-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-semibold">채팅 세션</h2>
        </div>
      )}

      {/* 메시지 */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-6 py-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>

      {/* 입력 영역 */}
      <div className="p-4 flex justify-center relative">
        {/* 불투명 그라데이션 오버레이 */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f1f1f5] via-[#f1f1f5]/80 to-transparent pointer-events-none"></div>

        <div className="flex items-center max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-full shadow-md px-4 py-2 relative z-10">
          <Input
            placeholder="무엇이 궁금하신가요..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1 border-none focus:outline-none bg-transparent px-0"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="bg-[#18A8F1] hover:bg-[#1697d9] text-white rounded-full h-8 w-8 ml-2"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
