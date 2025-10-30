// Test script to verify URL search functionality
// This simulates opening different URLs with search parameters

const testUrls = [
  "http://localhost:3000",                    // No search term
  "http://localhost:3000?q=hello",            // Simple search term
  "http://localhost:3000?q=فهد",              // Arabic search term
  "http://localhost:3000?q=tech%20podcast",  // URL encoded term
];

console.log("Test URLs to verify URL search functionality:");
testUrls.forEach((url, index) => {
  console.log(`${index + 1}. ${url}`);
});

console.log("\nExpected behavior:");
console.log("- When you visit these URLs, the search input should show the query parameter value");
console.log("- When you type in the search box, the URL should update automatically");
console.log("- The search results should load based on the URL parameter");
console.log("- Page refresh should maintain the search state");