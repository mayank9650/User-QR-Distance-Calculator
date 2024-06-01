const usersList = [{
    username: 'May',
    password: 'abcd1234',
    roles: ["Admin"],
    active: true
}, {
    username: 'Ray',
    password: 'abcd1234',
    roles: ["Manager"],
    active: false
}]

const ProductsList = [{
    productName: 'Mobile',
    productDescription: 'Mobile phones',
    userId: "",
}, {
    productName: 'Watches',
    productDescription: 'Wrist watches',
    userId: "",
}]



module.exports = { usersList, ProductsList }