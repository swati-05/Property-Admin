export const commonRule = [
    // PARENT INPUT MAKES THE EFFECT TO DEPENDENTINPUT AND RULES ARE APPLIED TO DEPENEDENT INPUT
    {
        parentInput: 'propertyType',
        dependentInput: 'landOccupationDate',
        rule: {
            value: '4',
            visible: true,
            required: true
        }
    },
    {
        parentInput: 'propertyType',
        dependentInput: 'apartment',
        rule: {
            value: '3',
            visible: true,
            required: true
        }
    },
    {
        parentInput: 'useType',
        dependentInput: 'trustType',
        rule: {
            value: '42',
            visible: true,
            required: true
        }
    },
]

const mutationRule = {
    extraInputFields: [
        'transferMode',
        'dateOfPurchase',
        'useType'
    ]
}
