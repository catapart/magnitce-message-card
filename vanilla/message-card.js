// message-card.css?raw
var message_card_default = '\r\n:host([type="info"])    { --primary-color:#0184db; }\r\n:host([type="success"]) { --primary-color:#20a453; }\r\n:host([type="warning"]) { --primary-color:#f0cb52; }\r\n:host([type="error"])   { --primary-color:#db283b; }\r\n:host([type="aside"])   { --primary-color:#1f3cd0; }\r\n:host([type="note"])    { --primary-color:#db8630; }\r\n:host([type="report"])  { --primary-color:#4d5168; }\r\n\r\n@media (prefers-color-scheme: dark) \r\n{\r\n    :host([type="info"])    { --primary-color:#3baee9; }\r\n    :host([type="success"]) { --primary-color:#4fc872; }\r\n    :host([type="warning"]) { --primary-color:#f0cb52; }\r\n    :host([type="error"])   { --primary-color:#e95a5c; }\r\n    :host([type="aside"])   { --primary-color:#3760ff; }\r\n    :host([type="note"])    { --primary-color:#e9ac60; }\r\n    :host([type="report"])  { --primary-color:#707177; }\r\n}\r\n\r\n:host\r\n{\r\n    --primary-color: graytext;\r\n    --font-color: fieldtext;\r\n    background-color: var(--background-color, field);\r\n    color: var(--font-color);\r\n    border: solid 1px var(--primary-color);\r\n    border-radius: 3px;\r\n    padding: .5em;\r\n    display: none;\r\n    font-family: sans-serif;\r\n    font-size: 12px;\r\n    position: relative;\r\n\r\n    grid-template-columns: auto 1fr auto;\r\n    grid-template-rows: auto 1fr;\r\n}\r\n\r\n:host([open])\r\n{\r\n    display: grid;\r\n}\r\n\r\n[part="message-icon"]\r\n,::slotted([slot="message-icon"])\r\n{\r\n    align-self: center;\r\n    grid-row: span 2;\r\n    margin-right: 1em;\r\n}\r\n\r\n[part="heading"]\r\n,::slotted([slot="heading"])\r\n{\r\n    color: var(--primary-color);\r\n    font-weight: bold;\r\n    font-size: 13px;\r\n    align-self: center;\r\n    display: inline-block;\r\n}\r\n\r\n[part="message"]\r\n{\r\n    grid-row: 2;\r\n    grid-column: 2;\r\n    margin-top: .3em;\r\n}\r\n\r\nsvg path { fill: var(--primary-color); }\r\n\r\n:host([prevent-close]) [part="close-button"]\r\n{\r\n    display: none;\r\n}\r\n[part="close-button"]\r\n{\r\n    align-self: center;\r\n    display: inline-flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    margin:1em .5em 1em 0;\r\n    background: none;\r\n    padding: 2px 5px;\r\n    margin: 0;\r\n    border: solid 1px transparent;\r\n    border-radius: 3px;\r\n}\r\n[part="close-button"]:hover\r\n{\r\n    background-color: rgb(0 0 0 / .05);\r\n    border-color: rgb(0 0 0 / .1);\r\n}\r\n@media (prefers-color-scheme: dark) \r\n{\r\n    [part="close-button"]:hover\r\n    {\r\n        background-color: rgb(0 0 0 / .4);\r\n        border-color: rgb(0 0 0 / .7);\r\n    }\r\n}\r\n[part="close-icon"]\r\n,::slotted([slot="close-icon"])\r\n{\r\n    width: var(--icon-width, var(--icon-size, 12px));\r\n    height: var(--icon-height, var(--icon-size, 12px));\r\n}\r\n\r\n[part="duration"]\r\n{\r\n    width: 100%;\r\n    position: absolute;\r\n    bottom: 0;\r\n    appearance: none;\r\n    height: 2px;\r\n    border-bottom-left-radius: 3px;\r\n    border-bottom-right-radius: 3px;\r\n    border: none;\r\n    transition: all 50ms ease;\r\n    accent-color: var(--primary-color);\r\n}\r\n\r\n[part="duration"]::-webkit-progress-value\r\n{\r\n    background-color: var(--primary-color, canvastext);\r\n    border-bottom-left-radius: 3px;\r\n    border-bottom-right-radius: 3px;\r\n}\r\n\r\n[part="duration"]::-webkit-progress-bar\r\n{\r\n    background: none;\r\n}\r\n[part="duration"]::-moz-progress-bar\r\n{\r\n    background-color: var(--primary-color, canvastext);\r\n}\r\n\r\n:host(:not([duration])) [part="duration"]\r\n{\r\n    display: none;\r\n}\r\n\r\n/* progress {\r\n}\r\nprogress::-webkit-progress-bar {\r\n}\r\nprogress::-webkit-progress-value {\r\n}\r\nprogress::-moz-progress-bar {\r\n} */';

// message-card.html?raw
var message_card_default2 = '<slot name="message-icon">\r\n    <svg part="message-icon" class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\r\n        <path d="M16.142 2l5.858 5.858v8.284l-5.858 5.858h-8.284l-5.858-5.858v-8.284l5.858-5.858h8.284zm.829-2h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-5.971 6h2v8h-2v-8zm1 12.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"></path>\r\n    </svg>\r\n</slot>\r\n<header part="header">\r\n    <slot name="heading"><span part="heading">Message</span></slot>\r\n</header>\r\n<div part="message">\r\n    <slot></slot>\r\n</div>\r\n<button part="close-button">\r\n    <slot name="close-icon">\r\n        <svg part="close-icon" class="icon" width="14" height="14" viewBox="0 0 22.812714 22.814663" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">\r\n            <path\r\n            style="color:#000000;fill:var(--primary-color,InfoText);stroke:var(--outline-color,transparent);stroke-linecap:square;stroke-miterlimit:6.3;stroke-dashoffset:29.2913;stroke-opacity:1;-inkscape-stroke:none"\r\n            d="m 1237.4389,207.63366 -1.8991,1.8987 a 0.65841136,0.65841136 90.003442 0 0 0,0.93116 l 0.4831,0.48317 a 14628.329,14628.329 44.999244 0 0 0.9312,0.93118 l 3.7936,3.79311 a 0.65840885,0.65840885 89.998393 0 1 0,0.93116 l -3.7936,3.7936 a 8783.6896,8783.6896 135.00442 0 1 -0.9313,0.93111 l -0.4829,0.48283 a 0.65811,0.65811 89.993977 0 0 10e-5,0.93094 l 1.8987,1.89741 a 0.65867085,0.65867085 179.98891 0 0 0.9314,-1.8e-4 l 0.4826,-0.48267 a 45427.77,45427.77 134.99941 0 1 0.9312,-0.93119 l 3.7931,-3.79308 a 0.65848899,0.65848899 179.99848 0 1 0.9312,-2e-5 l 3.7936,3.79312 a 10110.91,10110.91 44.992994 0 0 0.9313,0.93108 l 0.483,0.48285 a 0.65856615,0.65856615 179.99438 0 0 0.9313,-9e-5 l 1.897,-1.89705 a 0.65833101,0.65833101 89.994378 0 0 -10e-5,-0.93111 l -0.483,-0.48285 a 5293.5057,5293.5057 44.99639 0 1 -0.9313,-0.93113 l -3.793,-3.79354 a 0.65849247,0.65849247 90.001607 0 1 0,-0.93122 l 3.793,-3.79305 a 149190.44,149190.44 134.99995 0 1 0.9312,-0.93119 l 0.4832,-0.48321 a 0.65863247,0.65863247 90.008202 0 0 10e-5,-0.93132 l -1.8972,-1.89834 a 0.65838576,0.65838576 0.01346964 0 0 -0.9312,-2.2e-4 l -0.483,0.48285 a 7148.543,7148.543 135.00546 0 0 -0.9313,0.9311 l -3.7936,3.79359 a 0.65841791,0.65841791 0.00151591 0 1 -0.9312,-3e-5 l -3.7931,-3.79353 a 52707.551,52707.551 45.002134 0 0 -0.9312,-0.93122 l -0.4826,-0.48267 a 0.65849044,0.65849044 0.00323988 0 0 -0.9312,-5e-5 z"\r\n            transform="translate(-1232.6358,-204.72848)" />\r\n        </svg>\r\n    </slot>\r\n</button>\r\n<progress part="duration" min="0" max="100" step="1" value="100"></progress>';

// message-card.ts
var ProgressTimeout = class {
  duration;
  startTime = performance.now();
  elapsedTime = 0;
  onUpdate;
  onComplete;
  isPaused = false;
  #previousTimestamp = 0;
  #animationFrameHandle;
  #animationFrameHandler = this.update.bind(this);
  constructor(duration, onUpdate, onComplete) {
    this.duration = duration;
    this.onUpdate = onUpdate;
    this.onComplete = onComplete;
  }
  start() {
    this.clear();
    this.startTime = performance.now();
    this.#previousTimestamp = this.startTime;
    this.elapsedTime = 0;
    this.#animationFrameHandle = requestAnimationFrame(this.#animationFrameHandler);
  }
  pause() {
    this.isPaused = true;
    if (this.#animationFrameHandle != null) {
      cancelAnimationFrame(this.#animationFrameHandle);
    }
  }
  resume() {
    this.isPaused = false;
    this.#previousTimestamp = performance.now();
    this.#animationFrameHandle = requestAnimationFrame(this.#animationFrameHandler);
  }
  update(timestamp) {
    const delta = timestamp - this.#previousTimestamp;
    this.elapsedTime += delta;
    this.#previousTimestamp = timestamp;
    const timeLeft = this.duration - this.elapsedTime;
    if (this.onUpdate != null) {
      this.onUpdate(timestamp, timeLeft);
    }
    if (timeLeft > 0) {
      this.#animationFrameHandle = requestAnimationFrame(this.#animationFrameHandler);
    } else {
      if (this.onComplete != null) {
        this.onComplete();
      }
      this.clear();
    }
  }
  clear() {
    if (this.#animationFrameHandle != null) {
      cancelAnimationFrame(this.#animationFrameHandle);
    }
    this.isPaused = false;
  }
};
var MessageCardType = /* @__PURE__ */ ((MessageCardType2) => {
  MessageCardType2["Info"] = "info";
  MessageCardType2["Success"] = "success";
  MessageCardType2["Warn"] = "warning";
  MessageCardType2["Error"] = "error";
  MessageCardType2["Aside"] = "aside";
  MessageCardType2["Note"] = "note";
  MessageCardType2["Report"] = "report";
  return MessageCardType2;
})(MessageCardType || {});
var MessageCardEvent = /* @__PURE__ */ ((MessageCardEvent2) => {
  MessageCardEvent2["Open"] = "open";
  MessageCardEvent2["Close"] = "close";
  MessageCardEvent2["ProgressComplete"] = "progresscomplete";
  MessageCardEvent2["Remove"] = "remove";
  MessageCardEvent2["Cancel"] = "cancel";
  return MessageCardEvent2;
})(MessageCardEvent || {});
var MessageCardPart = /* @__PURE__ */ ((MessageCardPart2) => {
  MessageCardPart2["Handle"] = "handle";
  MessageCardPart2["ColorLabel"] = "color-label";
  MessageCardPart2["Color"] = "color";
  MessageCardPart2["IsFinished"] = "is-finished";
  MessageCardPart2["Description"] = "description";
  MessageCardPart2["RemoveButton"] = "close-button";
  MessageCardPart2["RemoveIcon"] = "close-icon";
  return MessageCardPart2;
})(MessageCardPart || {});
var DEFAULT_DURATION_MILLISECONDS = 5e3;
var componentTemplate = `<style>${message_card_default}</style>
${message_card_default2}`;
var COMPONENT_TAG_NAME = "message-card";
var MessageCardElement = class _MessageCardElement extends HTMLElement {
  componentParts = /* @__PURE__ */ new Map();
  getPart(key) {
    if (this.componentParts.get(key) == null) {
      const part = this.shadowRoot.querySelector(`[part="${key}"]`);
      if (part != null) {
        this.componentParts.set(key, part);
      }
    }
    return this.componentParts.get(key);
  }
  findPart(key) {
    return this.shadowRoot.querySelector(`[part="${key}"]`);
  }
  get value() {
    return this.findPart("message").textContent;
  }
  get duration() {
    const durationAttribute = this.getAttribute("duration");
    return durationAttribute != null ? parseInt(durationAttribute) : DEFAULT_DURATION_MILLISECONDS;
  }
  #timeout;
  #animationFrameHandle;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = componentTemplate;
    this.findPart("close-button").addEventListener("click", () => {
      const result = this.dispatchEvent(new CustomEvent("cancel" /* Cancel */, { cancelable: true, bubbles: true }));
      if (result == false) {
        return;
      }
      this.endTimeout();
      this.#timeout = void 0;
      this.close();
      if (this.hasAttribute("open") == false && this.hasAttribute("managed") == true) {
        const result2 = this.dispatchEvent(new CustomEvent("remove" /* Remove */, { cancelable: true, bubbles: true }));
        if (result2 == false) {
          return;
        }
        this.remove();
      }
    });
    this.addEventListener("mouseenter", () => {
      this.pauseTimeout();
    });
    this.addEventListener("mouseleave", () => {
      this.resumeTimeout();
    });
    this.addEventListener("focus", () => {
      this.pauseTimeout();
    });
    this.addEventListener("blur", () => {
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
  static notify(content, parent, cardProperties) {
    const card = _MessageCardElement.prepare(content, parent, cardProperties);
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
  static prepare(content, parent, cardProperties) {
    const properties = { duration: DEFAULT_DURATION_MILLISECONDS, heading: "Notification" };
    if (cardProperties != null) {
      Object.assign(properties, cardProperties);
    }
    if (typeof content == "string") {
      properties.value = content;
    }
    const card = content instanceof _MessageCardElement ? content : _MessageCardElement.create(properties);
    card.toggleAttribute("managed", true);
    if (content instanceof HTMLElement && card != content) {
      card.append(content);
    }
    parent.append(card);
    return card;
  }
  static create(props) {
    const element = document.createElement(COMPONENT_TAG_NAME);
    if (props == null) {
      return element;
    }
    for (const [key, value] of Object.entries(props)) {
      if (key == "value" || key == "type" || key == "duration" || key == "heading" || key == "prevent-close") {
        element.setAttribute(key, value);
      } else if (key.startsWith("on")) {
        const eventName = key.substring(2).toLowerCase();
        element.addEventListener(eventName, value);
      }
    }
    return element;
  }
  show() {
    this.toggleAttribute("open", true);
    if (this.duration > 0) {
      this.startTimeout();
    }
  }
  close() {
    if (this.hasAttribute("prevent-close")) {
      return;
    }
    this.removeAttribute("open");
    if (this.#animationFrameHandle != null) {
      cancelAnimationFrame(this.#animationFrameHandle);
    }
  }
  static observedAttributes = ["open", "value", "type", "heading", "duration"];
  attributeChangedCallback(attributeName, _oldValue, newValue) {
    if (attributeName == "open") {
      if (newValue != null) {
        this.dispatchEvent(new CustomEvent("open" /* Open */, { cancelable: true, bubbles: true }));
      } else {
        this.dispatchEvent(new CustomEvent("close" /* Close */, { cancelable: true, bubbles: true }));
      }
    } else if (attributeName == "value") {
      let toReplace = null;
      for (let i = 0; i < this.childNodes.length; i++) {
        if (this.childNodes[i].nodeType == 3) {
          toReplace = this.childNodes[i];
          break;
        }
      }
      if (toReplace != null) {
        toReplace.replaceWith(newValue);
      } else {
        this.append(newValue);
      }
    } else if (attributeName == "heading") {
      this.findPart("heading").textContent = newValue;
    } else if (attributeName == "duration") {
      if (this.hasAttribute("open")) {
        this.startTimeout();
      }
    }
  }
  startTimeout() {
    this.#timeout = new ProgressTimeout(this.duration, this.timeout_onAnimationFrame.bind(this), () => {
      this.#timeout = void 0;
      const result = this.dispatchEvent(new CustomEvent("progresscomplete" /* ProgressComplete */, { cancelable: true, bubbles: true }));
      if (this.hasAttribute("managed") && result == true) {
        this.close();
        const result2 = this.dispatchEvent(new CustomEvent("remove" /* Remove */, { cancelable: true, bubbles: true }));
        if (result2 == false) {
          return;
        }
        this.remove();
      }
    });
    this.#timeout.start();
  }
  pauseTimeout() {
    if (this.#timeout != null) {
      this.#timeout.pause();
    }
  }
  resumeTimeout() {
    if (this.#timeout != null) {
      this.#timeout.resume();
    }
  }
  endTimeout() {
    if (this.#timeout != null) {
      this.#timeout.clear();
    }
  }
  timeout_onAnimationFrame(timestamp, timeLeft) {
    let progress = 100 * timeLeft / this.#timeout.duration;
    this.getPart("duration").value = progress;
  }
  connectedCallback() {
    this.tabIndex = 0;
  }
};
if (customElements.get(COMPONENT_TAG_NAME) == null) {
  customElements.define(COMPONENT_TAG_NAME, MessageCardElement);
}
export {
  COMPONENT_TAG_NAME,
  MessageCardElement,
  MessageCardEvent,
  MessageCardPart,
  MessageCardType,
  ProgressTimeout
};
