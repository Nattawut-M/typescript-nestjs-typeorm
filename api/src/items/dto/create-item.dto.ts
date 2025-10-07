import { CreateListingDTO } from "./listing.dto";

export class CreateItemDto {
    name: string;
    isPublic: boolean;
    listing: CreateListingDTO
}
