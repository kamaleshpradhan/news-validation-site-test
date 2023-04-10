class Google {
    searchNews(news){
        cy.visit('http://www.google.com/search?q=' + news);
        cy.get('#L2AGLb > .QS5gu').should('exist').click();
        return this;
    }

    getSearchResults(){
        return cy.get('a');
    }
}
export default Google;