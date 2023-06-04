/** Represents a discord ID */

type Snowflake = string;

/** API Bot structure */

export interface BotStructure {
    _id: Snowflake;
    name: string;
    avatar: string;
    inviteURL: string;
    websiteURL: string;
    supportServer: string;
    sourceCode: string;
    shortDescription: string;
    longDescription: string;
    prefix: string[] | string;
    owners: Snowflake[] | string;
    createdAt: string;
    verifiedBot: boolean;
    tags: string[];
    approved: boolean;
    votes: VoteStructure[];
}

/** Structure for search bots */

export interface SearchBotOptions {
    query: SearchBotQueryOptions;
}

/** Query options for search */

interface SearchBotQueryOptions extends Partial<BotStructure> {
    limit?: number;
}

/** Represents an express promised response  */

export type ExpressResponsePromise = Promise<Response<unknown, Record<string, unknown>>>;

declare module "express-session" {
    interface SessionData {
        user_info: unknown;
    }
}

/** Structure used in users by the API */

export interface UserStructure {
    _id: Snowflake;
    username: string;
    avatar: string;
}

/** Discord user structure */

export interface DiscordUserStructure extends Omit<UserStructure, "_id"> {
    id: Snowflake;
}

/** Bot votes structure */

export interface VoteStructure {
    votes: number;
    user: Snowflake;
    lastVote: string;
}

/** Raw Discord API User */

export interface RawDiscordUser extends DiscordUserStructure {
    discriminator: string;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    banner: string | null;
    accent_color?: string;
    locale?: string;
    verified?: boolean;
    email?: string;
    flags: number;
    premium_type: DiscordNitroType;
    public_flags: number;
    global_name: string | null;
    display_name: string | null;
    banner_color: string | null;
}

/** Types of Discord Nitro */

enum DiscordNitroType {
    None,
    NitroClassic,
    Nitro,
    NitroBasic
}

/** API Guild structure */

export interface GuildStructure {
    _id: Snowflake;
    verificationChannel: Snowflake;
    logsChannel: Snowflake;
    addbotChannel: Snowflake | undefined;
}