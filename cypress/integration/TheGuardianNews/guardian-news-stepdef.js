/// <reference types="cypress" />
import { Given, When, Then, Before } from "cypress-cucumber-preprocessor/steps";
import Google from "../../support/page-objects/Google";
import Guardian from "../../support/page-objects/Guardian";

var fake = true;
var otherNewsSites = [];
const google = new Google();
const guardian = new Guardian();

When("I open The Guardian site", () => {
  guardian.visitGuardian();
});

Then("news articles should be loaded", () => {
  guardian
    .getNewsArticles()
    .should("have.length.greaterThan", 1)
    .then(($newsHeadlines) => {
      const newsHeadlines = $newsHeadlines.map((i, el) => Cypress.$(el).text());
      let firstNewsHeadlines = newsHeadlines.get()[0];
      cy.writeFile(
        "headlines.json",
        '{"headlines":' + '"' + firstNewsHeadlines + '"}'
      );
      console.log("Guradian News Headlines- " + firstNewsHeadlines);
    });
});

Given("a news article", () => {
  cy.readFile("headlines.json").should("have.length.at.least", 1);
});

When("I search the news in google", function () {
  cy.readFile("headlines.json")
    .its("headlines")
    .then((headlines) => {
      google.searchNews(encodeURI(headlines));
    });
  console.log("Google search is done.");
});

Then("the news should be found in other news sites", function () {
  google.getSearchResults().then(($a) => {
    const newsSites = $a.map((i, el) => Cypress.$(el).attr("href"));
    console.log("Length - " + newsSites.length);
    newsSites.get().forEach((s) => {
      console.log(s);
      for (let i = 0; i < otherNewsSites.length; i++) {
        if (s.includes(otherNewsSites[i])) {
          fake = false;
        }
      }
    });
  });
  cy.wrap(!fake).should("be.false");
  console.log("This is NOT a FAKE news.");
});

Given("some other prominent news sites", () => {
  otherNewsSites = [
    "bbc.co.uk",
    "nytimes.com",
    "cnn.com",
    "nytimes.com",
    "forbes.com",
    "thehindu.com",
    "aljazeera.com",
  ];
});

Then("the news should be found in other valid sites", () => {
  let siteCount = 0;
  google.getSearchResults().then(($a) => {
    const sites = $a.map((i, el) => Cypress.$(el).attr("href"));
    sites.get().forEach((url) => {
      console.log(url);
      if (url.includes("theguardian.com")) {
        // Ignore the original news site
        // Do nothing
      } else {
        siteCount++;
        if (siteCount++ == 5) return;
        else cy.request(url).its("status").should("eq", 200);
      }
    });
    expect(siteCount).gte(5, "This is a FAKE news.");
    console.log("This is NOT a FAKE news.");
  });
});
