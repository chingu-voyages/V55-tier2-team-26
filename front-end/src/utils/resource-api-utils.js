async function fetchResources() {
  try {
    const data = await fetch("https://seshatbe.up.railway.app/resources", {
      method: "GET",
    });

    if (!data.ok) {
      throw new Error(`HTTP ${data.status}: ${data.statusText}`);
    }

    const dataJSON = await data.json();
    return cleanRepeatedResources(dataJSON);
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Server unavailable. Please check your connection.");
    }
    throw error;
  }
}

async function fetchTags() {
  try {
    const data = await fetch("https://seshatbe.up.railway.app/tags", {
      method: "GET",
    });

    if (!data.ok) {
      throw new Error(`HTTP ${data.status}: ${data.statusText}`);
    }

    return await data.json();
  } catch (error) {
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Server unavailable. Please check your connection.");
    }
    throw error;
  }
}

function searchBy({ data, keywords, tags }) {
  if (keywords === null)
    return console.log(
      new Error(`"keywords" property missing when parsing object...`)
    );

  const sanitizedKeywords = keywords.toLowerCase().trim();

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

    const matches = [...name.toLowerCase().matchAll(keywordsRegEx)];

    if (matches.length !== 0) {
      if (name === sanitizedKeywords || (matches.length===1 && matches[0][0].length >= 4)) return { isMatch: true, priority: 3 };

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

    return sortedByPriority.length === 0
      ? {
          error:
            "No resources found matching your search criteria. Please try different keywords or tags.",
        }
      : sortedByPriority;
  };

  const keywordsPriorityArray = [];

  if (tags.length !== 0) {
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

    filteredByTagPosts.forEach(({ name, idx }) => {
      const { isMatch, priority } = checkMatchKeywords(name);
      keywordsPriorityArray.push({ idx, isMatch, priority });
    });

    const bothPrioritiesArr = tagPriorityArray.map((tagPriorityObj, idx) => ({
      priority: tagPriorityObj.priority + keywordsPriorityArray[idx].priority,
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

function cleanRepeatedResources(data) {
  const newArray = [];

  data.forEach((result) => {
    if (newArray.length === 0) return newArray.push(result);

    const foundResult = newArray.find(
      (savedResult) => savedResult.name === result.name
    );

    foundResult ? null : newArray.push(result);
  });

  return newArray;
}

export { fetchResources, fetchTags, searchBy };
