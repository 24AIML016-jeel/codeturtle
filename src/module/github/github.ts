import { Octokit } from "octokit";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers.js";
import { tr } from "date-fns/locale";

export const getGithubToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized");
  }

  const account = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      providerId: "github",
    },
  });

  if (!account) {
    throw new Error("GitHub account not linked");
  }
  return account.accessToken;
};

export async function fetchUserContribution(tocken: string, username: string) {
  const octokit = new Octokit({
    auth: tocken,
  });
  const query = `
    query ($username: String!) {
        user(login: $username) {
            contributionsCollection {
                contributionCalendar
                    totalContributions
                    weeks {
                        contributionDays {
                            date
                            contributionCount
                            color
                        }
                    }
                }
            }
        }
    }`;

    interface contibutionData {
      user: {
        contributionsCollection: {
            contributionCalendar: any;
            totalContributions: number;
            weeks: {
                contributionDays: {
                    date: string;
                    contributionCount: number;
                    color: string;
                }[];
            }[];
        };
      };
    }

    try {
      const response:contibutionData = await octokit.graphql(query, { username });
      return response.user.contributionsCollection;
    }
    catch (error) {
        console.error("Error fetching user contributions:", error);
        throw error;
    }
}
