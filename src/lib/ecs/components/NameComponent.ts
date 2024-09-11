import type ComponentInterface from "./ComponentInterface";

export default class NameComponent implements ComponentInterface {
    public name: string;

    public constructor(name: string) {
        this.name = name;
    }
}