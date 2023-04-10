class Guardian {
    visitGuardian(){
        cy.visit("https://www.theguardian.com/tone/news");
    }
    getNewsArticles() {
        return cy.get("a.u-faux-block-link__overlay");
    }
}
export default Guardian;