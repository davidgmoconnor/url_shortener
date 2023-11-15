import Link from "../../../models/link";
import { ILink } from "../../../models/link";
import { randomUUID } from "crypto";

type CreateLinkPayload = {
  url: string;
};

type Deps = {
  randomString: () => string;
};

export const createLinkWithDeps =
  ({ randomString }: Deps) =>
  async ({ url }: CreateLinkPayload): Promise<ILink> => {
    try {
      const candidates = Array.from({ length: 10 }, randomString);
      const existingRecords = await Link.find({
        shortFormUrl: { $in: candidates },
      });
      const existingShortFormUrls = existingRecords.reduce(
        (acc, nxt) => ({ ...acc, [nxt.shortFormUrl]: 1 }),
        {} as Record<string, number>
      );

      const shortFormUrl = candidates.find((c) => !existingShortFormUrls[c]);
      if (!shortFormUrl) {
        throw new Error("Collision Error");
      }
      const link = new Link({ url, shortFormUrl });
      await link.save();
      return link;
    } catch (err) {
      console.error(err);
      throw new Error("Error creating link");
    }
  };

const randomString = () =>
  `https://pbid.io/${(randomUUID() as string).substring(0, 8)}`;

export const createLink = createLinkWithDeps({ randomString });
