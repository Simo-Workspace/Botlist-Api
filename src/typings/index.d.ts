/** Represents a discord ID */

type Snowflake = string;

/** API Bot structure */

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

/** Structure for search bots */

export interface SearchBotOptions {
    query: SearchBotQueryOptions;
};

/** Query options for search */

export interface SearchBotQueryOptions extends Partial<BotStructure> {
    limit?: number;
};