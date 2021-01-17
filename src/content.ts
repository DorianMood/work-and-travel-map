$(document).ready(() => {
  const parseRegions = () => {
    let regions = $(
      ".job-listings > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1)"
    )
      .text()
      .replaceAll("Location\n", "")
      .replaceAll("  ", "")
      .replaceAll(/\n\n(.)*/g, "")
      .split("\n");
    regions.pop();
    const names = $("div.card-header > a > strong")
      .toArray()
      .map((item) => item.innerText);
    const links = $("div.card-header > a")
      .toArray()
      .map((item: any) => item.href);
    const badges = $("div.card-body > div:nth-child(1) > div:nth-child(1)")
      .toArray()
      .map((item) =>
        $(item)
          .find("span.badge")
          .toArray()
          .map((item) => item.innerText)
      );
    const tipped = badges.map((item) => item.includes("Tipped"));
    const locations = regions;

    const objects: any[] = [];
    regions.forEach((item, i) => {
      objects.push({
        name: names[i],
        link: links[i],
        tipped: tipped[i],
        location: locations[i],
      });
    });

    return objects;
  };

  chrome.runtime.onMessage.addListener((message, sender, callback) => {
    if (message["type"] === "WORK_AND_TRAVEL_PARSE") {
      callback({ type: "WORK_AND_TRAVEL_PARSE_DONE", data: parseRegions() });
    }
  });
});
