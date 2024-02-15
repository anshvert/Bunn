import { DOMElement } from "solid-js/jsx-runtime";

export type inputEvent = InputEvent & { currentTarget: HTMLInputElement, target: HTMLInputElement extends
        (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) ? HTMLInputElement : DOMElement }