import HomeScreen from "$lib/ui/gameLayout/screens/HomeScreen.svelte";
import type { SvelteComponent } from "svelte";
import { writable, type Writable } from "svelte/store";

export const sceneStore: Writable<SvelteComponent> = writable<SvelteComponent>(HomeScreen);