import { Response } from "express";
import { Document } from "mongoose";

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
    prefix: string[];
    owners: Snowflake[];
    createdAt: string;
    verifiedBot: boolean;
    tags: string[];
    approved: boolean;
    votes: VoteStructure[];
}

/** Represents an express promised response  */

export type ExpressResponse = Promise<Response<unknown, Record<string, unknown>>>;

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
    locale?: keyof Locales;
    verified: boolean;
    email?: string;
    flags: UserFlags;
    premium_type: DiscordNitroType;
    public_flags: UserFlags;
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
    owners: Snowflake[];
}

/** API Feedback structure */

export interface FeedbackStructure {
    author: Snowflake;
    stars: number;
    postedAt: string;
    content: string;
    targetBot: Snowflake;
}

/** Represents Discord Locales */

interface Locales {
    id?: string;
    da?: string;
    de?: string;
    "en-GB"?: string;
    UK?: string;
    "en-US"?: string;
    US?: string;
    "es-ES"?: string;
    fr?: string;
    hr?: string;
    it?: string;
    lt?: string;
    hu?: string;
    nl?: string;
    no?: string;
    pl?: string;
    "pt-BR"?: string;
    ro?: string;
    fi?: string;
    "sv-SE"?: string;
    vi?: string;
    tr?: string;
    cs?: string;
    el?: string;
    bg?: string;
    ru?: string;
    uk?: string;
    hi?: string;
    th?: string;
    "zh-CN"?: string;
    ja?: string;
    "zh-TW"?: string;
    ko?: string;
}

/** Represents Discord user flags */

enum UserFlags {
    Staff = 1 << 0,
    Partner = 1 << 1,
    Hypesquad = 1 << 2,
    BugHunterLevel1 = 1 << 3,
    HypesquadOnlineHouse1 = 1 << 6,
    HypesquadOnlineHouse2 = 1 << 7,
    HypesquadOnlineHouse3 = 1 << 8,
    PremiumEarlySupporter = 1 << 9,
    TeamPseudoUser = 1 << 10,
    BugHunterLevel2 = 1 << 14,
    VerifiedBot = 1 << 16,
    VerifiedDeveloper = 1 << 17,
    CertifiedModeration = 1 << 18,
    BotHTPPInteractions = 1 << 19,
    ActiveDeveloper = 1 << 22
}

/**
 * Represents used scopes in GET-AUTH function
 */

export enum APIScopes {
    Identify = "identify",
    Guilds = "guilds"
}

export type Schema<T, I = string> = Document<unknown, Record<string, never>, T> & Omit<T & Required<{
    _id: I;
}>, never>;