import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Package, Recycle } from "lucide-react";

const weeklyData = [
  { day: "Mon", medical: 18, organic: 12, recyclable: 8 },
  { day: "Tue", medical: 22, organic: 15, recyclable: 10 },
  { day: "Wed", medical: 20, organic: 14, recyclable: 9 },
  { day: "Thu", medical: 25, organic: 16, recyclable: 11 },
  { day: "Fri", medical: 28, organic: 18, recyclable: 12 },
  { day: "Sat", medical: 15, organic: 10, recyclable: 7 },
  { day: "Sun", medical: 12, organic: 8, recyclable: 6 },
];

const wasteBreakdown = [
  { name: "Medical Waste", value: 60, color: "hsl(var(--destructive))" },
  { name: "Organic Waste", value: 30, color: "hsl(var(--success))" },
  { name: "Recyclables", value: 10, color: "hsl(var(--secondary))" },
];

export const WasteMetrics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Waste</p>
              <p className="text-2xl font-bold text-primary">123.4 kg</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Last 7 days</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Package className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Medical Waste</p>
              <p className="text-2xl font-bold text-destructive">74.0 kg</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">60% of total</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-success/10">
              <Recycle className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Recyclables</p>
              <p className="text-2xl font-bold text-success">12.3 kg</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">10% of total</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Weekly Waste Generation</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="day" />
            <YAxis label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="medical" fill="hsl(var(--destructive))" name="Medical Waste" />
            <Bar dataKey="organic" fill="hsl(var(--success))" name="Organic Waste" />
            <Bar dataKey="recyclable" fill="hsl(var(--secondary))" name="Recyclables" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Waste Distribution</h3>
        <div className="flex flex-col md:flex-row items-center justify-around gap-8">
          <ResponsiveContainer width="100%" height={300} className="max-w-md">
            <PieChart>
              <Pie
                data={wasteBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {wasteBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-3">
            {wasteBreakdown.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.value}% of total waste</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-muted/30">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Last Update</p>
            <p className="font-semibold">Today at 10:00 AM</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Next Collection</p>
            <p className="font-semibold text-primary">Tomorrow at 08:00 AM</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
