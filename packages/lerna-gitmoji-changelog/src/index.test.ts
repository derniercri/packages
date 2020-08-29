import * as git from "./git";
import * as changelog from "./changelog";

import { getShouldWriteChangelog, generateChangelog } from ".";

jest.mock('fs');

const originalGetLastTag = git.getLastTag;
const originalGetLastWrittenTag = changelog.getLastWrittenTag;

describe("shouldWriteChangelog", () => {
  beforeEach(() => {
    jest.mock("./git");
    (git as any).getLastTag = jest.fn(() => "v1.2.3");

    jest.mock("./changelog");
    (changelog as any).getLastWrittenTag = jest.fn(() => "1.2.2");
  });

  afterEach(() => {
    (git as any).getLastTag = originalGetLastTag;
    (changelog as any).getLastWrittenTag = originalGetLastWrittenTag;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should return true when changelog < git tag", () => {
    expect(getShouldWriteChangelog()).toBe(true);
  });

  it("should return false when changelog = git tag", () => {
    (changelog as any).getLastWrittenTag = jest.fn(() => "1.2.3");

    expect(getShouldWriteChangelog()).toBe(false);
  });

  // It should not be possible but... We test it so we know our function is strong
  it("should return false when changelog > git tag", () => {
    (changelog as any).getLastWrittenTag = jest.fn(() => "1.2.4");

    expect(getShouldWriteChangelog()).toBe(false);
  });

  it("should return false when no git tag", () => {
    (git as any).getLastTag = jest.fn(() => null);

    expect(getShouldWriteChangelog()).toBe(false);
  });

  it("should return true when no changelog tag", () => {
    (changelog as any).getLastWrittenTag = jest.fn(() => null);

    expect(getShouldWriteChangelog()).toBe(true);
  });
});

describe("generateChangelog", () => {
  beforeEach(() => {
    jest.mock("./git");
    (git as any).getLastTag = jest.fn(() => "v3.3.4");
    (git as any).getFilesInHash = jest.fn(() => ['toto', 'packages/toto']);
    (git as any).getDiffBetweenTags = jest.fn(() => `ac6fdcd (HEAD -> master, tag: v3.3.4, origin/master) :bookmark: Publish v3.3.4
CHANGELOG.md
packages/cli-tools/package.json
packages/react-native-template-derniercri/package.json
2458c93 :white_check_mark: Better tests
packages/react-native-template-derniercri/template/_eslintrc.js
4cbccfc :wrench: Better TypeScript coding
package.json
`);

    jest.mock("./changelog");
    (changelog as any).getLastWrittenTag = jest.fn(() => "v3.3.3");
    (changelog as any).loadChangelog = jest.fn(
      () => `# Changelog

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

`
    );
  });

  it("should work", () => {
    const result = generateChangelog();
    expect(result).toEqual(`# Changelog

<a name="v3.3.4"></a>
## v3.3.4 (2020-08-28)

### Added

- ✅ Better tests TODO: Link to Github

### Changed

- 🔧 Better TypeScript coding TODO: Link to Github


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

`)
  });

  it("should not generate changelog", () => {
    (git as any).getLastTag = jest.fn(() => "v3.3.3");
    (changelog as any).getLastWrittenTag = jest.fn(() => "v3.3.3");

    expect(() => {generateChangelog()}).toThrowError('Do not have to generate changelog');
  });
});
