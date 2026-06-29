"use client";

import { ResultCardProps } from "../_props";
import { ServiceCard } from "./ServiceCard";
import { SampleCard } from "./SampleCard";
import { BlogCard } from "./BlogCard";
import { FaqCard } from "./FaqCard";
import { TagCard } from "./TagCard";

export function ResultCard(props: ResultCardProps) {
  const { item } = props;

  switch (item.type) {
    case "service":
      return <ServiceCard {...props} />;
    case "sample":
      return <SampleCard {...props} />;
    case "blog":
      return <BlogCard {...props} />;
    case "faq":
      return <FaqCard {...props} />;
    case "tag":
      return <TagCard {...props} />;
    default:
      return null;
  }
}
