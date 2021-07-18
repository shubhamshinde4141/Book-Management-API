
let books = [
    {
    ISBN: "12345Book",
    title: "Getting Started With C Programming",
    pubDate: "2021-12-07",
    language: "en",
    numPage: 250,
    author: [1, 2],
    publications: 1,
    category: ["technical", "Engineering", "Education"]

    },
    {
        ISBN: "12345NewBook",
        title: "Let Us C",
        pubDate: "2021-13-07",
        language: "en",
        numPage: 250,
        author: [2],
        publications: 2,
        category: ["technical", "Engineering", "Education"]
    
    },
];

const author = [
    {
        id: 1,
        name: "Shubham",
        books: ["12345Book"],
    },
    {
        id: 2,
        name: "Yash",
        books: ["12345TextBook"],
    },

];

const publications = [
    {
        id: 1,
        name: "writex",
        books: ["12345Book"],
    },
    {
        id: 2,
        name: "Novel",
        books: ["12345NewBook"],
    },

];

// This statement is used beacause we have to use this data in the other files (API). So we have to import this files wherever we want.
module.exports = { books, author, publications };

/*{
    "authors": [
        {
            "id": 2,
            "name": "Yash",
            "books": ["12345Book"]
        }
                ]
}*/