import {
  InteractionButtonComponent,
  InteractiveListComponent,
  LanguageCode,
  Media,
  PhoneNumberId,
  TemplateComponents,
  Location,
} from "./parameter-types";
import { HeaderOtions, ShibaApiBase, Version } from "./shiba-api-base";

export class WhatsappMessages extends ShibaApiBase {
  private phoneNumberId: PhoneNumberId;
  constructor(
    access_token: string,
    version: Version,
    phoneNumberId: PhoneNumberId,
    headerOptions?: HeaderOtions
  ) {
    super(access_token, version, headerOptions);
    this.phoneNumberId = phoneNumberId;
  }

  // whatsapp template messages
  async template(
    to: string,
    templateName: string,
    language_code: LanguageCode,
    components?: TemplateComponents
  ) {
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
  async text(to: string, bodyText: string, preview_url: boolean = true) {
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
  async image(to: string, imageOption: Media) {
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
  async video(to: string, videoOption: Media) {
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
  ) {
    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to,
      type: "interactive",
      interactive: component,
    };

    return await this.send(data);
  }

  async interactiveListReply(to: string, component: InteractiveListComponent) {
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
  async location(to: string, location: Location) {
    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to,
      type: "location",
      location: location,
    };

    return await this.send(data);
  }

  async send(data: any): Promise<Response | any> {
    try {
      const response = await this.api.post(
        `/${this.phoneNumberId}/messages`,
        data
      );

      const result: Response = response.data;

      return result;
    } catch (err: any) {
      if (!err?.response?.data) {
        return err;
      }

      return err.response.data;
    }
  }

  private componentMake(components?: TemplateComponents) {
    if (!components) {
      return null;
    }
    const _components = [];
    const { bodyParamenter, headerParameter } = components;

    if (headerParameter) {
      const header = {
        type: "header",
        parameters: [headerParameter],
      };
      _components.push(header);
    }
    if (bodyParamenter) {
      const body = {
        type: "body",
        parameters: bodyParamenter,
      };
      _components.push(body);
    }

    return _components;
  }
}
