import Link from "../../../models/link";
import { ILink } from "../../../models/link";
import { Slice } from "../../types";

type GetLinksInput = {
  start: number;
  end: number;
  filter: string;
};

export const getLinks = async ({
  start,
  end,
  filter,
}: GetLinksInput): Promise<Slice<ILink>> => {
  try {
    const query = filter ? { url: { $regex: filter } } : {};
    const total = await Link.find().count();
    const links = await Link.find(query)
      .limit(end - start + 1)
      .skip(start)
      .sort({ url: 1 });
    return {
      items: links,
      total,
    };
  } catch (err) {
    throw new Error("Error retrieving links");
  }
};
