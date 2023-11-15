import Link, { ILink } from "../models/link";
import request from "supertest-as-promised";
import { createServer } from "../utils";
import db from "../database";
import { Express } from "express";
import sinon from "sinon";
import { createLinkWithDeps } from "../graphql/resolvers/link/createLink";

const query = `
        mutation CreateLink($url: String!) {
            createLink(url: $url) {  
                url
                shortFormUrl
            }
        }
    `;

describe("createLink", () => {
  let server: Express;
  let sandbox: sinon.SinonSandbox;

  beforeAll(async () => {
    await db.connect();
    server = createServer(false);

    await generateTestData();
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });
  afterAll(async () => {
    await purgeTestData();
    await db.close();
  });

  it("can create a link", async () => {
    const response = await makeMutation(server, {
      url: "http://www.test.com",
    });
    expect(response.status).toBe(200);
    const link = response.body?.data?.createLink;

    expect(link.url).toBe("http://www.test.com");
    expect(link.shortFormUrl).toContain("https://pbid.io/");
    expect(link.shortFormUrl.split("https://pbid.io/")[1]).toMatch(/[a-z0-9]+/);
  });

  describe("when mocking randomness", () => {
    it("can save a link as long as at least one none collision", async () => {
      const randomStringStub = sandbox
        .stub()
        .onFirstCall()
        .returns("https://pbid.io/abcdefg");
      randomStringStub.onSecondCall().returns("https://pbid.io/12345678");
      const link = await createLinkWithDeps({
        randomString: randomStringStub,
      })({
        url: "http://www.test.com",
      });
      expect(link.shortFormUrl).toBe("https://pbid.io/12345678");
    });

    it("throws an error if no available", async () => {
      try {
        await createLinkWithDeps({
          randomString: () => "https://pbid.io/abcdefg",
        })({
          url: "http://www.test.com",
        });
        expect(false).toEqual(true); // should not get here
      } catch (error) {
        expect(error.message).toBe("Error creating link");
      }
    });
  });
});

const makeMutation = async (server: Express, variables: any) => {
  return request(server)
    .post("/graphql")
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .send(
      JSON.stringify({
        query,
        variables,
      })
    );
};

const generateTestData = async () => {
  const links = [
    {
      url: "https://www.adam.com",
      shortFormUrl: "https://pbid.io/abcdefg",
    },
  ];
  await Promise.all(
    links.map(async (linkInput) => {
      const link = new Link(linkInput);
      await link.save();
    })
  );
};

const purgeTestData = async () => {
  await Link.deleteMany({});
};
