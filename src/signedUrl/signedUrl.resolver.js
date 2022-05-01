import { s3 } from "../config/aws";
import { v4 as uuid } from "uuid";

const StoryResolver = {
  Query: {
    generateUrl: async (parent, { input }, context, info) => {
      try {
        const signedUrl = s3.getSignedUrl("putObject", {
          Key: `${uuid()}.${input.fileType.split("/")[1]}`,
          Bucket: "hft-crap-stories",
          Expires: 3600,
        });

        return {
          success: true,
          errors: [],
          signedUrl: signedUrl,
        };
      } catch (err) {
        return {
          success: false,
          errors: [err.message ? err.message : err],
          signedUrl: null,
        };
      }
    },
  },
};

export default StoryResolver;
