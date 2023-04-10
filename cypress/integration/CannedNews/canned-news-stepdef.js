/// <reference types="cypress" />
import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import Google from "../../support/page-objects/Google";

let fakeNews;
let genuineNews;
const google = new Google();
Given('a canned fake news', () => {
    fakeNews = 'Kamalesh landed on Mars';
})

Given('a canned genuine news', () => {
  genuineNews = 'Donald Trump indicted';
})

Then('the mews should not be found', () => {
    google
      .getSearchResults()
      .then(($a) => {
        const newsSites = $a.map((i, el) => Cypress.$(el).attr("href"));
        newsSites.get().forEach((s) => {
          expect(s).not.to.include("bbc.co.uk");
          expect(s).not.to.include("bbc.com");
          expect(s).not.to.include("cnn.com");
          expect(s).not.to.include("nytimes.com");
          expect(s).not.to.include("theguardian.com");
        });
        console.log("This is a FAKE news.");
      });
})

When('I search the {string} in google', (news) => {
  if(news === 'fake')  
    google.searchNews(fakeNews);
  else
  google.searchNews(genuineNews);
})

Then('the mews should be found', () => {
  google
      .getSearchResults()
      .then(($a) => {
        const newsSites = $a.map((i, el) => Cypress.$(el).attr("href"));
        newsSites.get().forEach((s) => {
          // console.log(s)
          if (s.includes("bbc.co.uk") || s.includes("nytimes.com")) {
            console.log(s);
            assert.isTrue(true, "This is a GENUINE news.");
          }
        });
        console.log("This is a GENUINE news.");
      });
})