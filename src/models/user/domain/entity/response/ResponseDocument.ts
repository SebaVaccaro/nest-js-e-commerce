import { UserRes } from "../user/UserRes"

export class ResponseDocument {
    constructor(
      public readonly success: boolean,
      public readonly message: string,
      public readonly data?: UserRes
    ) {}
  }
  