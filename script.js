
const courses = [
    { id: 1, title: 'Intro to CS in Java', credits: 6 },
    { id: 2, title: 'Linear Algebra 1', credits: 7 },
    { id: 3, title: 'Discrete Mathematics', credits: 4 },
    { id: 4, title: 'Programming Systems Workshop', credits: 4 },
    { id: 5, title: 'Linear Algebra 2', credits: 5 },
    { id: 6, title: 'Calculus 1', credits: 7 },
]

const students = [
  {
    id: 1,
    name: 'Alice Brown',
    grades: [
      { grade: 98, course: 1 },
      { grade: 95, course: 4 },
      { grade: 92, course: 2 },
      { grade: 90, course: 6 }
    ]
  },
  {
    id: 2,
    name: 'Bob Smith',
    grades: [
      { grade: 80, course: 1 },
      { grade: 100, course: 3 },
      { grade: 95, course: 5 },
    ]
  },
  {
    id: 3,
    name: 'Charlie Johnson',
    grades: [
      { grade: 91, course: 1 },
      { grade: 60, course: 3 },
      { grade: 61, course: 4 }
    ]
  },
  {
    id: 4,
    name: 'Dana Levi',
    grades: [
      { grade: 88, course: 2 },
      { grade: 85, course: 4 },
      { grade: 87, course: 1 },
      { grade: 89, course: 6 }
    ]
  },
  {
    id: 5,
    name: 'Emilia Garcia',
    grades: [
      { grade: 61, course: 3 },
      { grade: 60, course: 1 },
      { grade: 75, course: 4 }
    ]
  },
  {
    id: 6,
    name: "Frank O'Connor",
    grades: [
      { grade: 100, course: 4 },
      { grade: 100, course: 1 },
      { grade: 100, course: 5 }
    ]
  },
  {
    id: 7,
    name: 'Gina Kim',
    grades: [
      { grade: 84, course: 2 },
      { grade: 79, course: 3 },
      { grade: 88, course: 4 },
      { grade: 81, course: 6 },
      { grade: 90, course: 1 }
    ]
  },
  {
    id: 8,
    name: 'Hacker Man',
    grades: [
      { grade: 94, course: 1 },
      { grade: 91, course: 4 },
      { grade: 91, course: 2 }
    ]
  },
  {
    id: 9,
    name: 'Ivy Chen',
    grades: [
      { grade: 95, course: 4 },
      { grade: 94, course: 1 },
      { grade: 91, course: 3 }
    ]
  },
  {
    id: 10,
    name: 'John Long',
    grades: [
      { grade: 91, course: 4 },
      { grade: 94, course: 1 }
    ]
  }
];

// Demand number 1

function addStudent (newName, newGrades, newCourses){
  let newId = students.length + 1;
  let courseObjArr=[];
  
  for(let i=0; i<newGrades.length; i++){
    let fGrade = newGrades[i];    
    let fCourse = newCourses[i];
    if(fGrade < 0 || fGrade > 100)
        throw new Error('Invalid grade');
    if(!Number.isInteger(fGrade)){
      fGrade=Math.trunc(fGrade);
    }
    const newCourse = {
    grade: fGrade,
    course: fCourse
    };
    courseObjArr.push(newCourse);
  }

  const newStudent = {
    id: newId,
    name: newName,
    grades: courseObjArr

  };
  if(is14Pass(newStudent)){
    students.push(newStudent);
  }
  

}
//test
addStudent("josh" ,[60, 60, 60,60,70,80], [1,2,3,4,5,6]);
console.log(students);

//help function
//check if the student fast courses 1 and 4
function is14Pass(newStudent){
  let count = 0;
  for(const grade of newStudent.grades){
    if(grade.course == 1 || grade.course == 4)
      if(grade.grade >= 60){
        count ++;
      }
  }
  if(count < 2) throw new Error('Must finish courses 1 and 4 first');
  else
     return true;
}

// Demand number 2

function prefomanceAcess(aId){
  let sum = 0;
  let is20High = false;
  let is2Bigger = false;
  let avrg=0;
  if(!students.some(student => student.id === aId))
    throw new Error ('Student does not exists');
  let student=students.find(s => s.id === aId);
  let grdLng = student.grades.length;
  for(const grade of student.grades){
    if(grade.grade < 60){
      grdLng--;
      continue;
    }
    sum += grade.grade;
  }
  avrg = sum/grdLng;
    
  for(const grade of student.grades){
  if(grade.grade - avrg >= 20){
    is20High =true;
  }
  }
  if(student.grades[grdLng-1].grade > avrg && student.grades[grdLng-2].grade > avrg){
    is2Bigger = true;
  }
    
  const preform = { 
    id: aId,
    avareg: avrg,
    is20High: is20High,
    is2Bigger: is2Bigger 
  };

  return preform;
}
//test
console.log(prefomanceAcess(11));

// Demand number 3

function cheatRcog(){
  let noCheat = true;
  for(let i=0; i<students.length; i++){
    for(let k=i+1; k<students.length; k++){
      let count = 0;
      for(let j=0; j<students[i].grades.length; j++){
        for(let l = 0; l<students[k].grades.length; l++){
          if(students[i].grades[j].course === students[k].grades[l].course && 
            students[i].grades[j].grade === students[k].grades[l].grade){
            count++;
          }
        }
      }  
      if(count >= 2){
        noCheat = false;
        console.log(`Suspected cheating: ${students[i].name} and ${students[k].name}`);    
      }      
    }   
  }
  if(noCheat){
    console.log("Nobody is suspected of cheating");
  }
}

//test
cheatRcog()


// Demand number 4

function studentRank(){
  let arr = students.sort((a,b) => {
    const avgA = getAverage(a);
    const avgB = getAverage(b);

    if(avgA !== avgB) {
      return avgB - avgA;
    }

    if(a.grades.length !== b.grades.length){
      return b.grades.length - a.grades.length;
    }

    return a.name.localeCompare(b.name);
  });
  return arr;
}

function getAverage(student){ 
  let temp = prefomanceAcess(student.id);
  return temp.avareg;
}
console.log(studentRank());

// Demand number 5

function fallingStudent (){
  let arr = [];
  for(student of students){
    const prfrmObj = prefomanceAcess(student.id);
    if(prfrmObj.avrg < 70 || prfrmObj.is2Bigger){
      arr.push(student);
    }
  }
  return arr;
}
//test
console.log(fallingStudent());


