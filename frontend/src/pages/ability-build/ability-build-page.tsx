import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { Alert, AlertAction, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function AbilityBuildPage() {
  const [showNotice, setShowNotice] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      {showNotice && (
        <Alert variant="warning">
          <AlertTriangle />
          <AlertDescription>이 페이지는 현재 개발중입니다.</AlertDescription>
          <AlertAction>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="닫기"
              className="size-6 text-current hover:bg-transparent hover:opacity-70"
              onClick={() => setShowNotice(false)}
            >
              <X className="size-4" />
            </Button>
          </AlertAction>
        </Alert>
      )}
    </div>
  );
}
