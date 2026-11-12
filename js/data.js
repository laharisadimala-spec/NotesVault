// Sample academic data (demo only)
const SUBJECTS = ["Database Management Systems","Operating Systems","Theory of Computation","Computer Networks","Machine Learning","Data Science","Web Technologies","Mathematics"];
const SAMPLE_NOTES = [
  {id:"s1",title:"DBMS Unit 1 - ER Model & Relational Algebra",subject:"Database Management Systems",semester:"5",branch:"CSE",unit:"1",type:"PDF",date:"2026-08-14",contributor:"Ananya Reddy",downloads:412,rating:4.7,sample:true},
  {id:"s2",title:"OS Mid-1 Previous Paper 2025",subject:"Operating Systems",semester:"5",branch:"CSE",unit:"2",type:"PDF",date:"2026-09-02",contributor:"Sai Teja",downloads:265,rating:4.4,sample:true},
  {id:"s3",title:"Theory of Computation - Automata PPT",subject:"Theory of Computation",semester:"5",branch:"CSE",unit:"3",type:"PPT",date:"2026-07-21",contributor:"Meghana Rao",downloads:190,rating:4.5,sample:true},
  {id:"s4",title:"Computer Networks - TCP/IP Model Notes",subject:"Computer Networks",semester:"6",branch:"CSE",unit:"1",type:"PDF",date:"2026-10-03",contributor:"Keerthi Sharma",downloads:330,rating:4.8,sample:true},
  {id:"s5",title:"Machine Learning Unit 2 - Regression",subject:"Machine Learning",semester:"6",branch:"CSE",unit:"2",type:"PDF",date:"2026-10-11",contributor:"Ravi Kumar",downloads:158,rating:4.2,sample:true},
  {id:"s6",title:"Web Technologies Assignment - HTML & CSS",subject:"Web Technologies",semester:"5",branch:"CSE",unit:"1",type:"PDF",date:"2026-09-18",contributor:"Lahari",downloads:97,rating:4.0,sample:true},
  {id:"s7",title:"Mathematics III - Laplace Transforms",subject:"Mathematics",semester:"3",branch:"ECE",unit:"4",type:"PDF",date:"2026-06-30",contributor:"Pooja Iyer",downloads:221,rating:4.6,sample:true},
  {id:"s8",title:"Data Science Important Questions",subject:"Data Science",semester:"6",branch:"CSE",unit:"3",type:"PDF",date:"2026-10-25",contributor:"Harika N",downloads:143,rating:4.3,sample:true}
];
const LEADERBOARD = [
  {name:"Ananya Reddy",uploads:24,points:980,badges:["Top Contributor","Gold"]},
  {name:"Sai Teja",uploads:18,points:742,badges:["Silver"]},
  {name:"Meghana Rao",uploads:15,points:610,badges:["Silver"]},
  {name:"Keerthi Sharma",uploads:9,points:355,badges:["Rising Star"]}
];
const PAPERS = [
  {id:"p1",title:"DBMS mid-1 paper",kind:"Mid",semester:"5",subject:"Database Management Systems",year:"2025"},
  {id:"p2",title:"Operating Systems semester paper",kind:"Semester",semester:"5",subject:"Operating Systems",year:"2025"},
  {id:"p3",title:"Theory of Computation supplementary paper",kind:"Supplementary",semester:"5",subject:"Theory of Computation",year:"2024"},
  {id:"p4",title:"Computer Networks model paper",kind:"Model",semester:"6",subject:"Computer Networks",year:"2026"},
  {id:"p5",title:"Machine Learning mid-2 paper",kind:"Mid",semester:"6",subject:"Machine Learning",year:"2026"},
  {id:"p6",title:"Mathematics III semester paper",kind:"Semester",semester:"3",subject:"Mathematics",year:"2024"},
  {id:"p7",title:"Data Science model paper",kind:"Model",semester:"6",subject:"Data Science",year:"2026"},
  {id:"p8",title:"Web Technologies supplementary paper",kind:"Supplementary",semester:"5",subject:"Web Technologies",year:"2025"}
];
const QUESTIONS = [
  {id:"q1",subject:"Database Management Systems",unit:"1",type:"Short answer",marks:2,text:"Define a primary key and a foreign key."},
  {id:"q2",subject:"Database Management Systems",unit:"2",type:"Long answer",marks:6,text:"Explain the ACID properties of a transaction with examples."},
  {id:"q3",subject:"Operating Systems",unit:"2",type:"Long answer",marks:6,text:"Compare first-come first-served and round robin scheduling."},
  {id:"q4",subject:"Operating Systems",unit:"3",type:"Short answer",marks:2,text:"What is a deadlock? List the four necessary conditions."},
  {id:"q5",subject:"Theory of Computation",unit:"1",type:"MCQ",marks:1,text:"Which automaton recognises exactly the regular languages?"},
  {id:"q6",subject:"Computer Networks",unit:"1",type:"Short answer",marks:2,text:"Differentiate between TCP and UDP."},
  {id:"q7",subject:"Machine Learning",unit:"2",type:"Numerical",marks:6,text:"Fit a simple linear regression line for the given five data points."},
  {id:"q8",subject:"Mathematics",unit:"4",type:"Long answer",marks:6,text:"Find the Laplace transform of t·e^(at) using the first shifting theorem."}
];
const SAMPLE_REQUESTS = [
  {id:"r1",title:"Compiler Design unit 3 notes",subject:"Theory of Computation",semester:"6",description:"Need LR parsing notes.",status:"Pending",date:"2026-10-28"},
  {id:"r2",title:"Cloud Computing previous papers",subject:"Data Science",semester:"7",description:"Last three years' semester papers.",status:"Fulfilled",date:"2026-10-05"}
];
