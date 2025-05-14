const dummyData = [
  {
    author: "andresc1310",
    name: "Lazygit",
    appliedTags: ["1048174499905937428"],
    url: "https://www.freecodecamp.org/news/how-to-use-lazygit-to-improve-your-git-workflow/",
    createdAt: "2025-04-12T18:04:11.224Z",
    id: "1360676892071559340",
  },
  {
    author: "jdmedlock",
    name: "Faster shuffling in Go with batching",
    appliedTags: ["1303349202444615730", "1048174499905937428"],
    url: "https://lemire.me/blog/2025/04/06/faster-shuffling-in-go-with-batching/",
    createdAt: "2025-04-10T18:39:07.722Z",
    id: "1359960909690175570",
  },
];

async function fetchResources() {
  try {
    const data = await fetch("https://seshatbe.up.railway.app/resources", {
      method: "GET",
    });
    return await data.json();
  } catch (error) {
    throw new Error(error);
  }
}

async function fetchTags() {
  try {
    const data = await fetch("https://seshatbe.up.railway.app/tags", {
      method: "GET",
    });

    return await data.json();
  } catch (error) {
    throw new Error(error);
  }
}

function searchBy({ data, keywords, tags = null }) {
  if (keywords === null)
    return console.log(
      new Error(`"keywords" property missing when parsing object...`)
    );

  const sanitizedKeywords = keywords.toLowerCase().trim();

  console.log(data, sanitizedKeywords, tags);

  const checkMatchTags = (appliedTags) => {
    const tagRegExp = `(${tags.join(")|(")})`;
    const matches = [...appliedTags.join(" ").matchAll(tagRegExp, "gm")];

    if (matches.length !== 0) {
      if (appliedTags.length === tags.length)
        return { isMatch: true, priority: 3 };

      if (Number(tags.length / appliedTags.length).toFixed(2) >= 0.5)
        return { isMatch: true, priority: 2 };

      if (Number(tags.length / appliedTags.length).toFixed(2) >= 0.1)
        return { isMatch: true, priority: 1 };

      return { isMatch: true, priority: 0 };
    }

    return { isMatch: false, priority: -1 };
  };

  const checkMatchKeywords = (name) => {
    const kewordsToRegExpStr = `${sanitizedKeywords
      .split(" ")
      .map((word) =>
        word.length >= 3 ? `(${word.slice(0, 3)})${word.slice(3)}` : word
      )
      .join("|")}`;

    const nameKeywordsArr = name.split(" ");

    const keywordsRegEx = new RegExp(
      `${sanitizedKeywords}|${kewordsToRegExpStr}`,
      "gm"
    );

    const matches = [...name.toLowerCase().matchAll(keywordsRegEx, "gm")];

    if (matches.length !== 0) {
      if (name === sanitizedKeywords) return { isMatch: true, priority: 3 };

      if (Number(matches.length / nameKeywordsArr.length).toFixed(2) >= 0.5)
        return { isMatch: true, priority: 2 };

      if (Number(matches.length / nameKeywordsArr.length).toFixed(2) >= 0.1)
        return { isMatch: true, priority: 1 };

      return { isMatch: true, priority: 0 };
    }

    return { isMatch: false, priority: -1 };
  };

  const sortByPriority = (priorityArr) => {
    priorityArr.sort(({ priority: priorityA }, { priority: priorityB }) => {
      if (priorityA > priorityB) return -1;
      if (priorityA < priorityB) return 1;

      return 0;
    });

    const sortedByPriority = priorityArr.map(({ idx }) => data[idx]);

    return sortedByPriority.length===0?{error: "No post was found with those keywords. Try with different keywords..."}:sortedByPriority;
  };

  const keywordsPriorityArray = [];

  if (tags) {
    const tagPriorityArray = [];

    const filteredByTagPosts = data.filter(({ appliedTags }, idx) => {
      const { isMatch, priority } = checkMatchTags(appliedTags);
      if (isMatch) {
        tagPriorityArray.push({ idx, isMatch, priority });
      }

      return isMatch;
    });

    if (tagPriorityArray.length === 1) {
      return filteredByTagPosts;
    }

    filteredByTagPosts.forEach(({ name }, idx) => {
      const { isMatch, priority } = checkMatchKeywords(name);
      keywordsPriorityArray.push({ idx, isMatch, priority });
    });

    const bothPrioritiesArr = tagPriorityArray.map((tagPriorityObj) => ({
      priority:
        tagPriorityObj.priority +
        keywordsPriorityArray[tagPriorityObj.idx].priority,
      idx: tagPriorityObj.idx,
    }));

    return sortByPriority(bothPrioritiesArr);
  }

  if (keywords.length === 0) return data;

  data.forEach(({ name }, idx) => {
    const { isMatch, priority } = checkMatchKeywords(name);
    if (isMatch) {
      keywordsPriorityArray.push({ idx, isMatch, priority });
    }

    return isMatch;
  });

  return sortByPriority(keywordsPriorityArray);
}

export { fetchResources, fetchTags, searchBy };
