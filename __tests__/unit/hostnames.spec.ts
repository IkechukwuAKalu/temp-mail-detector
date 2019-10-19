import knownHosts from "../../lib/hostnames";

describe("/lib/hostnames.ts", () => {
  test("Expect the known hosts to be of type Array", () => {
    expect(Array.isArray(knownHosts)).toBe(true);
  });

  test("Expect each known host to be of type String", () => {
    knownHosts.forEach(kh => expect(typeof kh === "string").toBe(true));
  });
});
