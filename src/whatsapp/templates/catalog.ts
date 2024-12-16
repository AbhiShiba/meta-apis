import { LanguageCode, PhoneNumberId } from "../parameter-types";
import { ShibaApiBase, Version } from "../shiba-api-base";

export class Catalog extends ShibaApiBase {
  private phoneNumberId: PhoneNumberId;
  constructor(
    access_token: string,
    version: Version,
    phoneNumberId: PhoneNumberId
  ) {
    super(access_token, version);
    this.phoneNumberId = phoneNumberId;
  }

  async message(
    to: string,
    templateName: string,
    language_code: LanguageCode,
    components: {
      bodyParameters?: string[];
      thumbnail_product_retailer_id: string;
    }
  ) {
    const _components = [];

    if (components.bodyParameters?.length) {
      const parameters = components.bodyParameters.map((ele) => ({
        type: "text",
        text: ele,
      }));
      _components.push({
        type: "body",
        parameters,
      });
    }

    _components.push({
      type: "button",
      sub_type: "CATALOG",
      index: 0,
      parameters: [
        {
          type: "action",
          action: {
            thumbnail_product_retailer_id:
              components.thumbnail_product_retailer_id,
          },
        },
      ],
    });

    const data = this.templateStructur(
      to,
      templateName,
      language_code,
      _components
    );

    const response = await this.send(this.phoneNumberId, data);

    return response;
  }
}
