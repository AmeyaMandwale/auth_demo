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

    fetchPRs();
    fetchActivity();
  }, [accessToken]);

 if (provider == "github")
        {
            var parts = pr.Repository.Name.Split('/');
            await _githubComment.AddCommentAsync(parts[0], parts[1], pr.ExternalId!, finalComment);
        }
        else
        {
            await _gitlabComment.AddCommentAsync(pr.ExternalId!, finalComment);
        }

