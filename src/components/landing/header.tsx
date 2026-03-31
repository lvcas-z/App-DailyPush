"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Menu, X } from "lucide-react"

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                            <Calendar className="h-5 w-5 text-accent-foreground" />
                        </div>
                        <span className="text-xl font-bold text-foreground">Daily Push</span>
                    </Link>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/login">Iniciar Sesión</Link>
                        </Button>
                        <Button size="sm" asChild>
                            <Link href="/register">Registrarse</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-foreground"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <div className="flex flex-col gap-2">
                            <Button variant="ghost" size="sm" className="justify-start" asChild>
                                <Link href="/login">Iniciar Sesión</Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link href="/register">Registrarse</Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
