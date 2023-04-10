Feature: The Guardian news articles

    As a Product Owener
    I want to compare the news from The Guaradian with other sites
    In order to check fake news

    Scenario: Load news from the Guardian site
    When I open The Guardian site
    Then news articles should be loaded

    ## Valid news
    Scenario: News article found in other news sites
    Given some other prominent news sites
    When I search the news in google
    Then the news should be found in other news sites

    ## Valid news
    Scenario: News article found in other sites
        When I search the news in google
        Then the news should be found in other valid sites
