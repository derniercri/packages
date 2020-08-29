import fs from "fs";
import { getLastWrittenTag, loadChangelog } from "./changelog";

const snippet = `# Changelog

<a name="3.3.4"></a>
## 3.3.4 (2020-08-28)

### Added

- ✅ Better tests [[2458c93](https://github.com/derniercri/packages/commit/2458c9391ecf8bfdcca540e186e7ad50efca70ff)]
- ✅ Fixed tests [[e6138ef](https://github.com/derniercri/packages/commit/e6138ef2c1ce58612cc7dcc66e63ae7087061d07)]

### Changed

- 🔧 Better TypeScript coding [[4cbccfc](https://github.com/derniercri/packages/commit/4cbccfc58f0347227a3a4fb242d0c0a395d1a40a)]


<a name="3.3.3"></a>
## 3.3.3 (2020-08-26)

### Added

- ✨ Better config [[769147f](https://github.com/derniercri/packages/commit/769147f4960c28f825e346dc5012d1407137a2d4)]

`;

describe("getLastWrittenTag", () => {
  it("should return last known tag in CHANGELOG", () => {
    expect(getLastWrittenTag(snippet)).toBe("3.3.4");
  });
});

describe("loadChangelog", () => {
  it("should return CHANGELOG.md content", () => {
    jest.mock("fs");
    const readFileSync = jest.fn(() => snippet as any);
    fs.readFileSync = readFileSync;

    expect(loadChangelog()).toEqual(snippet);
  });
});
