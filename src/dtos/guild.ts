export interface GuildDTO {
  owner: boolean;
  permissions: number;
  icon: string | null;
  id: string;
  name: string;
  features?: string[];
}
