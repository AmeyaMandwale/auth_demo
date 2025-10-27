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

  
