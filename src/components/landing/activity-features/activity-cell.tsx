import type { ActivityDay } from "./activity-data"

const levelColors = [
    "bg-secondary",
    "bg-accent/30",
    "bg-accent/50",
    "bg-accent/75",
    "bg-accent",
]

type ActivityCellProps = {
    day: ActivityDay
    onHover: (day: ActivityDay, e: React.MouseEvent) => void
    onLeave: () => void
}

export function ActivityCell({day,onHover,onLeave,}: ActivityCellProps) {
    return (
        <div
            className={`h-3 w-3 rounded-sm ${levelColors[day.level]} cursor-pointer transition-all hover:ring-2 hover:ring-accent/50 hover:ring-offset-1 hover:ring-offset-background`}
            onMouseEnter={(e) => onHover(day, e)}
            onMouseLeave={onLeave}
        />
    )
}