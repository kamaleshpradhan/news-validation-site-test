Feature: Canned news

    As a Product Owener
    I want to compare canned news with other sites
    In order to check fake news

    Scenario: Fake news
        Given a canned fake news
        When I search the "fake" in google
        Then the mews should not be found

    
    Scenario: Not fake news
        Given a canned genuine news
        When I search the "genuine" in google
        Then the mews should be found