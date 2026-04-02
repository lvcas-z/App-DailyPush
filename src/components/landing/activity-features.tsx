"use client"

import { useState } from "react"
import { TrendingUp, Target, BarChart3, Zap } from "lucide-react"

type ActivityDay = {
    label: string
    tasks: number
    level: number
}

const activityData: ActivityDay[][] = [
    [
        { label: "Lun", tasks: 1, level: 1 },
        { label: "Mar", tasks: 3, level: 2 },
        { label: "Mie", tasks: 0, level: 0 },
        { label: "Jue", tasks: 5, level: 3 },
        { label: "Vie", tasks: 2, level: 2 },
        { label: "Sab", tasks: 6, level: 4 },
        { label: "Dom", tasks: 1, level: 1 },
    ],
    [
        { label: "Lun", tasks: 0, level: 0 },
        { label: "Mar", tasks: 2, level: 2 },
        { label: "Mie", tasks: 4, level: 3 },
        { label: "Jue", tasks: 1, level: 1 },
        { label: "Vie", tasks: 3, level: 2 },
        { label: "Sab", tasks: 5, level: 3 },
        { label: "Dom", tasks: 7, level: 4 },
    ],
    [
        { label: "Lun", tasks: 2, level: 2 },
        { label: "Mar", tasks: 1, level: 1 },
        { label: "Mie", tasks: 0, level: 0 },
        { label: "Jue", tasks: 4, level: 3 },
        { label: "Vie", tasks: 6, level: 4 },
        { label: "Sab", tasks: 3, level: 2 },
        { label: "Dom", tasks: 2, level: 2 },
    ],
    [
        { label: "Lun", tasks: 5, level: 3 },
        { label: "Mar", tasks: 3, level: 2 },
        { label: "Mie", tasks: 1, level: 1 },
        { label: "Jue", tasks: 0, level: 0 },
        { label: "Vie", tasks: 4, level: 3 },
        { label: "Sab", tasks: 6, level: 4 },
        { label: "Dom", tasks: 2, level: 2 },
    ],
    [
        { label: "Lun", tasks: 1, level: 1 },
        { label: "Mar", tasks: 2, level: 2 },
        { label: "Mie", tasks: 3, level: 2 },
        { label: "Jue", tasks: 5, level: 3 },
        { label: "Vie", tasks: 0, level: 0 },
        { label: "Sab", tasks: 4, level: 3 },
        { label: "Dom", tasks: 7, level: 4 },
    ],
    [
        { label: "Lun", tasks: 2, level: 2 },
        { label: "Mar", tasks: 0, level: 0 },
        { label: "Mie", tasks: 1, level: 1 },
        { label: "Jue", tasks: 3, level: 2 },
        { label: "Vie", tasks: 5, level: 3 },
        { label: "Sab", tasks: 6, level: 4 },
        { label: "Dom", tasks: 4, level: 3 },
    ],
]

const monthLabels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"]

function ActivityCell({
    day,
    onHover,
    onLeave,
}: {
    day: ActivityDay
    onHover: (day: ActivityDay, e: React.MouseEvent) => void
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
            className={`h-3 w-3 rounded-sm ${levelColors[day.level]} cursor-pointer transition-all hover:ring-2 hover:ring-accent/50 hover:ring-offset-1 hover:ring-offset-background`}
            onMouseEnter={(e) => onHover(day, e)}
            onMouseLeave={onLeave}
        />
    )
}

function ContributionGrid() {
    const [tooltip, setTooltip] = useState<{
        day: ActivityDay
        x: number
        y: number
    } | null>(null)

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
                        <div className="flex h-[96px] flex-col justify-between pr-2 text-xs text-muted-foreground">
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
                    {[0, 1, 2, 3, 4].map((level) => {
                        const levelColors = [
                            "bg-secondary",
                            "bg-accent/30",
                            "bg-accent/50",
                            "bg-accent/75",
                            "bg-accent",
                        ]

                        return <div key={level} className={`h-3 w-3 rounded-sm ${levelColors[level]}`} />
                    })}
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

const benefits = [
    {
        icon: TrendingUp,
        title: "Mide tu progreso",
        description:
            "Visualiza tu actividad diaria y descubre patrones en tu productividad.",
    },
    {
        icon: Target,
        title: "Construye habitos",
        description:
            "Registra actividades diarias y convierte acciones en habitos sostenibles.",
    },
    {
        icon: BarChart3,
        title: "Estadisticas personales",
        description:
            "Obtiene insights sobre tu rendimiento con graficos y metricas claras.",
    },
    {
        icon: Zap,
        title: "Mantene la consistencia",
        description:
            "El seguimiento visual te motiva a mantener el ritmo dia a dia.",
    },
]

export function ActivityFeatures() {
    return (
        <section id="features" className="bg-background py-20 md:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-accent">
                        Seguimiento de Actividad
                    </span>

                    <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                        Visualiza tu constancia
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
                        Medi lo que haces dia a dia. Tu progreso se refleja en cada cuadrado,
                        mostrando el camino hacia tus metas.
                    </p>
                </div>

                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="order-2 lg:order-1">
                        <div className="grid gap-6">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 rounded-xl border border-border/50 bg-card/50 p-4 transition-colors hover:border-accent/30"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                                        <benefit.icon className="h-5 w-5 text-accent" />
                                    </div>

                                    <div>
                                        <h3 className="mb-1 font-semibold text-foreground">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className="rounded-2xl border border-border bg-card p-6">
                            <h3 className="mb-4 text-lg font-semibold text-foreground">
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