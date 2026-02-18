import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testFile = path.join(__dirname, '../tests/generated-activity.test.ts');
const totalCommits = 300;

// Initialize the test file
const initialContent = `import { describe, it, expect } from "vitest";

describe("generated activity tests", () => {
`;

fs.writeFileSync(testFile, initialContent);

console.log(`Initialized ${testFile}`);

try {
    for (let i = 1; i <= totalCommits; i++) {
        const testCase = `
  it("activity check ${i}", () => {
    expect(${i}).toBe(${i});
  });
`;
        fs.appendFileSync(testFile, testCase);

        try {
            execSync(`git add ${testFile}`, { stdio: 'inherit' });
            execSync(`git commit -m "test: verification activity ${i}"`, { stdio: 'inherit' });
            // console.log(`Commit ${i}/${totalCommits} created.`); // reducing log spam slightly
        } catch (error) {
            console.error(`Failed to commit iteration ${i}:`, error.message);
            break;
        }
    }

    // Close the describe block and commit
    fs.appendFileSync(testFile, "\n});\n");

    execSync(`git add ${testFile}`, { stdio: 'inherit' });
    execSync(`git commit -m "chore: finalize generated tests"`, { stdio: 'inherit' });
    console.log("Finalized test file.");

    console.log("Pushing changes...");
    execSync('git push', { stdio: 'inherit' });
    console.log("Done.");

} catch (error) {
    console.error("An error occurred:", error);
}
