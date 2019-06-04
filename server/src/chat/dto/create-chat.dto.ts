export class CreateChatDTO {
  readonly name: string;
  readonly users: string[];
  readonly messages: string[];
  readonly moderators: string[];
  readonly isPrivate: boolean;
}
