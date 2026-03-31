"use client"

import { useState, useMemo } from "react"
import { TrendingUp, Target, BarChart3, Zap } from "lucide-react"

// Generate mock activity data for the last 52 weeks
function generateMockData() {
    const data: { date: Date; level: number; tasks: number }[] = []
    const today = new Date()
    const startDate = new Date(today)
    startDate.setDate(startDate.getDate() - 364) // ~52 weeks ago

    for (let i = 0; i < 365; i++) {
        const date = new Date(startDate)
        date.setDate(date.getDate() + i)

        // Generate random activity level (0-4)
        // Weight towards lower values to simulate realistic activity
        const rand = Math.random()
        let level: number
        if (rand < 0.3) level = 0
        else if (rand < 0.5) level = 1
        else if (rand < 0.7) level = 2
        else if (rand < 0.85) level = 3
        else level = 4

        const tasksPerLevel = [0, 1, 3, 5, 8]

        data.push({
            date,
            level,
            tasks: tasksPerLevel[level] + Math.floor(Math.random() * 2),
        })
    }

    return data
}

// Group data by weeks
function groupByWeeks(data: { date: Date; level: number; tasks: number }[]) {
    const weeks: { date: Date; level: number; tasks: number }[][] = []
    let currentWeek: { date: Date; level: number; tasks: number }[] = []

    data.forEach((day, index) => {
        currentWeek.push(day)
        if (day.date.getDay() === 6 || index === data.length - 1) {
            weeks.push(currentWeek)
            currentWeek = []
        }
    })

    return weeks
}

// Get month labels
function getMonthLabels(weeks: { date: Date; level: number; tasks: number }[][]) {
    const months: { label: string; index: number }[] = []
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    let lastMonth = -1

    weeks.forEach((week, index) => {
        const firstDay = week[0]
        if (firstDay && firstDay.date.getMonth() !== lastMonth) {
            lastMonth = firstDay.date.getMonth()
            months.push({ label: monthNames[lastMonth], index })
        }
    })

    return months
}

function ActivityCell({
    day,
    onHover,
    onLeave
}: {
    day: { date: Date; level: number; tasks: number }
    onHover: (day: { date: Date; level: number; tasks: number }, e: React.MouseEvent) => void
    onLeave: () => void
}) {
    const levelColors = [
        "bg-secondary",
        "bg-accent/30",
        "bg-accent/50",
        "bg-accent/75",
        "bg-accent",
    ]

    return (
        <div
            className={`w-2.5 h-2.5 sm:w-2.75 sm:h-2.75 rounded-sm ${levelColors[day.level]} cursor-pointer transition-all hover:ring-2 hover:ring-accent/50 hover:ring-offset-1 hover:ring-offset-background`}
            onMouseEnter={(e) => onHover(day, e)}
            onMouseLeave={onLeave}
        />
    )
}

function ContributionGrid() {
    const [tooltip, setTooltip] = useState<{
        day: { date: Date; level: number; tasks: number }
        x: number
        y: number
    } | null>(null)

    const data = useMemo(() => generateMockData(), [])
    const weeks = useMemo(() => groupByWeeks(data), [data])
    const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks])

    const handleHover = (day: { date: Date; level: number; tasks: number }, e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setTooltip({
            day,
            x: rect.left + rect.width / 2,
            y: rect.top,
        })
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    }

    const totalContributions = data.reduce((sum, day) => sum + day.tasks, 0)

    return (
        <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">{totalContributions}</span> actividades en el ultimo anio
                </p>
            </div>

            {/* Grid Container */}
            <div className="overflow-x-auto pb-2">
                <div className="inline-block min-w-max">
                    {/* Month Labels */}
                    <div className="flex mb-2 ml-8">
                        {monthLabels.map((month, i) => (
                            <div
                                key={i}
                                className="text-xs text-muted-foreground"
                                style={{
                                    position: "relative",
                                    left: `${month.index * 13}px`,
                                    marginRight: i < monthLabels.length - 1 ? "0" : "0"
                                }}
                            >
                                {month.label}
                            </div>
                        ))}
                    </div>

                    {/* Grid with Day Labels */}
                    <div className="flex">
                        {/* Day Labels */}
                        <div className="flex flex-col justify-between pr-2 text-xs text-muted-foreground h-22">
                            <span className="h-2.75 leading-2.75">Lun</span>
                            <span className="h-2.75 leading-2.75">Mie</span>
                            <span className="h-2.75 leading-2.75">Vie</span>
                        </div>

                        {/* Cells */}
                        <div className="flex gap-0.75">
                            {weeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-0.75">
                                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                                        const day = week.find((d) => d.date.getDay() === dayIndex)
                                        if (!day) {
                                            return <div key={dayIndex} className="w-2.5 h-2.5 sm:w-2.75 sm:h-2.75" />
                                        }
                                        return (
                                            <ActivityCell
                                                key={dayIndex}
                                                day={day}
                                                onHover={handleHover}
                                                onLeave={() => setTooltip(null)}
                                            />
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
                <span>Menos</span>
                <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((level) => {
                        const levelColors = [
                            "bg-secondary",
                            "bg-accent/30",
                            "bg-accent/50",
                            "bg-accent/75",
                            "bg-accent",
                        ]
                        return (
                            <div
                                key={level}
                                className={`w-2.5 h-2.5 rounded-sm ${levelColors[level]}`}
                            />
                        )
                    })}
                </div>
                <span>Mas</span>
            </div>

            {/* Tooltip */}
            {tooltip && (
                <div
                    className="fixed z-50 px-3 py-2 text-xs bg-popover border border-border rounded-lg shadow-lg pointer-events-none"
                    style={{
                        left: tooltip.x,
                        top: tooltip.y - 10,
                        transform: "translate(-50%, -100%)",
                    }}
                >
                    <p className="font-medium text-foreground">
                        {tooltip.day.tasks} {tooltip.day.tasks === 1 ? "tarea completada" : "tareas completadas"}
                    </p>
                    <p className="text-muted-foreground capitalize">{formatDate(tooltip.day.date)}</p>
                </div>
            )}
        </div>
    )
}

const benefits = [
    {
        icon: TrendingUp,
        title: "Mide tu progreso",
        description: "Visualiza tu actividad diaria y descubre patrones en tu productividad.",
    },
    {
        icon: Target,
        title: "Construye habitos",
        description: "Registra actividades diarias y convierte acciones en habitos sostenibles.",
    },
    {
        icon: BarChart3,
        title: "Estadisticas personales",
        description: "Obtiene insights sobre tu rendimiento con graficos y metricas claras.",
    },
    {
        icon: Zap,
        title: "Mantene la consistencia",
        description: "El seguimiento visual te motiva a mantener el ritmo dia a dia.",
    },
]

export function ActivityFeatures() {
    return (
        <section id="features" className="py-20 md:py-32 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wider uppercase bg-accent/10 text-accent rounded-full">
                        Seguimiento de Actividad
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                        Visualiza tu constancia
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Medi lo que haces dia a dia. Tu progreso se refleja en cada cuadrado,
                        mostrando el camino hacia tus metas.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left - Benefits */}
                    <div className="order-2 lg:order-1">
                        <div className="grid gap-6">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-accent/30 transition-colors"
                                >
                                    <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <benefit.icon className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right - Activity Grid */}
                    <div className="order-1 lg:order-2">
                        <div className="p-6 rounded-2xl bg-card border border-border">
                            <h3 className="text-lg font-semibold text-foreground mb-4">
                                Tu progreso diario
                            </h3>
                            <ContributionGrid />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
