import { benefits } from "./benefits-data"
import { ContributionGrid } from "./contribution-grid"

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