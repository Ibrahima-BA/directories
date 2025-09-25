import { Startpage } from "@/components/startpage";
import {
  getFeaturedJobs,
  getFeaturedMCPs,
  getMembers,
  getPopularPosts,
  getTotalUsers,
} from "@/data/queries";
import { getPopularRules } from "@directories/data/popular";
import { staticJobs, staticMcps } from "@/data/static-data";
import { config } from "@/lib/config";
import { OfflineBanner } from "@/components/offline-banner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursor Directory - Cursor Rules & MCP Servers",
  description:
    "Enhance your Cursor with custom rules, find MCP servers, and join a community of Cursor enthusiasts.",
};

// Add force-static and revalidate configuration
export const dynamic = "force-static";
export const revalidate = 86400; // Revalidate once every day

export default async function Page() {
  const popularRules = await getPopularRules();
  
  const { data: featuredJobs } = config.offline 
    ? { data: staticJobs.filter(job => job.featured) }
    : await getFeaturedJobs({ onlyPremium: true });

  const { data: featuredMCPs } = config.offline 
    ? { data: staticMcps.filter(mcp => mcp.featured) }
    : await getFeaturedMCPs({ onlyPremium: true });

  const { data: totalUsers } = config.offline 
    ? { data: { count: 1250 } }
    : await getTotalUsers();

  const { data: members } = config.offline 
    ? { data: [] }
    : await getMembers({ page: 1, limit: 12 });

  const { data: popularPosts } = config.offline 
    ? { data: [] }
    : await getPopularPosts();

  return (
    <div className="flex justify-center min-h-screen w-full md:px-0 px-6 mt-[10%]">
      <div className="w-full max-w-6xl">
        {config.offline && <OfflineBanner />}
        <Startpage
          sections={popularRules}
          jobs={featuredJobs}
          mcps={featuredMCPs}
          totalUsers={totalUsers?.count ?? 0}
          members={members}
          popularPosts={popularPosts}
        />
      </div>
    </div>
  );
}
