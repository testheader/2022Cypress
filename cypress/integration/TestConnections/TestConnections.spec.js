describe('example to-do app', () => {
    beforeEach(() => {
      cy.visit('www.mobilevikings.be')
      cy.get('#btn-accept-cookies').click();
    })
  
    
    it.skip('klantendienst intercept', () => {
        cy.intercept('b2c',
        {body: [
            {"name": "chat", "sla_duration": 2, "is_open": false, "opening_hours": [{"days": "week", "opening_at": "08:30:00", "closing_at": "16:30:00"}]},
            {"name": "whatsapp", "uri": "https://wa.me/32456130693", "sla_duration": 20, "is_open": true, "opening_hours": [{"days": "week", "opening_at": "08:30:00", "closing_at": "22:00:00"},{"days": "weekend", "opening_at": "08:30:00", "closing_at": "22:00:00"}]},
            {"name": "call", "uri": "tel:+32456191976", "is_open": true, "opening_hours": [{"days": "week", "opening_at": "08:30:00", "closing_at": "17:00:00"}]},
            {"name": "messenger", "uri": "https://m.me/mobilevikings", "sla_duration": 20, "is_open": true, "opening_hours": [{"days": "week", "opening_at": "08:30:00", "closing_at": "22:00:00"}, {"days": "weekend", "opening_at": "08:30:00", "closing_at": "22:00:00"}]},
            {"name": "twitter", "uri": "https://twitter.com/analogHuns", "sla_duration": 20, "is_open": true, "opening_hours": [{"days": "week", "opening_at": "08:30:00", "closing_at": "22:00:00"}, {"days": "weekend", "opening_at": "08:30:00", "closing_at": "22:00:00"}]},
            {"name": "mail", "uri": "mailto:info@mobilevikings.be", "sla_duration": 1440, "is_open": true, "opening_hours": [{"days": "all", "opening_at": "00:00:00", "closing_at": "23:59:00"}]}]})
            .as('klantendienst')

        cy.visit('https://mobilevikings.be/nl/offer/subscriptions/')
        cy.wait('@klantendienst') 
    })

    it('reviews intercept', () => {
        cy.intercept('reviews**',
        {body:{
            "number_of_reviews": 17974, 
            "average_score": 3,
            "buckets": {"0": 445, "1": 449, "2": 533, "3": 854, "4": 4172, "5": 11521},
            "reviews": [
                {"name": "Iñtërnâtiônàlizætiøn☃💪", "score": 1, "text": "Cypress", "date": "2022-01-16T00:00:00Z"},
                {"name": "P.", "score": 5, "text": "Selenium?", "date": "2022-01-22T00:00:00Z"},
            ]}
        }).as('reviews')

        cy.visit('https://mobilevikings.be/nl/offer/subscriptions/')
    })
})