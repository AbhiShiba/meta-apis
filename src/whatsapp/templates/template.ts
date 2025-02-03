import { ApiBase } from "../shiba-api-base";
import { HeaderOptions, TokenType, Version } from "../types/common-types";
import {
  LanguageCode,
  PhoneNumberId,
  TemplateComponents,
  WhatsappMessageResponse,
} from "../types/parameter-types";

export class Template extends ApiBase {
  constructor(
    access_token: string,
    version: Version,
    phoneNumberId: PhoneNumberId,
    headerOptions?: HeaderOptions,
    tokenType?: TokenType
  ) {
    super(access_token, version, phoneNumberId, headerOptions, tokenType);
  }

  private async sendMessage(data: object): Promise<WhatsappMessageResponse> {
    return this.send(data);
  }

  /**
   * Sends a template message.
   *
   * @param to - The recipient's phone number in international format.
   * @param templateName - The name of the WhatsApp template.
   * @param language_code - The language code of the template (e.g., "en_US").
   * @param [components] - Optional template components (header, body, buttons).
   * @returns The API response.
   */
  async templateSend(
    to: string,
    templateName: string,
    language_code: LanguageCode,
    components?: TemplateComponents
  ) {
    return this.sendMessage({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: templateName,
        language: { code: language_code },
        ...this.componentMake(components),
      },
    });
  }
}
