"use client"

import { 
  CartesianGrid, Label, 
  Line, 
  LineChart, 
  XAxis, 
  YAxis 
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Record } from "@/lib/types"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function Linechart({
  docs
}:{
  docs: Record[]
}) {
  const percentage = docs.map(item => ({
    ...item,
    score: Math.round(item.right / item.questionsno * 100)
  })) 
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Dots</CardTitle>
        <CardDescription>your scores on all tests</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[225px] w-full">  
          <LineChart
            accessibilityLayer
            data={percentage}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              allowDataOverflow 
            >
            </YAxis>
            <XAxis
              dataKey="createdat"
              tickLine={false}
              axisLine={false}
              tickSize={15}
              tickFormatter={(value) => (
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              )}
            >
              <Label angle={0} fill="black" value="Tests - Date" fontSize={20} position="bottom" offset={-60} />              
            </XAxis>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="score"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}