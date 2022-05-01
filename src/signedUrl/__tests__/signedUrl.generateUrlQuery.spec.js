import request from "supertest";
import { s3 } from "../../config/aws";

jest.mock("consola").mock("../../apolloMiddleware/userContext");

const queryData = {
  query: `query Query($input: SignedUrlInput!) {
    generateUrl(input: $input) {
      success
      errors
      signedUrl
    }
  }  
  `,
  variables: {
    input: {
      fileType: "image/jpeg",
    },
  },
};

describe("SignedUrl resolver", () => {
  it("generateUrl should return a signedUrl", async () => {
    const spy = jest.spyOn(s3, "getSignedUrl").mockImplementation(() => "signed-url");

    const response = await request(global.app).post("/graphql").send(queryData);
    expect(spy).toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(response.body.data.generateUrl.success).toBeTruthy();
    expect(response.body.data.generateUrl.errors).toHaveLength(0);
    expect(response.body.data.generateUrl.signedUrl).toBe("signed-url");

    spy.mockRestore();
  });

  it("should throw an error", async () => {
    const spy = jest.spyOn(s3, "getSignedUrl").mockImplementation(() => {
      throw new Error("nay");
    });

    const response = await request(global.app).post("/graphql").send(queryData);
    expect(response.body.data.generateUrl.errors).toHaveLength(1);
    expect(response.body.data.generateUrl.errors[0]).toBe("nay");
    expect(response.status).toBe(200);
    spy.mockRestore();
  });
});
