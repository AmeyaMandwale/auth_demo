const loadRepos = async () => {
    // 1️⃣ Get orgId from localStorage (this must already be set somewhere after login)
    const orgId = localStorage.getItem("OrgId");

    // 2️⃣ Try to get provider from URL (?provider=github)
    const searchParams = new URLSearchParams(window.location.search);
    const providerFromQuery = searchParams.get("provider");

    // 3️⃣ If not in URL, fallback to localStorage (we'll store it there after login)
    const providerFromStorage = localStorage.getItem("provider");

    // 4️⃣ Final provider: query string wins, otherwise use localStorage
    const provider = providerFromQuery || providerFromStorage;

    if (!orgId || !provider) {
      console.warn("Missing orgId or provider", { orgId, provider });
      setRepos([]);
      return;
    }

    try {
      setLoading(true);

      // 5️⃣ Sync based on provider
      if (provider === "github") {
        await fetch(`/api/repository/sync?orgId=${orgId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else if (provider === "gitlab") {
        await fetch(`/api/sourcecontrol/gitlab/repos?orgId=${orgId}`);
      }

      // 6️⃣ Then read from DB so UI always gets latest stored repos
      const listResponse = await fetch(
        `/api/repository?orgId=${orgId}&provider=${provider}`
      );
      const data = await listResponse.json();

      console.log("DB repos after sync →", data);

      if (Array.isArray(data)) {
        setRepos(data);
      } else {
        console.warn("Unexpected repos format:", data);
        setRepos([]);
      }
    } catch (err) {
      console.error("Load repos failed →", err);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRepos();
  }, []);
