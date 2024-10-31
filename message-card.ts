import style from './message-card.css?raw';
import html from './message-card.html?raw';

export class ProgressTimeout
{
    duration: number;
    startTime: number = performance.now();
    elapsedTime: number = 0;
    
    onUpdate?: (timestamp: number, timeLeft: number) => void;
    onComplete?: () => void;

    isPaused: boolean = false;

    #previousTimestamp: number = 0;
    
    #animationFrameHandle?: ReturnType<typeof requestAnimationFrame>;

    #animationFrameHandler = this.update.bind(this);


    constructor(duration: number, onUpdate?: (timestamp: number, timeLeft: number) => void, onComplete?: () => void)
    {
        this.duration = duration;
        this.onUpdate = onUpdate;
        this.onComplete = onComplete;
    }

    start()
    {
        this.clear();
        this.startTime = performance.now();
        this.#previousTimestamp = this.startTime;
        this.elapsedTime = 0;
        this.#animationFrameHandle = requestAnimationFrame(this.#animationFrameHandler);
    }

    pause()
    {
        this.isPaused = true;
        if(this.#animationFrameHandle != null)
        {
            cancelAnimationFrame(this.#animationFrameHandle);
        }
    }
    resume()
    {
        this.isPaused = false;
        this.#previousTimestamp = performance.now();
        this.#animationFrameHandle = requestAnimationFrame(this.#animationFrameHandler);
    }

    update(timestamp: number)
    {
        const delta = timestamp - this.#previousTimestamp;
        this.elapsedTime += delta;
        this.#previousTimestamp = timestamp;

        const timeLeft = this.duration - this.elapsedTime;
        if(this.onUpdate != null) { this.onUpdate(timestamp, timeLeft); }
        if(timeLeft > 0)
        {
            this.#animationFrameHandle = requestAnimationFrame(this.#animationFrameHandler);
        }
        else
        {
            if(this.onComplete != null)
            {
                this.onComplete();
            }
            this.clear();
        }
    }

    clear()
    {
        if(this.#animationFrameHandle != null)
        {
            cancelAnimationFrame(this.#animationFrameHandle);
        }
        this.isPaused = false;
    }
}

export enum MessageCardType
{
    Info = 'info', // blue
    Success = 'success', // green
    Warn = 'warning', // yellow
    Error = 'error', // red
    Aside = 'aside', // orange
    Note = 'note', // purple
    Report = 'report', // gray
}

export enum MessageCardEvent
{
    Open = 'open',
    Close = 'close',
    ProgressComplete = 'progresscomplete',
    Remove = 'remove',
    Cancel = 'cancel',
}

export enum MessageCardPart
{
    Handle = 'handle',
    ColorLabel = 'color-label',
    Color = 'color',
    IsFinished = 'is-finished',
    Description = 'description',
    RemoveButton = 'close-button',
    RemoveIcon = 'close-icon',
}

export type MessageCardAttributes = 
{
    value?: string;
    type?: MessageCardType;
    heading?: string;
    duration?: number;
    preventClose?: boolean;
};

export type MessageCardProperties = MessageCardAttributes &
{
    onClose?: (event?: Event) => void|Promise<void>;
    onRemove?: (event?: Event) => void|Promise<void>;
    onProgressComplete?: (event?: Event) => void|Promise<void>;
};

const DEFAULT_DURATION_MILLISECONDS = 5000;

const componentTemplate = `<style>${style}</style>
${html}`;

export const COMPONENT_TAG_NAME = 'message-card';
export class MessageCardElement extends HTMLElement
{

    componentParts: Map<string, HTMLElement> = new Map();
    getPart<T extends HTMLElement = HTMLElement>(key: string)
    {
        if(this.componentParts.get(key) == null)
        {
            const part = this.shadowRoot!.querySelector(`[part="${key}"]`) as HTMLElement;
            if(part != null) { this.componentParts.set(key, part); }
        }

        return this.componentParts.get(key) as T;
    }
    findPart<T extends HTMLElement = HTMLElement>(key: string) { return this.shadowRoot!.querySelector(`[part="${key}"]`) as T; }

    get value()
    {
        return this.findPart('message').textContent;
    }

    get duration()
    {
        const durationAttribute = this.getAttribute('duration');
        return durationAttribute != null ? parseInt(durationAttribute) :  DEFAULT_DURATION_MILLISECONDS;
    }

    #timeout?: ProgressTimeout;
    #animationFrameHandle?: ReturnType<typeof requestAnimationFrame>;

    constructor()
    {
        super();
        this.attachShadow({mode: 'open'});

        this.shadowRoot!.innerHTML = componentTemplate;

        this.findPart('close-button').addEventListener('click', () =>
        {
            const result = this.dispatchEvent(new CustomEvent(MessageCardEvent.Cancel, { cancelable: true, bubbles: true }));
            if(result == false) { return; }
            this.endTimeout();
            this.#timeout = undefined;
            this.close();

            if(this.hasAttribute("open") == false && this.hasAttribute('managed') == true)
            {
                const result = this.dispatchEvent(new CustomEvent(MessageCardEvent.Remove, { cancelable: true, bubbles: true }));
                if(result == false) { return; }
                this.remove();
            }
        });

        this.addEventListener('mouseenter', () =>
        {
            this.pauseTimeout();
        });
        this.addEventListener('mouseleave', () =>
        {
            this.resumeTimeout();
        });

        this.addEventListener('focus', () =>
        {
            this.pauseTimeout();
        });
        this.addEventListener('blur', () =>
        {
            this.resumeTimeout();
        });
    }
    
    /**
     * Adds a new message-card element to the page, shows it, and then hides and removes it when its duration has elapsed.  
     Useful for injecting short-lived messages, rather than defining each message as a predetermined html element.
     * @param content If `content` is a `message-card` element, it will be used as the target card. If `content` is an `HTMLElement`, it will be injected as the message's content. If `content` is a `string`, the message slot will be filled with the string data.
     * @param parent the container element to append the `message-card` element into.
     * @param cardProperties configuration properties for the `message-card` element.
     */
    static notify(content: HTMLElement|string, parent: HTMLElement, cardProperties?: MessageCardProperties)
    {
        // const properties: MessageCardProperties = { duration: DEFAULT_DURATION_MILLISECONDS, heading: "Notification" };
        // if(cardProperties != null) { Object.assign(properties, cardProperties); }

        // if(typeof(content) == "string") { properties.value = content; }
        // const card = (content instanceof MessageCardElement) ? content : MessageCardElement.create(properties);
        // card.toggleAttribute('managed', true);
        // if(content instanceof HTMLElement && card != content)
        // {
        //     card.append(content);
        // }
        // parent.append(card);
        // card.show();
        // return card;
        const card = MessageCardElement.prepare(content, parent, cardProperties);
        card.show();
        return card;
    }
    /**
     * Adds a new message-card element to the page, and adds listeners to hide and remove it when its duration has elapsed, without showing it.  
     Useful for injecting short-lived messages, rather than defining each message as a predetermined html element.
     Differs from `notify` because when it gets shown is left to the implementer. Allows implementer to get a reference to the card to pass to a function which can call the cancel event.
     * @param content If `content` is a `message-card` element, it will be used as the target card. If `content` is an `HTMLElement`, it will be injected as the message's content. If `content` is a `string`, the message slot will be filled with the string data.
     * @param parent the container element to append the `message-card` element into.
     * @param cardProperties configuration properties for the `message-card` element.
     */
    static prepare(content: HTMLElement|string, parent: HTMLElement, cardProperties?: MessageCardProperties)
    {
        const properties: MessageCardProperties = { duration: DEFAULT_DURATION_MILLISECONDS, heading: "Notification" };
        if(cardProperties != null) { Object.assign(properties, cardProperties); }

        if(typeof(content) == "string") { properties.value = content; }
        const card = (content instanceof MessageCardElement) ? content : MessageCardElement.create(properties);
        card.toggleAttribute('managed', true);
        if(content instanceof HTMLElement && card != content)
        {
            card.append(content);
        }
        parent.append(card);
        return card;
    }

    static create(props?: MessageCardProperties)
    {
        const element = document.createElement(COMPONENT_TAG_NAME) as MessageCardElement;
        if(props == null) { return element; }        

        for(const [key, value] of Object.entries(props))
        {
            if(key == 'value' || key == "type" || key == "duration" || key == "heading" || key == "prevent-close")
            {
                element.setAttribute(key, value as string);
            }
            else if(key.startsWith('on'))
            {
                const eventName = key.substring(2).toLowerCase();
                element.addEventListener(eventName, value as (event: Event) => void|Promise<void>);
            }
        }
        return element;
    }

    show()
    {
        this.toggleAttribute('open', true);
        if(this.duration > 0)
        {
            this.startTimeout();
        }
    }
    close()
    {
        if(this.hasAttribute('prevent-close')) { return; }
        this.removeAttribute('open');
        if(this.#animationFrameHandle != null) { cancelAnimationFrame(this.#animationFrameHandle); }
    }

    static observedAttributes = [ 'open', 'value', 'type', 'heading', 'duration' ];
    attributeChangedCallback(attributeName: string, _oldValue: string, newValue: string) 
    {
        if(attributeName == "open")
        {
            if(newValue != null)
            {
                this.dispatchEvent(new CustomEvent(MessageCardEvent.Open, { cancelable: true, bubbles: true }));
            }
            else
            {
                this.dispatchEvent(new CustomEvent(MessageCardEvent.Close, { cancelable: true, bubbles: true }));
            }
        }
        else if(attributeName == "value")
        {
            // replace first instance of text content
            let toReplace = null;
            for(let i = 0; i < this.childNodes.length; i++)
            {
                if(this.childNodes[i].nodeType == 3)
                {
                    toReplace = this.childNodes[i];
                    break;
                }
            }
            if(toReplace != null)
            {
                toReplace.replaceWith(newValue);
            }
            else
            {
                this.append(newValue);
            }
        }
        else if(attributeName == "heading")
        {
            this.findPart('heading').textContent = newValue;
        }
        else if(attributeName == "duration")
        {
            if(this.hasAttribute('open'))
            {
                this.startTimeout();
            }
        }
    }

    startTimeout()
    {
        this.#timeout = new ProgressTimeout(this.duration, this.timeout_onAnimationFrame.bind(this), () =>
        { 
            this.#timeout = undefined;
            const result = this.dispatchEvent(new CustomEvent(MessageCardEvent.ProgressComplete, { cancelable: true, bubbles: true }));
            if(this.hasAttribute('managed') && result == true)
            {
                this.close();
                const result = this.dispatchEvent(new CustomEvent(MessageCardEvent.Remove, { cancelable: true, bubbles: true }));
                if(result == false) { return; }
                this.remove();
            }
        });
        this.#timeout.start();
    }
    pauseTimeout()
    {
        if(this.#timeout != null) { this.#timeout.pause(); }
    }
    resumeTimeout()
    {
        if(this.#timeout != null) { this.#timeout.resume(); }
    }
    endTimeout()
    {
        if(this.#timeout != null) { this.#timeout!.clear(); }
    }
    timeout_onAnimationFrame(timestamp: number, timeLeft: number)
    {
        let progress = ((100 * timeLeft) / this.#timeout!.duration);
        this.getPart<HTMLProgressElement>('duration').value = progress;
    }

    connectedCallback()
    {
        this.tabIndex = 0;
    }
}

if(customElements.get(COMPONENT_TAG_NAME) == null)
{
    customElements.define(COMPONENT_TAG_NAME, MessageCardElement);
}