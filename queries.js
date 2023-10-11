export const user = {
    query: `
        {
            user {
                auditRatio
                totalUp
                totalDown
                attrs
            }
        }
    `
};
export const totalXp = {
    query: `
        {
            transaction_aggregate(where: {type: {_eq: "xp"}, eventId: {_eq: 85}}){
                aggregate {
                    sum {
                        amount
                    }
                }
            }
        }
    `
};
export const level = {
    query: `
        {
            transaction_aggregate(where: {type: {_eq: "level"}, eventId: {_eq: 85}}) {
                aggregate {
                    max {
                        amount
                    }
                }
            }
        }
    `
};
export const avgGrade = {
    query: `
        {
            result_aggregate(where: {eventId: {_eq: 85}}) {
                aggregate {
                    avg {
                        grade
                    }
                }
            }
        }
    `
};
export const lastProject = {
    query: `
        {
            progress(order_by: {createdAt: desc}, where: {eventId: {_eq: 85}}, limit: 1) {
                object {
                  name
                }
                createdAt
                updatedAt
                isDone
            }
        }
    `
};
export const xpProgression = {
    query: `
        {
            transaction(where: {eventId: {_eq:85}, type: {_eq: "xp"}}, order_by: {createdAt: asc}) {
                eventId
                path
                type
                createdAt
                amount
            }
        }
    `
};
export const xpProgression2 = {
    query: `
        {
            transaction_aggregate(where: {eventId: {_eq:85}, type: {_eq: "xp"}}, order_by: {createdAt: asc}) {
                aggregate {
                  sum {
                    amount
                  }
                }
                nodes {
                  eventId
                  path
                  type
                  createdAt
                  amount
                }
            }
        }
    `
};
export const jsPiscineAttempts = {
    query: `
        {
            result_aggregate(where: {eventId: {_eq:102},  type: {_eq: "tester"}}, order_by: {createdAt: asc}) {
                aggregate {
                    count
                }
                nodes {
                    grade
                    path
                    createdAt
                }
            }
        }
    `
};