export const companyTracks=[
{name:'Amazon',focus:['Requirements clarification','Scalability','Operational excellence','Trade-offs'],rounds:['HLD design','LLD design','Behavioral follow-up'],problems:['url-shortener','photo-sharing','parking-lot']},
{name:'Google',focus:['Distributed systems','Data consistency','Large-scale reliability'],rounds:['System design','Deep technical follow-up'],problems:['url-shortener','photo-sharing']},
{name:'Microsoft',focus:['API design','Cloud scale','Maintainability'],rounds:['Design round','Object-oriented design'],problems:['parking-lot','splitwise']},
{name:'Uber',focus:['Geo-distribution','Real-time systems','Event processing'],rounds:['HLD','Domain deep dive'],problems:['photo-sharing','url-shortener']},
{name:'Atlassian',focus:['Product requirements','Collaboration systems','Clear trade-offs'],rounds:['System design','Coding/design'],problems:['splitwise','parking-lot']}
];
export const mockQuestions=[
{topic:'requirements',question:'What are the functional and non-functional requirements? ',rubric:['scope','latency','availability','consistency']},
{topic:'capacity',question:'Estimate QPS, storage, bandwidth, and peak traffic.',rubric:['assumptions','math','headroom']},
{topic:'architecture',question:'Walk through the request flow and identify scaling bottlenecks.',rubric:['components','data flow','failure modes']},
{topic:'tradeoffs',question:'What would you change at 10× and 100× scale?',rubric:['partitioning','caching','cost','consistency']}
];