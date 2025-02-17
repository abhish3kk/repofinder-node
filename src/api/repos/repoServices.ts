import { ServiceResponse } from "@/common/models/serviceResponse";
import { endpoints, env } from "@/common/utils/envConfig";
import { logger } from "@/server";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import type { GitHubRepository, GitHubSearchParams, GitHubSearchResponse } from "./repoModel";

export class RepoService {
  public async getRepos(params: GitHubSearchParams) {
    try {
      const searchParams = new URLSearchParams({
        q: params.q,
        // per_page: params.per_page?.toString() || "10",
        // page: params.page?.toString() || "1",
      });

      // if (params.sort) searchParams.append("sort", params.sort);
      // if (params.order) searchParams.append("order", params.order);
      // if (params.language) searchParams.append("language", params.language);
      // if (params.created) searchParams.append("created", params.created);
      // if (params.pushed) searchParams.append("pushed", params.pushed);
      // if (params.user) searchParams.append("user", params.user);

      const url: string = decodeURIComponent(`${endpoints.GITHUB_SEARCH_REPOS}?${searchParams.toString()}`);
      console.log("🚀 ~ RepoService ~ getRepos ~ url:", url);
      const response = await axios.get(url);
      return ServiceResponse.success<GitHubSearchResponse>("Response from github repo API", response.data);
    } catch (error: any) {
      const errorMessage = `Error fetching github repos ${JSON.stringify(params)}}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while fetching github repos.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getStarredRepos() {
    try {
      const url: string = decodeURIComponent(`${endpoints.GITHUB_STARRED_REPOS}`);

      const response = await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${env.PAT_TOKEN_GITHUB}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
        })
        .catch((error) => {
          throw error;
        });
      const transformedResponse: GitHubSearchResponse = {
        total_count: response.data.length,
        items: response.data as GitHubRepository[],
        incomplete_results: false,
      };
      return ServiceResponse.success<GitHubSearchResponse>("Response from github starred API", transformedResponse);
    } catch (error: any) {
      const errorMessage = `Error fetching github repos ${error}`;
      logger.error(errorMessage);
      const statusCode = error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR;
      return ServiceResponse.failure("An error occurred while fetching github repos.", error.response.data, statusCode);
    }
  }
}

export const repoService = new RepoService();
