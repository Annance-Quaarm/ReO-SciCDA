'use client'

import React from 'react'
import Image from 'next/image'
import { BookOpen, Github, Gitlab, Terminal, Code2, Database, FileText, Beaker } from 'lucide-react'
// import { lucideIcons } from '@/actions/tools'

interface ToolIconProps {
    type: string
    name: string
}

export const toolIconTypes: Record<string, string> = {
    ipfs: 'image',
    jupyter: 'lucide',
    github: 'lucide',
    gitlab: 'lucide',
    python: 'lucide',
    r: 'lucide',
    solana: 'image',
    dataverse: 'lucide',
    zenodo: 'lucide',
    overleaf: 'lucide',
    'protocols.io': 'lucide'
}

export const lucideIcons: Record<string, any> = {
    jupyter: BookOpen,
    github: Github,
    gitlab: Gitlab,
    python: Terminal,
    r: Code2,
    dataverse: Database,
    zenodo: Database,
    overleaf: FileText,
    'protocols.io': Beaker
}

export const ToolIcon = ({ type, name }: ToolIconProps) => {
    if (type === 'image') {
        return (
            <Image
                src={`/assets/${name}.svg`}
                alt={`${name} Logo`}
                width={24}
                height={24}
                className="h-6 w-6"
            />
        )
    }

    if (type === 'lucide') {
        const Icon = lucideIcons[name]
        if (Icon) {
            return <Icon className="h-6 w-6" />
        }
    }

    return null
}