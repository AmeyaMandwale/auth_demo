const fetchActivity = async () => {
      try {
        const res = await axios.get(
          "https://api.github.com/users/AmeyaMandwale/events",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        setActivityResponse(res.data.slice(0, 5));
      } catch (err) {
        console.error("❌ Error fetching activity:", err);
      }
    };
        public async Task<string> GetEnabledRulesForOrg(int orgId)
    {
        var packs = await _ctx.RulePacks
            .Where(r => r.OrgId == orgId && r.Enabled == true)
            .ToListAsync();

        if (!packs.Any()) return "No active rules found.";

        // Combine all enabled rules
        var merged = string.Join("\n\n", packs
            .Where(p => !string.IsNullOrWhiteSpace(p.Rules))
            .Select(p => p.Rules));

        return merged;
    }
    fetchPRs();
    fetchActivity();
  }, [accessToken]);
