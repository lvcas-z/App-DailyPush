"use client"

import { useState } from "react"
import { ActivityCell } from "./activity-cell"
import { activityData, monthLabels, type ActivityDay } from "./activity-data"

export function ContributionGrid() {
    const [tooltip, setTooltip] = useState<{ day: ActivityDay, x: number, y: number } | null>(null)

    const totalContributions = activityData
        .flat()
        .reduce((sum, day) => sum + day.tasks, 0)

    const handleHover = (day: ActivityDay, e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()

        setTooltip({
            day,
            x: rect.left + rect.width / 2,
            y: rect.top,
        })
    }

    return (
        <div className="relative">
            <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{totalContributions}</span>{" "}
                    actividades de ejemplo
                </p>
            </div>

            <div className="overflow-x-auto pb-2">
                <div className="inline-block min-w-max">
                    <div className="mb-2 ml-8 flex gap-4">
                        {monthLabels.map((month) => (
                            <div key={month} className="text-xs text-muted-foreground">
                                {month}
                            </div>
                        ))}
                    </div>

                    <div className="flex">
                        <div className="flex h-24 flex-col justify-between pr-2 text-xs text-muted-foreground">
                            <span>Lun</span>
                            <span>Mie</span>
                            <span>Vie</span>
                        </div>

                        <div className="flex gap-1">
                            {activityData.map((week, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-1">
                                    {week.map((day, dayIndex) => (
                                        <ActivityCell
                                            key={`${weekIndex}-${dayIndex}`}
                                            day={day}
                                            onHover={handleHover}
                                            onLeave={() => setTooltip(null)}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted-foreground">
                <span>Menos</span>
                <div className="flex gap-1">
                    {[
                        "bg-secondary",
                        "bg-accent/30",
                        "bg-accent/50",
                        "bg-accent/75",
                        "bg-accent",
                    ].map((color) => (
                        <div key={color} className={`h-3 w-3 rounded-sm ${color}`} />
                    ))}
                </div>
                <span>Mas</span>
            </div>

            {tooltip && (
                <div
                    className="pointer-events-none fixed z-50 rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-lg"
                    style={{
                        left: tooltip.x,
                        top: tooltip.y - 10,
                        transform: "translate(-50%, -100%)",
                    }}
                >
                    <p className="font-medium text-foreground">
                        {tooltip.day.tasks}{" "}
                        {tooltip.day.tasks === 1 ? "tarea completada" : "tareas completadas"}
                    </p>
                    <p className="text-muted-foreground">{tooltip.day.label}</p>
                </div>
            )}
        </div>
    )
}