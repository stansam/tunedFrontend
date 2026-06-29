import { useState } from "react";
import type { AdminBlogCategoryResponse, AdminBlogPostResponse } from "../_types/blogs.types";

export function useBlogsPageState() {
  const [activeTab, setActiveTab] = useState<"posts" | "categories">("posts");
  const [search, setSearch] = useState("");
  const [catId, setCatId] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  // Modal states
  const [selCat, setSelCat] = useState<AdminBlogCategoryResponse | null>(null);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [selPost, setSelPost] = useState<AdminBlogPostResponse | null>(null);
  const [isCommOpen, setIsCommOpen] = useState(false);

  const resetModals = () => {
    setSelCat(null);
    setIsCatOpen(false);
    setSelPost(null);
    setIsCommOpen(false);
  };

  return {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    catId,
    setCatId,
    status,
    setStatus,
    page,
    setPage,
    selCat,
    setSelCat,
    isCatOpen,
    setIsCatOpen,
    selPost,
    setSelPost,
    isCommOpen,
    setIsCommOpen,
    resetModals,
  };
}
