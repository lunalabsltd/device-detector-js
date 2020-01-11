const regexCache: Record<string, RegExp> = {};

export const userAgentParser = (rawRegex: string, userAgent: string): string[] | null => {
  // TODO: find out why it fails in some browsers
  try {
    // try fetching the compiled regex from cache
    let regex = regexCache[ rawRegex ];

    // check if we got anything out
    if (!regex) {
      // we didn't - let's create a new regex instance
      regexCache[ rawRegex ] = RegExp(`(?:^|[^A-Z0-9-_]|[^A-Z0-9-]_|sprd-)(?:${rawRegex})`, "i");
      regex = regexCache[ rawRegex ];
    }

    // match the string against the regex
    const match = regex.exec(userAgent);

    return match ? match.slice(1) : null;
  } catch {
    return null;
  }
};
