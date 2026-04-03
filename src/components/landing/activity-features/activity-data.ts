export type ActivityDay = {
    label: string
    tasks: number
    level: number
}

export const monthLabels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"]

export const activityData: ActivityDay[][] = [
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