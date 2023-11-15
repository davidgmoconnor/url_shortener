import Link, { ILink } from "../models/link";
import request from "supertest-as-promised";
import { createServer } from "../utils";
import { Slice } from "../graphql/types";
import db from "../database";
import { Express } from "express";

const query = `
        query GetLinks($start: Float!, $end: Float!, $filter: String) {
            getLinks(start: $start, end: $end, filter: $filter) {
              items {
                url
                shortFormUrl
              }
              total
            }
        }
    `;

describe("getLinks", () => {
  let server: Express;

  beforeAll(async () => {
    await db.connect();
    server = createServer(false);

    await generateTestData();
  });
  afterAll(async () => {
    await purgeTestData();
    await db.close();
  });

  it("returns a slice", async () => {
    const slice = await makeQuery(server, {
      start: 0,
      end: 10,
    });
    expect(slice).toHaveProperty("items");
    expect(slice).toHaveProperty("total");
    expect(slice.total).toEqual(4);
  });

  it("returns all items if end high enough", async () => {
    const slice = await makeQuery(server, {
      start: 0,
      end: 10,
    });
    expect(slice.total).toEqual(4);
  });

  it("can return paginated response", async () => {
    const slice = await makeQuery(server, {
      start: 1,
      end: 2,
    });
    expect(slice.total).toEqual(4);
    expect(slice.items.length).toEqual(2);
    expect(slice.items[0].url).toBe("https://www.ben.com");
    expect(slice.items[1].url).toBe("https://www.colin.com");
  });

  it("can return filtered response", async () => {
    const slice = await makeQuery(server, {
      start: 0,
      end: 10,
      filter: "david",
    });
    expect(slice.total).toEqual(4);
    expect(slice.items.length).toEqual(1);
    expect(slice.items[0].url).toBe("https://www.david.com");
  });
});

const makeQuery = async (
  server: Express,
  variables: any
): Promise<Slice<ILink>> => {
  const response = await request(server)
    .post("/graphql")
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .send(
      JSON.stringify({
        query,
        variables,
      })
    );
  return response.body.data.getLinks;
};

const generateTestData = async () => {
  const links = [
    {
      url: "https://www.adam.com",
      shortFormUrl: "https://pbid.io/9a90j33k",
    },
    {
      url: "https://www.ben.com",
      shortFormUrl: "https://pbid.io/al933ju2",
    },
    {
      url: "https://www.colin.com",
      shortFormUrl: "https://pbid.io/poo7hxc3",
    },
    {
      url: "https://www.david.com",
      shortFormUrl: "https://pbid.io/abc1234d",
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
