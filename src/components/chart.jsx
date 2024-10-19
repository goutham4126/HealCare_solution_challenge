"use client"
import { Pie, PieChart,Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A pie chart displaying counts for Admin, Doctor, and Patient"

export function Component({ doctorCount, adminCount, patientCount }) {
  const chartData = [
    { type: "Admins", count: adminCount, fill: "hsl(var(--chart-1))" },
    { type: "Doctors", count: doctorCount, fill: "hsl(var(--chart-2))" },
    { type: "Patients", count: patientCount, fill: "hsl(var(--chart-3))" },
  ]

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    admin: {
      label: "Admins",
      color: "hsl(var(--chart-1))",
    },
    doctor: {
      label: "Doctors",
      color: "hsl(var(--chart-2))",
    },
    patient: {
      label: "Patients",
      color: "hsl(var(--chart-3))",
    },
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Counts</CardTitle>
        <CardDescription>Counts for Admin, Doctor, and Patient</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="type"
              stroke="0"
              isAnimationActive={false}  // Optional: disable animation for a more static look
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total counts for Admin, Doctor, and Patient
        </div>
      </CardFooter>
    </Card>
  )
}
