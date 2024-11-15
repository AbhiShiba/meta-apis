# Whatsapp Messages API

A TypeScript library for interacting with the WhatsApp Business API. It provides a simple and flexible interface to send various types of messages (text, templates, media, interactive components, etc.) using WhatsApp's Graph API.

---

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
  - [WhatsappMessages](#whatsappmessages) - [Message Types](#message-types)
  <!--- [Error Handling](#error-handling) --->
- [License](#license)

---

## Installation

```bash
npm install @shibacore/apis
```

---

## Features

- Easily send WhatsApp messages using the Graph API.
- Supports text, media (images, videos), templates, interactive components (buttons, lists), and location messages.
- Customizable headers and token types for enhanced flexibility.
- Robust error handling with well-structured responses.

---

## Getting Started

Prerequisites

1.  A valid access token for the WhatsApp Business API.
2.  Your WhatsApp Business phone number ID.
3.  A registered app on the <a href="https://developers.facebook.com/" target="_blank">Facebook Developer Dashboard</a>.

## Example Usage

```
  import { WhatsappMessages } from "@shibacore/apis";

  const accessToken = "your-access-token";
  const phoneNumberId = "your-phone-number-id";
  const apiVersion = "v20.0";

  const whatsapp =
          new WhatsappMessages(accessToken, apiVersion, phoneNumberId);

  // Send a text message
  (async () => {
  const response =
          await whatsapp.text("recipient-phone-number", "Hello, World!");
  console.log(response);
  })();
```

---

## API Reference

## WhatsappMessages

Provides methods to send different types of WhatsApp messages.
Constructor

```
  constructor(
    access_token: string,
    version: Version,
    phoneNumberId: PhoneNumberId,
    headerOptions?: HeaderOptions,
    tokenType?: TokenType
  )

```

- phoneNumberId: The ID of the WhatsApp Business phone number.

## Message Types

1. Template Messages

```
    async template(
    to: string,
    templateName: string,
    language_code: LanguageCode,
    components?: TemplateComponents
    ): Promise<WhatsappMessageResponse>;
```

- Sends a WhatsApp template message.

  Example:

  ```
      await whatsapp
           .template("recipient-phone-number", "hello_world", "en_US");
  ```

2. Text Messages

```
    async text(
    to: string,
    bodyText: string,
    preview_url?: boolean
    ): Promise<WhatsappMessageResponse>;
```

- Sends a plain text message.

  Example:

```
      await whatsapp
            .text("recipient-phone-number", "Hello, this is a message!");
```

3.  Media Messages

    - Image

```
        async image(
          to: string,
          imageOption: Media
        ): Promise<WhatsappMessageResponse>;
```

    - Video

```
        async video(
          to: string,
          videoOption: Media
        ): Promise<WhatsappMessageResponse>;
```

    Example:

```
        await whatsapp
            .image("recipient-phone-number", { id: "media-id" });
```

<!--
  4. Interactive Messages
    - Reply Buttons

      async interactiveListReply(
        to: string,
        component: InteractiveListComponent
      ): Promise<WhatsappMessageResponse>;

    - List Reply

      async interactiveListReply(
        to: string,
        component: InteractiveListComponent
      ): Promise<WhatsappMessageResponse>;

  Example:

    await whatsapp.interactiveReplyButtons("recipient-phone-number", {
      type: "button",
      buttons: [{ type: "reply", reply: { id: "1", title: "Option 1" } }]
    });
-->

4. Location Messages

```
    async location(
    to: string,
    location: Location
    ): Promise<WhatsappMessageResponse>;
```

Example:

```
      await whatsapp.location("recipient-phone-number", {
      latitude: "12.34",
      longitude: "56.78",
      name: "Location Name",
      address: "123 Address St."
      });
```

---

## License

This project is licensed under the MIT `License`. See the LICENSE file for details.

### Key Features of the Document:

1. **Installation & Prerequisites**: Details on setting up the library.
2. **Features & Examples**: Highlights key functionalities with code samples.
3. **API Reference**: Comprehensive details of constructors and methods.
<!--
4. **Error Handling**: Explanation of how errors are handled.
5. **Contributing & License**: Guidelines for contributing to the project.
   --->
   This `README.md` ensures clarity and usability for users integrating your library.
