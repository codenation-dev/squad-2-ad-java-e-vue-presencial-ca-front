import { domain } from "./domain";

export const api_logs = `${domain}/api/v1/logs`;
export const api_logs_by_id = `${domain}/api/v1/logs/{id}`;
export const api_logs_archive = `${domain}/api/v1/logs/{id}/archive`;
export const api_logs_unarchive = `${domain}/api/v1/logs/{id}/unarchive`;
