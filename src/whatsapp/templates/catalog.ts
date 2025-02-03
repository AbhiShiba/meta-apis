import { LanguageCode, PhoneNumberId } from "../types/parameter-types";
import { ApiBase } from "../shiba-api-base";
import { Version } from "../types/common-types";

export class Catalog extends ApiBase {
  constructor(
    access_token: string,
    version: Version,
    phoneNumberId: PhoneNumberId
  ) {
    super(access_token, version, phoneNumberId);
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

    const response = await this.send(data);

    return response;
  }
}
