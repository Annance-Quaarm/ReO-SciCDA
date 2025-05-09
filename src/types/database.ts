export type UserRole = 'researcher' | 'admin'
export type ProjectVisibility = 'public' | 'private' | 'unlisted'
export type ArtifactType = 'notebook' | 'dataset' | 'code' | 'protocol' | 'other'
export type InvitationStatus = 'pending' | 'accepted' | 'declined'

export interface User {
    id: string
    email: string
    did?: string
    full_name?: string
    affiliation?: string
    role?: UserRole
    created_at: string
    updated_at: string
}

export interface Project {
    id: string
    user_id: string
    title?: string
    description?: string
    visibility: ProjectVisibility
    created_at: string
    updated_at: string
}

export interface Artifact {
    id: string
    project_id: string
    type?: ArtifactType
    title?: string
    description?: string
    ipfs_hash?: string
    version: number
    current: boolean
    parent_id?: string
    file_url?: string
    created_at: string
    updated_at: string
}

export interface Metadata {
    id: string
    artifact_id: string
    format?: string
    content?: Record<string, any>
    fair_score?: number
    created_at: string
    updated_at: string
}

export interface Provenance {
    id: string
    artifact_id: string
    source?: string
    source_link?: string
    checksum?: string
    lineage?: Record<string, any>
    tool_metadata?: Record<string, any>
    created_at: string
    updated_at: string
}

export interface Integration {
    id: string
    user_id: string
    tool?: string
    action?: string
    status?: string
    log?: string
    timestamp: string
}

export interface ToolIntegration {
    id: string
    user_id: string
    tool?: string
    external_id?: string
    access_token?: string
    refresh_token?: string
    status?: string
    linked_at: string
    updated_at: string
}

export interface Comment {
    id: string
    artifact_id: string
    user_id: string
    comment?: string
    created_at: string
    updated_at: string
}

export interface Invitation {
    id: string
    project_id: string
    inviter_id: string
    email: string
    status: InvitationStatus
    created_at: string
    updated_at: string
}

// Database schema type that includes all tables
export interface Database {
    users: User
    projects: Project
    artifacts: Artifact
    metadata: Metadata
    provenance: Provenance
    integrations: Integration
    tool_integrations: ToolIntegration
    comments: Comment
    invitations: Invitation
}

// Type for inserting new records (omits auto-generated fields)
export type InsertUser = Omit<User, 'id' | 'created_at' | 'updated_at'>
export type InsertProject = Omit<Project, 'id' | 'created_at' | 'updated_at'>
export type InsertArtifact = Omit<Artifact, 'id' | 'created_at' | 'updated_at'>
export type InsertMetadata = Omit<Metadata, 'id' | 'created_at' | 'updated_at'>
export type InsertProvenance = Omit<Provenance, 'id' | 'created_at' | 'updated_at'>
export type InsertIntegration = Omit<Integration, 'id' | 'timestamp'>
export type InsertToolIntegration = Omit<ToolIntegration, 'id' | 'linked_at' | 'updated_at'>
export type InsertComment = Omit<Comment, 'id' | 'created_at' | 'updated_at'>
export type InsertInvitation = Omit<Invitation, 'id' | 'created_at' | 'updated_at'>

// Type for updating records (makes all fields optional except id)
export type UpdateUser = Partial<Omit<User, 'id'>> & { id: string }
export type UpdateProject = Partial<Omit<Project, 'id'>> & { id: string }
export type UpdateArtifact = Partial<Omit<Artifact, 'id'>> & { id: string }
export type UpdateMetadata = Partial<Omit<Metadata, 'id'>> & { id: string }
export type UpdateProvenance = Partial<Omit<Provenance, 'id'>> & { id: string }
export type UpdateToolIntegration = Partial<Omit<ToolIntegration, 'id'>> & { id: string }
export type UpdateComment = Partial<Omit<Comment, 'id'>> & { id: string }
export type UpdateInvitation = Partial<Omit<Invitation, 'id'>> & { id: string } 