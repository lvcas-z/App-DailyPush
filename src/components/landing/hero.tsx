"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const highlights = [
    "Simple y directo",
    "Sin distracciones",
    "Tu progreso, visible",
]

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 mb-8">
                        <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-sm text-muted-foreground">Tu agenda personal</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance">
                        Organiza tu dia,{" "}
                        <span className="text-accent">un paso a la vez</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
                        Una agenda personal simple para registrar tus tareas diarias y visualizar tu progreso.
                        Sin complicaciones, solo lo que necesitas.
                    </p>

                    {/* Highlights */}
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        {highlights.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="h-4 w-4 text-accent" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="w-full sm:w-auto gap-2 text-base" asChild>
                            <Link href="/register">
                                Comenzar ahora
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto text-base" asChild>
                            <Link href="/login">
                                Ya tengo cuenta
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
