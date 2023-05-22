/** Represents a discord ID */

type Snowflake = string;

export interface BotStructure {
    _id: Snowflake;
    name: string;
    avatar: string;
    botInviteURL: string;
    websiteURL: string;
    supportServer: string;
    sourceCode: string;
    description: string;
    longDescription: string;
    prefix: string[] | string;
    owners: Snowflake[] | string;
    creationTimestamp: number;
    verifiedBot: boolean;
    tags: string[];
    approved: boolean;
};

export interface SearchBotOptions {
    query: SearchBotQueryOptions;
};

export interface SearchBotQueryOptions {
    name?: string;
    limit?: number;
};