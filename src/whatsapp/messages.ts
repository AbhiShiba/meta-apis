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
} from "./parameter-types";
import {
  HeaderOptions,
  ShibaApiBase,
  TokenType,
  Version,
} from "./shiba-api-base";

export class WhatsappMessages extends ShibaApiBase {
  private phoneNumberId: PhoneNumberId;
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

  // whatsapp template messages
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

  // whatsapp response text
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

  // whatsapp response image
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

  // whatsapp response video
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

  // whatsapp interactive reply button response
  async interactiveReplyButtons(
    to: string,
    component: InteractionButtonComponent
  ): Promise<WhatsappMessageResponse> {
    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to,
      type: "interactive",
      interactive: component,
    };

    return await this.send(data);
  }

  async interactiveListReply(
    to: string,
    component: InteractiveListComponent
  ): Promise<WhatsappMessageResponse> {
    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to,
      type: "interactive",
      interactive: component,
    };

    return await this.send(data);
  }

  /* whatsapp location response */
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
        _components.push(value)
      });
    }

    return _components;
  }
}
