"use client";
import React, { useState, useEffect } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import { getContributionGraph } from "@/module/dashboard/actions";
import { Spinner } from "../ui/spinner";

const ContributionGraph = () => {
  const { theme } = useTheme();
  const [screenSize, setScreenSize] = useState<"sm" | "md" | "lg">("lg");

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("sm");
      } else if (window.innerWidth < 1024) {
        setScreenSize("md");
      } else {
        setScreenSize("lg");
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["contribution-graph"],
    queryFn: async () => {
      try {
        const result = await getContributionGraph();
        // Ensure contributions is always an array
        if (!result.contributions || !Array.isArray(result.contributions)) {
          console.warn("Invalid contributions data:", result);
          return { contributions: [], totalContributions: 0 };
        }
        return result;
      } catch (err) {
        console.error("Error in contribution graph query:", err);
        // Re-throw to let React Query handle it
        throw err;
      }
    },
    // staleTime:1000*60*5,
  });
  if (isLoading) {
    return (
      <div className="flex min-h-60 items-center justify-center text-sm text-muted-foreground">
        <Spinner className="mr-2" /> Loading Contribution Graph...
      </div>
    );
  }
  if (error) {
    console.error("Contribution graph error:", error);
    return (
      <div className="w-full flex flex-col items-center justify-center p-8">
        <div className="text-sm text-muted-foreground">
          Failed to load contribution data
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          {error.message?.includes("GitHub account not linked")
            ? "Please connect your GitHub account in settings."
            : "Please check your GitHub connection and try again."}
        </div>
      </div>
    );
  }
  if (!data || !data.contributions || data.contributions.length === 0) {
    console.log("No contribution data available. Data received:", data);
    return (
      <div className="w-full flex flex-col items-center justify-center p-8">
        <div className="text-sm text-muted-foreground">
          No contribution data available
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Make sure your GitHub account is connected and has contribution data.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4 text-center">
        <span className="font-semibold text-foreground">
          {data.totalContributions} {"\t"}
        </span>
        contributions in the last year
      </div>
      <div className="w-full max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        <div className="flex justify-center px-2 sm:px-4">
          <div className="min-w-max ">
            {data.contributions && data.contributions.length > 0 ? (
              <ActivityCalendar
                data={data.contributions}
                colorScheme={theme === "dark" ? "dark" : "light"}
                blockSize={
                  screenSize === "sm" ? 8 : screenSize === "md" ? 10 : 12
                }
                blockMargin={screenSize === "sm" ? 1 : 2}
                fontSize={screenSize === "sm" ? 10 : 12}
                showWeekdayLabels={screenSize !== "sm"}
                showMonthLabels={screenSize !== "sm"}
                theme={{
                  light: [
                    "#ebedf0",
                    "#dee48bff",
                    "#7bc96f",
                    "#239a3b",
                    "#196127",
                  ],
                  dark: [
                    "#292929ff", // match card background
                    "#1f3d2b", // very low activity (clearly visible on #171717)
                    "#2e6f46", // low activity
                    "#3ea75f", // medium activity
                    "#4fdc7a", // high activity (bright but not neon)
                  ],
                }}
                
              />
              
            ) : (
              <div className="text-sm text-muted-foreground">
                No contributions to display
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;
