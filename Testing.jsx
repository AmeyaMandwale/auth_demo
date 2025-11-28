 var prNumber = await GetPRNumberFromExternalId(http, owner, repo, externalId);
        if (prNumber == null)
            throw new Exception($"Could not resolve PR number from externalId: {externalId}");

        string url = $"https://api.github.com/repos/{owner}/{repo}/pulls/{prNumber}/files";

        var response = await http.GetAsync(url);
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<List<GitHubFileDto>>(json)
               ?? new List<GitHubFileDto>();
    }
