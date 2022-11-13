import { Logger } from "../loaders/logger.js";
import { IDrmService } from "./interfaces/IDrmService.js";
import { getServiceAccountToken } from "@axinom/mosaic-id-link-be";
import moment from "moment";
import pkg from "jsonwebtoken";
import fetch from "node-fetch";
import config from "../config/config.js";

const { sign } = pkg;

export class DrmService implements IDrmService {
  private logger = Logger.getInstance();
  public static instance: DrmService = null;
  public static getInstance(): DrmService {
    if (this.instance === null) {
      this.instance = new DrmService();
    }
    return this.instance;
  }
  public async getAcessToken() {
    const authEndPoint = "https://id.service.eu.axinom.net";
    const clientId = "0c35f1ff-bc00-4299-9a9d-6f7e4901b55b";
    const clientSecret = "Rinuo7kbcgZdHKaxM4aIkDqb";
    const token = await getServiceAccountToken(authEndPoint, clientId, clientSecret);

    return token.accessToken;
  }
  public async encodeFile(inputLocation: string, outputLocation: string) {
    const body = {
      ExternalId: "job1",
      ExternalType: "video",
      ContentAcquisition: {
        Provider: "AmazonS3",
        UriPath: `${inputLocation}`,
        CredentialsName: config.awsCredentialsName,
        CredentialsSecret: config.awsCredentialsSecret,
        CredentialsProtection: "Encrypted",
      },
      MediaMappings: {
        VideoStreamExpression: "^.*\\.(mp4|avi|mov)$",
      },
      ContentProcessing: {
        OutputFormat: ["Cmaf"],
        VideoFormat: "H264",
        OptimizeFor: "Balance",
        DrmProtection: "Managed",
        DrmManaged: {
          ApiUrl: "https://key-server-management.axprod.net/api",
          TenantId: config.tenantId,
          ManagementKey: config.managementKey,
          KeySeed: config.keySeed,
          Thumbprints: "Axinom Key Server Production,Axinom Key Server Testing,AxinomKeyServerTesting",
          MultiKey: false,
          Proxy: false,
        },
      },
      ContentPublishing: {
        Provider: "AmazonS3",
        UriPath: `${outputLocation}`,
        CredentialsName: config.awsCredentialsName,
        CredentialsSecret: config.awsCredentialsSecret,
        CredentialsProtection: "Encrypted",
      },
    };
    const token = await this.getAcessToken();
    const response = await fetch("https://vip-eu-west-1.axinom.com/Job", {
      method: "post",
      body: JSON.stringify(body),
      headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: config.tenantAuthorization },
    });
    const data = await response.json();
    return data;
  }

  public async getJobStatus(jobId: string) {
    const response = await fetch(`https://vip-eu-west-1.axinom.com/reporting/${jobId}`, {
      method: "get",
      headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: config.tenantAuthorization },
    });
    const data = await response.json();
    return data;
  }

  public async generateLicenseToken(keyId: string) {
    const communicationKey = config.communicationKey;
    const communicationKeyId = config.communicationKeyId;

    let communicationKeyAsBuffer = Buffer.from(communicationKey, "base64");

    let now = moment();
    let validFrom = now.clone().subtract(1, "days");
    let validTo = now.clone().add(1, "days");

    let message = {
      type: "entitlement_message",
      version: 2,
      license: {
        start_datetime: validFrom.toISOString(),
        expiration_datetime: validTo.toISOString(),
        allow_persistence: true,
      },

      // The keys list will be filled separately by the next code block.
      content_keys_source: {
        // inline: [{ id: keyId, usage_policy: "Policy A" }],
        license_request: {
          seed_id: "aba478f5-61d3-4695-b86c-ae7f00be2b91", // (1)
          usage_policy: "Policy A", // (2)
        },
      },

      content_key_usage_policies: [
        {
          name: "Policy A",
          playready: {
            // Allow playback on non-production devices.
            min_device_security_level: 150,
            // Allow playback in virtual machines.
            play_enablers: ["786627D8-C2A6-44BE-8F88-08AE255B01A7"],
          },
        },
      ],
    };

    let envelope = {
      version: 1,
      com_key_id: communicationKeyId,
      message: message,
      begin_date: validFrom.toISOString(),
      expiration_date: validTo.toISOString(),
    };

    console.log("Creating license token with payload: " + JSON.stringify(envelope));

    // The license token must be digitally signed to prove that it came from the token service.
    let licenseToken = sign(envelope, communicationKeyAsBuffer, {
      algorithm: "HS256",
      noTimestamp: true,
    });

    console.log(licenseToken);
    return { token: licenseToken };
  }
}
