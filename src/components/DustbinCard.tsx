import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Mail, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DustbinCardProps {
  id: number;
  name: string;
  distance: number;
  fillPercentage: number;
  location: string;
  onScheduleEmpty: (id: number) => void;
}

export const DustbinCard = ({ 
  id, 
  name, 
  distance, 
  fillPercentage, 
  location,
  onScheduleEmpty 
}: DustbinCardProps) => {
  const isFull = fillPercentage >= 80;
  const isAlmostFull = fillPercentage >= 60 && fillPercentage < 80;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className={cn(
        "h-2",
        isFull ? "bg-destructive" : isAlmostFull ? "bg-accent" : "bg-success"
      )} />
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-primary" />
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
          <Badge 
            variant={isFull ? "destructive" : isAlmostFull ? "secondary" : "default"}
            className={cn(
              "text-xs font-semibold",
              !isFull && !isAlmostFull && "bg-success text-success-foreground"
            )}
          >
            {isFull ? "FULL" : isAlmostFull ? "ALMOST FULL" : "EMPTY"}
          </Badge>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Fill Level</span>
              <span className="font-semibold">{fillPercentage}%</span>
            </div>
            <Progress 
              value={fillPercentage} 
              className={cn(
                "h-3",
                isFull && "[&>div]:bg-destructive",
                isAlmostFull && "[&>div]:bg-accent",
                !isFull && !isAlmostFull && "[&>div]:bg-success"
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Distance</p>
              <p className="text-lg font-bold text-primary">{distance} cm</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Capacity</p>
              <p className="text-lg font-bold text-primary">100L</p>
            </div>
          </div>

          {isFull && (
            <Button 
              onClick={() => onScheduleEmpty(id)}
              className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              Schedule Emptying
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
