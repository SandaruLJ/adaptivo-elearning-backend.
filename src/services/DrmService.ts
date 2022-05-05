import { Logger } from "../loaders/logger.js";
import { IDrmService } from "./interfaces/IDrmService.js";
import { getServiceAccountToken } from '@axinom/mosaic-id-link-be'
import moment from "moment";
import pkg from 'jsonwebtoken';
const { sign } = pkg;


export class DrmService implements IDrmService{

private logger = Logger.getInstance();
public static instance :DrmService= null;
 public static getInstance():DrmService{
     if(this.instance === null){
         this.instance = new DrmService();
     }
     return this.instance;
 }
 public async getAcessToken(){
    const authEndPoint ="https://id.service.eu.axinom.net"
    const clientId = "0c35f1ff-bc00-4299-9a9d-6f7e4901b55b"
    const clientSecret ="t_07RUAlixA.pt1cNDDOXepJ"
    const token = await getServiceAccountToken(authEndPoint,clientId,clientSecret);

    return token.accessToken;
 }
  public async encodeFile(inputLocation:string){
   const body =
   {
       "ExternalId": "job1",
       "ExternalType": "video",
       "ContentAcquisition": {
           "Provider": "AmazonS3",
           "UriPath": inputLocation,
           "CredentialsName": "AKIAWLEVMKZ5MLZKE23K",
           "CredentialsSecret": "Ma+tqKSFfsqE4rgEKW0Ai1V12FfwB/iiL5F5GIvbzZpacRNtS0vt3GBvXyU0fOw4pBSwkHNDhY+ck68ShzfG9z+xAaFmDOd5qyXTDkbyrvCoz2h9ns3dp5USTHSakdhZUy4Rj0yFQ5gAhV/4QeL3EkAFGk6Wq7q1SYJnbQDWCa2QKvkth8BGEtc5svfahbbQBYJ8nsqUJvb4LYv9elCQWdrsrBywrzZrjfp5tFUd1PUcPA77GfHeTkZjNIicLxNpkLhhFA5O8hurNJI796EfnBEI9x2+XYHM/Z1+UTthslevUDghPOUUo48Ecvsg5r4ar/6jZjtMJgjFbd1/JFnSchECZI3q3CbP1U3acQ3wdlqV1TIjlZz8fFJR5miSNXQ0Ck79IOOFobcgXhcHzdzRwJlJi5gmAwE79ZkxYQld+06+jNc4oUgCrzi59ZCbFK/bWTlroCjyHLUzc9FKIMZzLON+Gp7L85o2r1HMzcmYNtiuOilOnQ+Gy6QEIu7o+SNY",
           "CredentialsProtection": "Encrypted"
       },
       "MediaMappings": {
           "VideoStreamExpression": "^.*\\.(mp4|avi|mov)$"
       },
       "ContentProcessing": {
           "OutputFormat": ["Cmaf"],
           "VideoFormat": "H264",
           "OptimizeFor": "Balance",
           "DrmProtection": "Managed",
           "DrmManaged": {
               "ApiUrl": "https://key-server-management.axprod.net/api",
               "TenantId": "aeffe382-c139-4319-8056-acc511f9d369",
               "ManagementKey": "6dd5dd1f-8e80-40eb-9765-0c4b0c18494f",
               "KeySeed": "aba478f5-61d3-4695-b86c-ae7f00be2b91",
               "Thumbprints": "Axinom Key Server Production,Axinom Key Server Testing,AxinomKeyServerTesting",
               "MultiKey": false,
               "Proxy": false
               
           }
           
       },
       "ContentPublishing": {
           "Provider": "AmazonS3",
           "UriPath": "https://spark-courses.s3.ap-south-1.amazonaws.com/62272fbfc8ea4d8b75b76aa2/resources/output",
           "CredentialsName": "AKIAWLEVMKZ5MLZKE23K",
           "CredentialsSecret": "Ma+tqKSFfsqE4rgEKW0Ai1V12FfwB/iiL5F5GIvbzZpacRNtS0vt3GBvXyU0fOw4pBSwkHNDhY+ck68ShzfG9z+xAaFmDOd5qyXTDkbyrvCoz2h9ns3dp5USTHSakdhZUy4Rj0yFQ5gAhV/4QeL3EkAFGk6Wq7q1SYJnbQDWCa2QKvkth8BGEtc5svfahbbQBYJ8nsqUJvb4LYv9elCQWdrsrBywrzZrjfp5tFUd1PUcPA77GfHeTkZjNIicLxNpkLhhFA5O8hurNJI796EfnBEI9x2+XYHM/Z1+UTthslevUDghPOUUo48Ecvsg5r4ar/6jZjtMJgjFbd1/JFnSchECZI3q3CbP1U3acQ3wdlqV1TIjlZz8fFJR5miSNXQ0Ck79IOOFobcgXhcHzdzRwJlJi5gmAwE79ZkxYQld+06+jNc4oUgCrzi59ZCbFK/bWTlroCjyHLUzc9FKIMZzLON+Gp7L85o2r1HMzcmYNtiuOilOnQ+Gy6QEIu7o+SNY",
           "CredentialsProtection": "Encrypted"
       }
       
   }
   const token = await this.getAcessToken();

   const response = await fetch("https://vip-eu-west-1.axinom.com/Job",{
     method:'post',
     body: JSON.stringify(body),
     headers:{'Accept': 'application/json','Content-Type': 'application/json','Authorization': `Bearer ${token}`}

   })

   const data = await response.json();
   console.log(data);
   

  }

  public async generateLicenseToken(keyId:string){

      const communicationKey = "vUv1fYKVeX7Ek6d8gx1hN/tzPeUhwrUH2hFPgaxLL6Q="
      const communicationKeyId= "e8313580-8791-4f73-9b4f-ae7f00be2b91"
    
    let communicationKeyAsBuffer = Buffer.from(communicationKey, "base64");

    let now = moment();
    let validFrom = now.clone().subtract(1, "days");
    let validTo = now.clone().add(1, "days");

    let message = {
        "type": "entitlement_message",
        "version": 2,
        "license": {
            "start_datetime": validFrom.toISOString(),
            "expiration_datetime": validTo.toISOString(),
            "allow_persistence": true
        },

        // The keys list will be filled separately by the next code block.
        "content_keys_source": {
            "inline": [

                {"id":keyId,
                 "usage_policy": "Policy A"}
            ]
        },
        
        // License configuration should be as permissive as possible for the scope of this guide.
        // For this reason, some PlayReady-specific restrictions are relaxed below.
        // There is no need to relax the default Widevine or FairPlay specific restrictions.
        "content_key_usage_policies": [
            {
                "name": "Policy A",
                "playready": {
                    // Allow playback on non-production devices.
                    "min_device_security_level": 150,
                    // Allow playback in virtual machines.
                    "play_enablers": [
                        "786627D8-C2A6-44BE-8F88-08AE255B01A7"
                    ]
                }
            }
        ]
    };
    // video.keys.forEach(function (key) {
    //     // A key ID is always required. In this demo, we'll also reference the previously defined
    //     // key usage policy.
    //     let inlineKey = {
    //         "id": key.keyId,
    //         "usage_policy": "Policy A"		
    //     } 

    //     message.content_keys_source.inline.push(inlineKey);
    // });

    // For detailed information about these fields, refer to Axinom DRM documentation.
    let envelope = {
        "version": 1,
        "com_key_id":communicationKeyId,
        "message": message,
        "begin_date": validFrom.toISOString(),
        "expiration_date": validTo.toISOString()
    };

    console.log("Creating license token with payload: " + JSON.stringify(envelope));

    // The license token must be digitally signed to prove that it came from the token service.
    let licenseToken = sign(envelope, communicationKeyAsBuffer, {
        "algorithm": "HS256",
        "noTimestamp": true
    });

    console.log(licenseToken);
    return {token:licenseToken};

  }

  
  
}