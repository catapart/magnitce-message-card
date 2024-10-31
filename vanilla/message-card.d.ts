declare class ProgressTimeout {
    #private;
    duration: number;
    startTime: number;
    elapsedTime: number;
    onUpdate?: (timestamp: number, timeLeft: number) => void;
    onComplete?: () => void;
    isPaused: boolean;
    constructor(duration: number, onUpdate?: (timestamp: number, timeLeft: number) => void, onComplete?: () => void);
    start(): void;
    pause(): void;
    resume(): void;
    update(timestamp: number): void;
    clear(): void;
}
declare enum MessageCardType {
    Info = "info",// blue
    Success = "success",// green
    Warn = "warning",// yellow
    Error = "error",// red
    Aside = "aside",// orange
    Note = "note",// purple
    Report = "report"
}
declare enum MessageCardEvent {
    Open = "open",
    Close = "close",
    ProgressComplete = "progresscomplete",
    Remove = "remove",
    Cancel = "cancel"
}
declare enum MessageCardPart {
    Handle = "handle",
    ColorLabel = "color-label",
    Color = "color",
    IsFinished = "is-finished",
    Description = "description",
    RemoveButton = "close-button",
    RemoveIcon = "close-icon"
}
type MessageCardAttributes = {
    value?: string;
    type?: MessageCardType;
    heading?: string;
    duration?: number;
    preventClose?: boolean;
};
type MessageCardProperties = MessageCardAttributes & {
    onClose?: (event?: Event) => void | Promise<void>;
    onRemove?: (event?: Event) => void | Promise<void>;
    onProgressComplete?: (event?: Event) => void | Promise<void>;
};
declare const COMPONENT_TAG_NAME = "message-card";
declare class MessageCardElement extends HTMLElement {
    #private;
    componentParts: Map<string, HTMLElement>;
    getPart<T extends HTMLElement = HTMLElement>(key: string): T;
    findPart<T extends HTMLElement = HTMLElement>(key: string): T;
    get value(): string | null;
    get duration(): number;
    constructor();
    /**
     * Adds a new message-card element to the page, shows it, and then hides and removes it when its duration has elapsed.
     Useful for injecting short-lived messages, rather than defining each message as a predetermined html element.
     * @param content If `content` is a `message-card` element, it will be used as the target card. If `content` is an `HTMLElement`, it will be injected as the message's content. If `content` is a `string`, the message slot will be filled with the string data.
     * @param parent the container element to append the `message-card` element into.
     * @param cardProperties configuration properties for the `message-card` element.
     */
    static notify(content: HTMLElement | string, parent: HTMLElement, cardProperties?: MessageCardProperties): MessageCardElement;
    /**
     * Adds a new message-card element to the page, and adds listeners to hide and remove it when its duration has elapsed, without showing it.
     Useful for injecting short-lived messages, rather than defining each message as a predetermined html element.
     Differs from `notify` because when it gets shown is left to the implementer. Allows implementer to get a reference to the card to pass to a function which can call the cancel event.
     * @param content If `content` is a `message-card` element, it will be used as the target card. If `content` is an `HTMLElement`, it will be injected as the message's content. If `content` is a `string`, the message slot will be filled with the string data.
     * @param parent the container element to append the `message-card` element into.
     * @param cardProperties configuration properties for the `message-card` element.
     */
    static prepare(content: HTMLElement | string, parent: HTMLElement, cardProperties?: MessageCardProperties): MessageCardElement;
    static create(props?: MessageCardProperties): MessageCardElement;
    show(): void;
    close(): void;
    static observedAttributes: string[];
    attributeChangedCallback(attributeName: string, _oldValue: string, newValue: string): void;
    startTimeout(): void;
    pauseTimeout(): void;
    resumeTimeout(): void;
    endTimeout(): void;
    timeout_onAnimationFrame(timestamp: number, timeLeft: number): void;
    connectedCallback(): void;
}

export { COMPONENT_TAG_NAME, type MessageCardAttributes, MessageCardElement, MessageCardEvent, MessageCardPart, type MessageCardProperties, MessageCardType, ProgressTimeout };
