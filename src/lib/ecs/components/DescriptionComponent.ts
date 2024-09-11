import type ComponentInterface from "./ComponentInterface";

export default class DescriptionComponent implements ComponentInterface {
    public description: string;

    public constructor(description: string) {
        this.description = description;
    }
}