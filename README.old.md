# `<message-card>` Element
A custom `HTMLElement` that provides a layout and display functionality for a notification-like message.

Package size: ~11kb minified, ~17kb verbose.

## Quick Reference
```html
<message-card></message-card>
<message-card open type="info" value="Simple messages can be defined in an attribute" heading="Info"></message-card>
<message-card open type="note" value="Set custom colors by overriding css using part selectors or setting the --primary-color, --background-color, and --font-color properties"></message-card>
<message-card open type="aside" value="Replace icons by setting their parts">
    <img src="custom-message-icon.png" part="message-icon">
    <img src="my-custom-remove-icon.png" part="remove" />
</message-card>
<script type="module" src="/path/to/message-card[.min].js"></script>
```

## Demos
https://catapart.github.io/magnitce-message-card/demo/

## Support
- Firefox
- Chrome
- Edge
- <s>Safari</s> (Has not been tested; should be supported, based on custom element support)

## Getting Started
 1. [Install/Reference the library](#referenceinstall)

### Reference/Install
#### HTML Import (not required for vanilla js/ts; alternative to import statement)
```html
<script type="module" src="/path/to/message-card[.min].js"></script>
```
#### npm
```cmd
npm install @magnit-ce/message-card
```

### Import
#### Vanilla js/ts
```js
import "/path/to/message-card[.min].js"; // if you didn't reference from a <script>, reference with an import like this

import { MessageCardElement } from "/path/to/message-card[.min].js";
```
#### npm
```js
import "@magnit-ce/message-card"; // if you didn't reference from a <script>, reference with an import like this

import { MessageCardElement } from "@magnit-ce/message-card";
```

---
---
---

## Overview
The `<message-card>` element packages a standardized message layout with common notification functionality to provide a simple and customizable method of adding messages to the DOM.

For convenience, the element includes functionality for managing "static" elements, which are added to the page once and displayed many times, as well as "dynamic" element, which are added and removed from the DOM, more like a "notification".

## Static Elements
The `<message-card>` element can be used in a way similar to the `<dialog>` element, where it is defined in static HTML and then displayed using either its `open` attribute, or the `show()` and `close()` functions. This type of usage is useful for messages like errors and warnings, where the message will often be the same for many cases, and does not need to be dynamically generated based on context.

## Cancellation
The `<message-card>` element includes a "close" button that can be used to "dismiss" the message. When this button is selected, the `<message-card>` element will dispatch a `cancel` event, to indicate that it was a button click that is causing the effects.

For static `<message-card>` elements, the only effect is that the `open` attribute will be removed, causing its display to be set to `none` by default.

If the element was created with the `prepare()` or `notify()` functions - and is therefore being managed internallly - then the cancellation will also cause the element to be removed from the DOM.

## `duration` and Progress
The `<message-card>` element implements a timeout function that can be used to indicate that a message has been displayed for a set duration. The time, in milliseconds, for the duration of the timeout can be set by assigning a value to the `<message-card>` element `duration` attribute.

If a `<message-card>` element has a `duration` value set, that `<message-card>` element will start a timeout when the `show()` function is called. The progress of that timeout will be represented in the `<message-card>` element as the value of the `duration` part, along the bottom of the element. The amount of time left in the timeout will be represented as a percentage value from `100%`, decremented down to `0%`.

One the timeout completes, the `progresscomplete` event will be dispatched. If the element is being managed, due to having been a product of the `prepare()` or `notify()` functions, it will also dispatch `close` and `remove` events, during its deconstruction.

### Suspension
If a `<message-card>` element has a `duration` element and is progressing through a timout, it can be paused by calling the `pause()` function. Suspensions can last indefinitely.

If a `<message-card>` element is being hovered over, by a pointer, or it becomes focused, that element's timeout will be paused until the `mouseexit` event or it loses focus, respectively.

## Dynamic Elements
The `<message-card>` element can be added to the DOM dynamically using any standard method for injecting DOM elements into the document, including `document.body.append(document.createElement('message-card'))`, for example.

For conveneince, the element provides `static` functions that only require a message value and a parent element in order to display a message in the DOM.

### `prepare()`
The `prepare()` function creates a `<message-card>` element, establishes a duration, and indicates to the `progresscomplete` event handler that it should be removed. The function call returns a reference to the `<message-card>` element so that the implementer can call `show()` when it is appropriate.

### `notify()`
The `notify()` function generates a `<message-card>` element using the `prepare()` function, and the immediately calls `show()` on it. This has the effect of immediately adding the element to the DOM and displaying it, acting like a "notification" message.

### Parameters
|Parameter|Type|Description|
|-|-|-|
|[`message`|`target`]|[`message`|`<message-card>`]|The message to display in the `<message-card>` element. Alternatively, a `<message-card>` element to be managed by the event handlers (useful if using custom templates).|
|`parent`|`HTMLElement`|The parent element that this `<message-card>` will be appended to.|
|`options`|[`MessageCardProperties`](#messagecardproperties)|Set content and details on the `<message-card>`.|

### Example
*For the most dynamic examples, see the [demo](https://catapart.github.io/magnitce-message-card/demo/)*
#### Prepare
```js
const dock = document.getElementById('dock');
// prepare the message-card now...
const card = MessageCardElement.prepare('This card was added with the static "prepare" function, and will remove itself when the progress bar completes.', dock, { type: 'info' });

// ... display it when you want
card.show(); 
```
#### Notify
```js
const dock = document.getElementById('dock');
// this will immediately show the message-card. It still returns a reference, though.
const card = MessageCardElement.notify('This card was added with the static "notify" function, and will also remove itself when the progress bar completes.', dock, { type: 'info' });
```

## `MessageCardProperties`
When using the `prepare()` or `notify()` functions, options can be assigned to the `<message-card>` element by passing in a `MessageCardProperties` object instance as the options parameter. The following values can be set:
|Property Name|Type|Description|
|-|-|-|
|`value`|`string`|The message to display in the `<message-card>` element.|
|`type`|[`MessageCardType`](#types-and-customization)|The type to use as a theme for the `<message-card>` element.|
|`heading`|`string`|The heading text for the `<message-card>` element.|
|`duration`|`number`|The duration, in milliseconds, before the `<message-card>` element will dispatch the `progresscomplete` event.|
|`preventClose`|`boolean`|If this is true, the `close()` function will be prevented and all functionality for closing the `<message-card>` element will be cancelled.|
|`onClose`|`(event?: Event) => void\|Promise<void>`|A function to run every time a `close` event is dispatched.|
|`onRemove`|`(event?: Event) => void\|Promise<void>`|A function to run every time a `remove` event is dispatched.|
|`onProgressComplete`|`(event?: Event) => void\|Promise<void>`|A function to run every time a `progresscomplete` event is dispatched.|

## Types and Customization
The `type` attribute can be used to apply themes to the `<message-card>` element. Setting type to any of the type values listed below will apply that types color. For convenience, different colors have been selected for light and dark modes and will be automatically applied based on media queries. Both light and dark colors are listed here.
|Type Value|Light Color|Dark Color|Expected Usage|
|-|-|-|-|
|`info`|`#0184db`|`#3baee9`|Informational messages|
|`success`|`#20a453`|`#4fc872`|Indicate user success|
|`warning`|`#f0cb52`|`#f0cb52`|Warnings before user actions|
|`error`|`#db283b`|`#e95a5c`|Alert that an error has occurred|
|`aside`|`#1f3cd0`|`#3760ff`|Secondary messaging|
|`note`|`#db8630`|`#e9ac60`|Reminders and descriptions|
|`report`|`#4d5168`|`#707177`|Results and logging|

## Attributes
|Attribute Name|Description|
|-|-|
|`open`|When toggled on, or present, invokes the `show()` function. When toggled off, invokes the `close()` function.|
|`value`|Set the message to display in the `<message-card>` element.|
|`type`|Set a theme for the `<message-card>` element.|
|`heading`|Set the heading of the `<message-card>` element.|
|`duration`|Set the amount of time, in milliseconds, for the `<message-card>` element's timer to ellapse before the `progresscomplete` event is dispatched.|
|`prevent-close`|Override the default behavior and prevent the close functionality from occurring.|

## Properties
In script, the `<message-card>` element exposes the following properties on the `MessageCard` object:
|Property Name|Description|
|-|-|
|`value`|Set the message to display in the `<message-card>` element.|
|`duration`|Set the amount of time, in milliseconds, for the `<message-card>` element's timer to ellapse before the `progresscomplete` event is dispatched.|

## Parts
The `<message-card>` element uses the `part` attribute to expose its shadow DOM content to the light DOM both for styling and selecting in javascript.
|Name|Description|
|-|-|
|`message-icon`|The icon displayed in the `<message-card>` element, alongside the message.|
|`header`|A title area, above the message in the `<message-card>` element.|
|`heading`|The heading text displayed in the `header` part.|
|`message`|The element where the `<message-card>` element's message is rendered.|
|`close-button`|A button that cancels the `<message-card>` element.|
|`close-icon`|An icon on the `close-button` part that indicates "close".|
|`duration`|The `<progress>` element that indicates the `<message-card>` element's timeout progress.|

### `findPart()` and `getPart()`
In addition to being able to select an element from the `<message-card>` element's shadowRoot reference, this element provides a function for selecting one of its parts by using the `findPart()` function.

In this example, the same part is selected with the default shadowRoot reference, and by using the `findPart()` function:
```js
const taskCard = document.querySelector('message-card');
taskCard.findPart('close-button').addEventListener('click', (event) =>
{
    // queries the shadowRoot for an element with a part attribute of "close-button"
});
taskCard.shadowRoot.querySelector('[part="close-button"]').addEventListener('click', (event) =>
{
    // queries the shadowRoot for an element with a part attribute of "close-button"
});
```
*(note: these two calls do exactly the same thing)*

If one of this element's parts are going to be referenced frequently, the `<message-card>` element's `getPart()` function can be used instead.

With `getPart()`, the element will be cached in RAM for immediate access witout having to perform a DOM query on the shadowRoot.
```js
const taskCard = document.querySelector('message-card');
taskCard.getPart('close-button').addEventListener('click', (event) =>
{
    // gets cached element and, if null: queries the shadowRoot for an element with a part attribute of "close-button"
});
taskCard.shadowRoot.querySelector('[part="close-button"]').addEventListener('click', (event) =>
{
    // queries the shadowRoot for an element with a part attribute of "close-button"
});
```
*(note: these two calls do two different things)*

For event-based or initialization code, `findPart()` should be fine for performance. But if the `<message-card>` element is going to be updated multiple times in a row, the `getPart()` function will provide a smoother experience.

## Slots
The `<message-card>` element exposes the following `slot`s: 
|Name|Description|Default Element|
|-|-|-|
|`message-icon`|`SVGElement`|An icon to help identify the content of the message.|
|`heading`|`HTMLSpanElement`|A title for the message.|
|[Default]|Slot that holds the message. (*note: this slot has no name; all children of the `<message-card>` element that do not have a `slot` attribute will be placed in this default slot.*)|[empty]|
|`close-icon`|`SVGElement`|An icon to indicate "close".|

## Additional Functions
|Function|Description|
|-|-|
|`startTimeout()`|If the `duration` attribute is set to a value higher than zero, this function will begin progress on the `<message-card>` element's timeout.|
|`pauseTimeout()`|If a timeout is currently running, this function will pause the timeout.|
|`resumeTimeout()`|If a timeout is currently running and paused, this funtion will resume the timeout.|
|`endTimeout()`|If a timeout is currently running, this function will end and deconstruct the timeout.|

## Events
The `<message-card>` element dispatches events to indicate when an automatic DOM manipulation has occurred, as well as when a user has indicated that they want to dismiss the `<message-card>` element.

The following events are dispatched by the `<message-card>` element:
|Event Name|Description
|-|-|
|`open`|Dispatched when the `<message-card>` element's `open` attribute is toggled on.|
|`close`|Dispatched when the `<message-card>` element's `open` attribute is toggled off.|
|`cancel`|Dispatched when the `<message-card>` element's "close" button is selected.|
|`progresscomplete`|Dispatched when the `<message-card>` element's duration timeout has elapsed.|
|`remove`|Dispatched when the `<message-card>` element is removed from the DOM.|

## Styling
Each of the elements in the `<message-card>` element's shadowRoot can be selected for styling, directly, by using the `::part()` selector.

In this example, the `message` part is being selected for styling:
```css
task-card::part(message)
{
    /* styling */
}
```

For a list of all part names, see the [parts](#parts) section.

### CSS Properties
The `<message-card>` element also makes use of css properties (variables) to facilitate color customization. The following css properties can be used to style the icon elements:
|CSS Property Name|Description
|-|-|
|`--primary-color`|The color that will be used for the border, the default icon's fill, the heading text, and the "close" button's icon.|
|`--background-color`|The color of the card's background.|
|`--background-color`|The color of the message font.|

## License
This library is in the public domain. You do not need permission, nor do you need to provide attribution, in order to use, modify, reproduce, publish, or sell it or any works using it or derived from it.