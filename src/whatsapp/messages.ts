import { BadResponseError } from "../error/bad-response-error";
import { formatError } from "../error/format-error";
import {
  InteractionButtonComponent,
  InteractiveListComponent,
  LanguageCode,
  Media,
  PhoneNumberId,
  TemplateComponents,
  Location,
  WhatsappMessageResponse,
  ResponseSuccess,
  isResponseSuccess,
  ResponseError,
  Body,
  Section,
  TextParameter,
  Footer,
  Message_Header,
  InteractiveButton,
} from "./parameter-types";
import {
  HeaderOptions,
  ShibaApiBase,
  TokenType,
  Version,
} from "./shiba-api-base";

/**
 * A class for managing WhatsApp messages using the WhatsApp Business API.
 */
export class WhatsappMessages extends ShibaApiBase {
  /**
   * The phone number ID associated with the WhatsApp Business account.
   */
  private phoneNumberId: PhoneNumberId;

  /**
   * Constructs an instance of `WhatsappMessages`.
   *
   * @param access_token - The access token used for authentication.
   * @param version - The API version, formatted as `v<number>`.
   * @param phoneNumberId - The phone number ID for sending messages.
   * @param headerOptions - Optional custom headers for the API requests.
   * @param tokenType - The type of token for authorization. Defaults to "Bearer".
   */
  constructor(
    access_token: string,
    version: Version,
    phoneNumberId: PhoneNumberId,
    headerOptions?: HeaderOptions,
    tokenType?: TokenType
  ) {
    super(access_token, version, headerOptions, tokenType);
    this.phoneNumberId = phoneNumberId;
  }

  /**
   * Sends a WhatsApp template message.
   *
   * @param to - The recipient's phone number in international format.
   * @param templateName - The name of the template to send.
   * @param language_code - The language code of the template (e.g., "en_US").
   * @param components - Optional components like header, body, or buttons.
   * @returns A promise resolving to the WhatsApp API response.
   */
  async template(
    to: string,
    templateName: string,
    language_code: LanguageCode,
    components?: TemplateComponents
  ): Promise<WhatsappMessageResponse> {
    let _components = this.componentMake(components);

    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to,
      type: "template",
      template: {
        name: templateName,
        language: {
          code: language_code,
        },
        ...(_components ? { components: _components } : {}),
      },
    };

    return await this.send(data);
  }

  /**
   * Sends a plain text message.
   *
   * @param to - The recipient's phone number in international format.
   * @param bodyText - The text content of the message.
   * @param preview_url - Whether to include a URL preview in the message. Defaults to true.
   * @returns A promise resolving to the WhatsApp API response.
   */
  async text(
    to: string,
    bodyText: string,
    preview_url: boolean = true
  ): Promise<WhatsappMessageResponse> {
    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "text",
      text: {
        preview_url: preview_url,
        body: bodyText,
      },
    };

    return await this.send(data);
  }

  /**
   * Sends an image message.
   *
   * @param to - The recipient's phone number in international format.
   * @param imageOption - The media object containing image details (e.g., URL or ID).
   * @returns A promise resolving to the WhatsApp API response.
   */
  async image(
    to: string,
    imageOption: Media
  ): Promise<WhatsappMessageResponse> {
    const data: {
      messaging_product: "whatsapp";
      recipient_type: "individual";
      to: string;
      type: "image";
      image: Partial<Media>;
    } = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to,
      type: "image",
      image: imageOption,
    };

    delete data.image.type;

    return await this.send(data);
  }

  /**
   * Sends a video message.
   *
   * @param to - The recipient's phone number in international format.
   * @param videoOption - The media object containing video details (e.g., URL or ID).
   * @returns A promise resolving to the WhatsApp API response.
   */
  async video(
    to: string,
    videoOption: Media
  ): Promise<WhatsappMessageResponse> {
    const data: {
      messaging_product: "whatsapp";
      recipient_type: "individual";
      to: string;
      type: "video";
      video: Partial<Media>;
    } = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to,
      type: "video",
      video: videoOption,
    };

    delete data.video.type;

    return await this.send(data);
  }

  /**
   * Sends a message with interactive reply buttons.
   *
   * @param to - The recipient's phone number in international format.
   * @param component - The interactive button component details.
   * @returns A promise resolving to the WhatsApp API response.
   */
  async interactiveReplyButtons(
    to: string,
    component: InteractionButtonComponent
  ): Promise<WhatsappMessageResponse> {
    const _component: {
      type: "button";
      body: Body;
      action: {
        buttons: InteractiveButton;
      };
      header?: Message_Header;
      footer?: Footer;
    } = {
      type: "button",
      body: component.body,
      action: {
        buttons: component.buttons,
      },
    };

    if (component.header) {
      _component.header = component.header;
    }

    if (component.footer) {
      _component.footer = component.footer;
    }

    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to,
      type: "interactive",
      interactive: _component,
    };

    return await this.send(data);
  }

  /**
   * Sends an interactive list reply message.
   *
   * @param to - The recipient's phone number in international format.
   * @param component - The interactive list component details.
   * @returns A promise resolving to the WhatsApp API response.
   */
  async interactiveListReply(
    to: string,
    component: InteractiveListComponent
  ): Promise<WhatsappMessageResponse> {
    const _component: {
      type: "list";
      body: Body;
      action: {
        button: string;
        sections: Section[];
      };
      header?: TextParameter;
      footer?: Footer;
    } = {
      type: "list",
      body: component.body,
      action: {
        button: component.button,
        sections: component.section,
      },
    };

    if (component.header) {
      _component.header = component.header;
    }

    if (component.footer) {
      _component.footer = component.footer;
    }

    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to,
      type: "interactive",
      interactive: _component,
    };

    return await this.send(data);
  }

  /**
   * Sends a location message.
   *
   * @param to - The recipient's phone number in international format.
   * @param location - The location object containing latitude, longitude, and address.
   * @returns A promise resolving to the WhatsApp API response.
   */
  async location(
    to: string,
    location: Location
  ): Promise<WhatsappMessageResponse> {
    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to,
      type: "location",
      location: location,
    };

    return await this.send(data);
  }

  /**
   * Sends the given payload to the WhatsApp API.
   *
   * @param data - The request payload to send.
   * @returns A promise resolving to the WhatsApp API response.
   * @throws BadResponseError if the response does not match the expected format.
   */
  async send(data: any): Promise<WhatsappMessageResponse> {
    try {
      const response = await this.api.post(
        `/${this.phoneNumberId}/messages`,
        data
      );

      const responseData = response.data;

      const isValid = isResponseSuccess(responseData);

      if (!isValid)
        throw new BadResponseError("Invalid schema format", responseData);

      const result: ResponseSuccess = {
        status: "success",
        messaging_product: responseData.messaging_product,
        contacts: responseData.contacts,
        messages: responseData.messages,
      };

      return result;
    } catch (err: any) {
      const formattedError = formatError(err, err?.response?.data?.error);

      const error: ResponseError = {
        status: "error",
        error: formattedError,
      };

      return error;
    }
  }

  /**
   * Helper method to format template components into the expected structure.
   *
   * @param components - The template components to format.
   * @returns The formatted components array or `null` if no components provided.
   */
  private componentMake(components?: TemplateComponents) {
    if (!components) {
      return null;
    }
    const _components = [];
    const { bodyParameter, headerParameter, quickReply } = components;

    if (headerParameter) {
      const header = {
        type: "header",
        parameters: [headerParameter],
      };
      _components.push(header);
    }
    if (bodyParameter) {
      const body = {
        type: "body",
        parameters: bodyParameter,
      };
      _components.push(body);
    }

    if (quickReply && Array.isArray(quickReply)) {
      quickReply.forEach((ele) => {
        const value = {
          type: "button",
          sub_type: "quick_reply",
          index: ele.index,
          parameters: ele.parameters,
        };
        _components.push(value);
      });
    }

    return _components;
  }
}
