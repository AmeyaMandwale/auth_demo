public async Task<List<GitHubFileDto>> GetPRFilesAsync(
            string owner,
            string repo,
            string externalId)
        {
            var integration = await _ctx.Integrations
                .FirstOrDefaultAsync(i => i.Provider == "github");

            if (integration == null)
                throw new Exception("❌ GitHub Integration not found");

            var token = ExtractToken(integration.Config);

            var http = _factory.CreateClient();
            http.DefaultRequestHeaders.UserAgent.ParseAdd("App");
            http.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);

            //  convert stored external ID → GitHub PR number
            var prNumber = await GetPRNumberFromExternalId(http, owner, repo, externalId);

            if (prNumber == null)
                throw new Exception($" Could not find PR number for ExternalId={externalId}");


            string url =
                $"https://api.github.com/repos/{owner}/{repo}/pulls/{prNumber}/files";

            Console.WriteLine($"CALL: {url}");

            var res = await http.GetAsync(url);

            res.EnsureSuccessStatusCode();

      

            return files ?? new List<GitHubFileDto>();
        }
